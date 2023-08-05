'''
Client for REST APIs.
'''

from __future__ import print_function, division

import collections
import re
from syndicate import data as m_data
from syndicate.adapters import sync as m_sync, async as m_async
from tornado import concurrent


class ServiceError(Exception):
    pass


class ResponseError(ServiceError):

    def __init__(self, response):
        self.response = response

    def __str__(self):
        return '%s(%s)' % (type(self).__name__, self.response)


class Service(object):
    """ A stateful connection to a service. """

    default_page_size = 100
    urlpartition = re.compile('([?;])')

    @staticmethod
    def default_data_getter(response):
        if response.error:
            raise response.error
        content = response.content
        if not content:
            return None
        if not content['success']:
            raise ResponseError(content)
        return content.get('data')

    @staticmethod
    def default_meta_getter(response):
        content = response.content
        if not content:
            return None
        return content.get('meta')

    def __init__(self, uri=None, urn='', auth=None, serializer='json',
                 data_getter=None, meta_getter=None, trailing_slash=True,
                 async=False, adapter=None, adapter_config=None,
                 request_timeout=None, connect_timeout=None):
        if not uri:
            raise TypeError("Required: uri")
        self.async = async
        self.auth = auth
        self.filters = []
        self.trailing_slash = trailing_slash
        self.uri = uri
        self.urn = urn
        self.request_timeout = request_timeout
        self.connect_timeout = connect_timeout
        self.data_getter = data_getter or self.default_data_getter
        self.meta_getter = meta_getter or self.default_meta_getter
        if hasattr(serializer, 'mime'):
            self.serializer = serializer
        else:
            self.serializer = m_data.serializers[serializer]
        if adapter is None:
            if adapter_config is None:
                adapter_config = {}
            if async:
                adapter = m_async.AsyncAdapter(config=adapter_config)
            else:
                adapter = m_sync.SyncAdapter(config=adapter_config)
        self.bind_adapter(adapter)

    def bind_adapter(self, adapter):
        adapter.set_header('accept', self.serializer.mime)
        adapter.set_header('content-type', self.serializer.mime)
        adapter.request_timeout = self.request_timeout
        adapter.connect_timeout = self.connect_timeout
        adapter.ingress_filter = self.ingress_filter
        adapter.serializer = self.serializer
        adapter.auth = self.auth
        self.adapter = adapter

    def ingress_filter(self, response):
        """ Flatten a response with meta and data keys into an object. """
        data = self.data_getter(response)
        if isinstance(data, dict):
            data = m_data.DictResponse(data)
        elif isinstance(data, list):
            data = m_data.ListResponse(data)
        else:
            return data
        data.meta = self.meta_getter(response)
        return data

    def do(self, method, path, urn=None, callback=None, data=None,
           timeout=None, **query):
        urlparts = [self.uri, self.urn if urn is None else urn]
        urlparts.extend(path)
        url = '/'.join(filter(None, (x.strip('/') for x in urlparts)))
        if self.trailing_slash:
            parts = self.urlpartition.split(url, 1)
            if not parts[0].endswith('/'):
                parts[0] += '/'
                url = ''.join(parts)
        return self.adapter.request(method, url, callback=callback, data=data,
                                    query=query, timeout=timeout)

    def get(self, *path, **kwargs):
        return self.do('get', path, **kwargs)

    def get_pager(self, *path, **kwargs):
        """ A generator for all the results a resource can provide. The pages
        are lazily loaded. """
        fn = self.get_pager_async if self.async else self.get_pager_sync
        page_arg = kwargs.pop('page_size', None)
        limit_arg = kwargs.pop('limit', None)
        kwargs['limit'] = page_arg or limit_arg or self.default_page_size
        return fn(path=path, kwargs=kwargs)

    def get_pager_sync(self, path=None, kwargs=None):
        return SyncPager(getter=self.get, path=path, kwargs=kwargs)

    def get_pager_async(self, path=None, kwargs=None):
        return AsyncPager(getter=self.get, path=path, kwargs=kwargs)

    def post(self, *path_and_data, **kwargs):
        path = list(path_and_data)
        data = path.pop(-1)
        return self.do('post', path, data=data, **kwargs)

    def delete(self, *path, **kwargs):
        data = kwargs.pop('data', None)
        return self.do('delete', path, data=data, **kwargs)

    def put(self, *path_and_data, **kwargs):
        path = list(path_and_data)
        data = path.pop(-1)
        return self.do('put', path, data=data, **kwargs)

    def patch(self, *path_and_data, **kwargs):
        path = list(path_and_data)
        data = path.pop(-1)
        return self.do('patch', path, data=data, **kwargs)


class AdapterPager(object):
    """ A sized generator that iterators over API pages. """

    def __init__(self, getter=None, path=None, kwargs=None):
        self.getter = getter
        self.path = path
        self.kwargs = kwargs
        super(AdapterPager, self).__init__()

    def __len__(self):
        raise NotImplementedError("pure virtual")


class SyncPager(AdapterPager):

    length_unset = object()

    def __init__(self, *args, **kwargs):
        super(SyncPager, self).__init__(*args, **kwargs)
        self.page = None

    def __iter__(self):
        return self

    def load_first(self):
        self.page = self.getter(*self.path, **self.kwargs)

    def load_next(self):
        if not self.page.meta['next']:
            raise StopIteration()
        self.page = self.getter(urn=self.page.meta['next'])

    def __len__(self):
        if self.page is None:
            self.load_first()
        return self.page.meta['total_count']

    def __next__(self):
        if self.page is None:
            self.load_first()
        if not self.page:
            self.load_next()
        return self.page.pop(0)

    next = __next__


class AsyncPager(AdapterPager):

    max_overflow = 1000

    def __init__(self, *args, **kwargs):
        super(AsyncPager, self).__init__(*args, **kwargs)
        self.mark = 0
        self.active = None
        self.waiting = collections.deque()
        self.stop = False
        self.next_page = None

    def __iter__(self):
        return self

    def __next__(self):
        item = concurrent.Future()
        self.queue_next(item)
        return item

    next = __next__

    def queue_next_page(self):
        if self.next_page:
            self.active = self.getter(urn=self.next_page)
        else:
            self.active = self.getter(*self.path, **self.kwargs)
        self.active.add_done_callback(self.on_next_page)

    def queue_next(self, item):
        if len(self.waiting) >= self.max_overflow:
            raise OverflowError('max overflow exceeded')
        if self.active:
            if self.active.done():
                if self.active.result():
                    item.set_result(self.active.result().pop(0))
                elif self.stop:
                    raise StopIteration()
                else:
                    self.waiting.append(item)
                    self.queue_next_page()
            else:
                self.waiting.append(item)
        else:
            self.waiting.append(item)
            self.queue_next_page()

    def on_next_page(self, page):
        res = page.result()
        self.next_page = res.meta['next']
        self.stop = not self.next_page
        while self.waiting and res:
            self.waiting.popleft().set_result(res.pop(0))
        if self.waiting:
            if self.stop:
                while self.waiting:
                    self.waiting.popleft().set_exception(StopIteration())
            else:
                self.queue_next_page()

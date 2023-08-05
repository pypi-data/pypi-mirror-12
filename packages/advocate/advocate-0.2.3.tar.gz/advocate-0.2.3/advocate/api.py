# -*- coding: utf-8 -*-

"""
advocate.api
~~~~~~~~~~~~

This module implements the Requests API, largely a copy/paste from `requests`
itself.

:copyright: (c) 2015 by Jordan Milne.
:license: Apache2, see LICENSE for more details.

"""
from collections import OrderedDict

import requests

from .adapters import BlacklistingHTTPAdapter


class Session(requests.Session):
    """Convenience wrapper around `requests.Session` set up for `advocate`ing"""
    def __init__(self, *args, **kwargs):
        self.blacklist = kwargs.pop("blacklist", None)

        # `Session.__init__()` calls `mount()` internally, so we need to allow
        # it temporarily
        self.__mountAllowed = True
        requests.Session.__init__(self, *args, **kwargs)

        # Drop any existing adapters
        self.adapters = OrderedDict()

        adapter = BlacklistingHTTPAdapter(blacklist=self.blacklist)
        self.mount("http://", adapter)
        self.mount("https://", adapter)
        self.__mountAllowed = False

    def mount(self, *args, **kwargs):
        """Wrapper around `mount()` to prevent a protection bypass"""
        if self.__mountAllowed:
            super(Session, self).mount(*args, **kwargs)
        else:
            raise NotImplementedError(
                "mount() is disabled to prevent protection bypasses"
            )


def session(*args, **kwargs):
    return Session(*args, **kwargs)


def request(method, url, **kwargs):
    """Constructs and sends a :class:`Request <Request>`.

    :param method: method for the new :class:`Request` object.
    :param url: URL for the new :class:`Request` object.
    :param params: (optional) Dictionary or bytes to be sent in the query string for the :class:`Request`.
    :param data: (optional) Dictionary, bytes, or file-like object to send in the body of the :class:`Request`.
    :param json: (optional) json data to send in the body of the :class:`Request`.
    :param headers: (optional) Dictionary of HTTP Headers to send with the :class:`Request`.
    :param cookies: (optional) Dict or CookieJar object to send with the :class:`Request`.
    :param files: (optional) Dictionary of ``'name': file-like-objects`` (or ``{'name': ('filename', fileobj)}``) for multipart encoding upload.
    :param auth: (optional) Auth tuple to enable Basic/Digest/Custom HTTP Auth.
    :param timeout: (optional) How long to wait for the server to send data
        before giving up, as a float, or a (`connect timeout, read timeout
        <user/advanced.html#timeouts>`_) tuple.
    :type timeout: float or tuple
    :param allow_redirects: (optional) Boolean. Set to True if POST/PUT/DELETE redirect following is allowed.
    :type allow_redirects: bool
    :param proxies: (optional) Dictionary mapping protocol to the URL of the proxy.
    :param verify: (optional) if ``True``, the SSL cert will be verified. A CA_BUNDLE path can also be provided.
    :param stream: (optional) if ``False``, the response content will be immediately downloaded.
    :param cert: (optional) if String, path to ssl client cert file (.pem). If Tuple, ('cert', 'key') pair.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response

    Usage::

      >>> import advocate
      >>> req = advocate.request('GET', 'http://httpbin.org/get')
      <Response [200]>
    """

    blacklist = kwargs.pop("blacklist", None)
    with Session(blacklist=blacklist) as sess:
        response = sess.request(method=method, url=url, **kwargs)
    return response


def get(url, **kwargs):
    """Sends a GET request.

    :param url: URL for the new :class:`Request` object.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    kwargs.setdefault('allow_redirects', True)
    return request('get', url, **kwargs)


def options(url, **kwargs):
    """Sends a OPTIONS request.

    :param url: URL for the new :class:`Request` object.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    kwargs.setdefault('allow_redirects', True)
    return request('options', url, **kwargs)


def head(url, **kwargs):
    """Sends a HEAD request.

    :param url: URL for the new :class:`Request` object.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    kwargs.setdefault('allow_redirects', False)
    return request('head', url, **kwargs)


def post(url, data=None, json=None, **kwargs):
    """Sends a POST request.

    :param url: URL for the new :class:`Request` object.
    :param data: (optional) Dictionary, bytes, or file-like object to send in the body of the :class:`Request`.
    :param json: (optional) json data to send in the body of the :class:`Request`.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    return request('post', url, data=data, json=json, **kwargs)


def put(url, data=None, **kwargs):
    """Sends a PUT request.

    :param url: URL for the new :class:`Request` object.
    :param data: (optional) Dictionary, bytes, or file-like object to send in the body of the :class:`Request`.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    return request('put', url, data=data, **kwargs)


def patch(url, data=None, **kwargs):
    """Sends a PATCH request.

    :param url: URL for the new :class:`Request` object.
    :param data: (optional) Dictionary, bytes, or file-like object to send in the body of the :class:`Request`.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    return request('patch', url, data=data, **kwargs)


def delete(url, **kwargs):
    """Sends a DELETE request.

    :param url: URL for the new :class:`Request` object.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    return request('delete', url, **kwargs)


class RequestsAPIWrapper(object):
    """Provides a `requests.api`-like interface with a specific blacklist"""
    def __init__(self, blacklist):
        self.blacklist = blacklist

        self.request = self._default_arg_wrapper(request)
        self.get = self._default_arg_wrapper(get)
        self.options = self._default_arg_wrapper(options)
        self.head = self._default_arg_wrapper(options)
        self.post = self._default_arg_wrapper(post)
        self.put = self._default_arg_wrapper(put)
        self.patch = self._default_arg_wrapper(patch)
        self.delete = self._default_arg_wrapper(delete)
        self.session = self._default_arg_wrapper(session)
        self.Session = self.session

    def _default_arg_wrapper(self, fun):
        def wrapped_func(*args, **kwargs):
            kwargs.setdefault("blacklist", self.blacklist)
            return fun(*args, **kwargs)
        return wrapped_func

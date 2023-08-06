
"""define the trigger for the specified weapon

"""

import logging
import sys

from tingyun.logistics.basic_wrapper import wrap_object, FunctionWrapper
from tingyun.logistics.object_name import callable_name
from tingyun.armoury.ammunition.django_tracker import WSGIApplicationResponse
from tingyun.armoury.ammunition.function_tracker import FunctionTracker, function_trace_wrapper
from tingyun.armoury.ammunition.tracker import current_tracker
from tingyun.battlefield.tracer import Tracer
from tingyun.battlefield.proxy import proxy_instance


console = logging.getLogger(__name__)


def wsgi_wrapper_inline(wrapped, framework, version):
    """ wrap the uwsgi application entrance
    :param wrapped: the method need to be wrapped
    :param args: framework/versions
    :return:
    """
    framework = '-'.join((framework, version))

    def wrapper(wrapped, instance, args, kwargs):
        """More detail about the argument, read the wrapper doc
        """
        environ, start_response = args

        tracker = current_tracker()
        if tracker:
            return wrapped(environ, start_response)

        tracker = Tracer(proxy_instance(), environ, framework)
        tracker.start_work()

        # respect the wsgi protocol
        def _start_response(status, response_headers, *args):
            # deal the response data
            tracker.deal_response(status, response_headers, *args)
            _write = start_response(status, response_headers, *args)

            def write(data):
                ret = _write(data)
                return ret

            return write

        result = []
        try:
            tracker.set_tracker_name(callable_name(wrapped), priority=1)
            application = function_trace_wrapper(wrapped)
            with FunctionTracker(tracker, name='Application', group='Python.WSGI'):
                result = application(environ, _start_response)
        except:
            tracker.finish_work(*sys.exc_info())
            raise

        return WSGIApplicationResponse(tracker, result)

    return FunctionWrapper(wrapped, wrapper)


# temporary use for function in wrap
# because can not pass the arguments to wsgi entrance
def wsgi_wrapper_inline_for_webpy(wrapped, framework='webpy', version=''):
    """ wrap the uwsgi application entrance
    :param wrapped: the method need to be wrapped
    :return:
    """
    framework = 'webpy'
    version = 'xx'
    try:
        import web
        version = getattr(web, "__version__")
    except Exception as _:
        pass

    framework = '-'.join((framework, version))

    def wrapper(wrapped, instance, args, kwargs):
        """More detail about the argument, read the wrapper doc
        """
        environ, start_response = args

        tracker = current_tracker()
        if tracker:
            return wrapped(environ, start_response)

        tracker = Tracer(proxy_instance(), environ, framework)
        tracker.start_work()

        # respect the wsgi protocol
        def _start_response(status, response_headers, *args):
            # deal the response data
            tracker.deal_response(status, response_headers, *args)
            _write = start_response(status, response_headers, *args)

            def write(data):
                ret = _write(data)
                return ret

            return write

        result = []
        try:
            tracker.set_tracker_name(callable_name(wrapped), priority=1)
            application = function_trace_wrapper(wrapped)
            with FunctionTracker(tracker, name='Application', group='Python.WSGI'):
                result = application(environ, _start_response)
        except:
            tracker.finish_work(*sys.exc_info())
            raise

        return WSGIApplicationResponse(tracker, result)

    return FunctionWrapper(wrapped, wrapper)


def wsgi_application_wrapper(module, object_path, *args):
    """
    :param module:
    :param object_path:
    :return:
    """
    wrap_object(module, object_path, wsgi_wrapper_inline, *args)


def wsgi_application_decorator(framework='xx', version='xx'):
    """
    :param framework: the framework of current use.
    :return:
    """
    framework = 'xx' if framework is None else framework
    version = 'xx' if version is None else version

    def decorator(wrapped):
        """
        :param wrapped:
        :return:
        """
        return wsgi_wrapper_inline(wrapped, framework, version)

    return decorator

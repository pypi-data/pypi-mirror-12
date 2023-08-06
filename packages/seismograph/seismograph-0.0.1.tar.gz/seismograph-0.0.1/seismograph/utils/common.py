# -*- coding: utf-8 -*-

import sys
import time
from contextlib import contextmanager

from ..exceptions import TimeoutException


WAITING_FOR_SLEEP = 0.5
WAITING_FOR_TIMEOUT = 30


def waiting_for(func, timeout=None, sleep=None, args=None, kwargs=None):
    args = args or tuple()
    kwargs = kwargs or {}

    sleep = sleep or WAITING_FOR_SLEEP
    timeout = timeout or WAITING_FOR_TIMEOUT

    t_start = time.time()

    while time.time() <= t_start + timeout:
        result = func(*args, **kwargs)

        if result:
            return result

        time.sleep(sleep)
    else:
        raise TimeoutException(
            'Timeout {} exceeded'.format(timeout),
        )


def call_to_chain(chain, method_name, *args, **kwargs):
    for obj in chain:
        if method_name:
            getattr(obj, method_name)(*args, **kwargs)
        else:
            obj(*args, **kwargs)


def measure_time():
    start_time = time.time()
    return lambda: time.time() - start_time


@contextmanager
def dev_null():
    class MockStd(object):

        def __getattr__(self, item):
            def null(*args, **kwargs):
                pass
            return null

    stdout = sys.stdout
    sys.stdout = MockStd()
    try:
        yield
    finally:
        sys.stdout = stdout

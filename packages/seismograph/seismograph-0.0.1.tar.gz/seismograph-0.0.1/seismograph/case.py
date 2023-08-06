# -*- coding: utf-8 -*-

import traceback
from functools import wraps
from unittest import TestCase as __UnitTest__

from six import with_metaclass

from . import steps
from . import loader
from . import runnable
from .utils import pyv
from . import extensions
from .exceptions import Skip
from .utils.common import measure_time
from .utils.common import call_to_chain
from .exceptions import ExtensionNotRequired
from .exceptions import ALLOW_RAISED_EXCEPTIONS


DEFAULT_LAYERS = []
MATCH_CASE_TO_LAYER = {}


SKIP_ATTRIBUTE_NAME = '__skip__'
SKIP_WHY_ATTRIBUTE_NAME = '__skip_why__'


def repeat(case):
    return case.__repeat__()


def prepare(case):
    return case.__prepare__(
        getattr(case, runnable.method_name(case)),
    )


def set_no_skip():
    global _skip

    def no_skip(reason):
        def wrapper(f):
            return f
        return wrapper

    _skip = no_skip


def setup_class_proxy(case):
    if hasattr(case.__class__, '__setup_class_was_called__'):
        return
    case.setup_class()
    setattr(case.__class__, '__setup_class_was_called__', True)


def teardown_class_proxy(case):
    if hasattr(case.__class__, '__teardown_class_was_called__'):
        return
    case.teardown_class()
    setattr(case.__class__, '__teardown_class_was_called__', True)


def _skip(reason):
    def wrapper(case):
        if not pyv.is_class_type(case):
            @wraps(case)
            def wrapped(*args, **kwargs):
                raise Skip(reason)
            case = wrapped

        setattr(case, SKIP_ATTRIBUTE_NAME, True)
        setattr(case, SKIP_WHY_ATTRIBUTE_NAME, reason)

        return case
    return wrapper


def skip(reason):
    return _skip(reason)


def skip_if(condition, reason):
    if condition:
        return _skip(reason)
    return lambda obj: obj


def skip_unless(condition, reason):
    if not condition:
        return _skip(reason)
    return lambda obj: obj


def flows(*flows):
    def wrapper(f):
        if pyv.is_class_type(f):
            setattr(f, '__flows__', flows)
            return f

        @wraps(f)
        def wrapped(self, *args, **kwargs):
            for flow in flows:
                if self.config.FLOWS_LOG:
                    self.console('  Flow: ', pyv.unicode_string(flow))
                f(self, flow, *args, **kwargs)
        return wrapped
    return wrapper


def make_case_class_from_function(
        func,
        base_class,
        doc=None,
        static=False,
        class_name=None,
        class_name_creator=None):
    if callable(class_name_creator):
        class_name = class_name_creator(func)

    if static or base_class.__static__:
        method = lambda s, *a, **k: func(*a, **k)
    else:
        method = func

    cls = type(
        class_name or func.__name__,
        (base_class, ),
        {
            '__doc__': doc or func.__doc__,
            loader.DEFAULT_TEST_NAME: method,
        },
    )

    return cls


def with_match_layers(context, case):
    for layer in context.layers:
        yield layer

    for cls, layer in MATCH_CASE_TO_LAYER.items():
        if isinstance(case, cls) and layer.enabled:
            yield layer


class CaseBox(object):

    def __init__(self, iterable):
        self.__cases = iterable
        self.__current = None

    def __call__(self, *args, **kwargs):
        self.run(*args, **kwargs)

    def __iter__(self):
        for case in self.__cases:
            yield case

    def __repr__(self):
        return repr(self.__current)

    def __str__(self):
        return str(self.__current)

    def __getattr__(self, item):
        return getattr(self.__current, item)

    def __run_one__(self, result):
        if self.__current.__repeatable__ and self.__current.config.REPEAT > 0:
            for _ in pyv.xrange(self.__current.config.REPEAT):
                self.__current(result)
        else:
            self.__current(result)

    def run(self, result):
        case = None

        for case in self.__cases:
            self.__current = case
            try:
                setup_class_proxy(self.__current)
            except BaseException:
                runnable.stopped_on(self.__current, 'setup_class')
                raise
            self.__run_one__(result)

        if case:
            try:
                teardown_class_proxy(self.__current)
            except BaseException:
                runnable.stopped_on(self.__current, 'teardown_class')
                raise


class MountData(object):

    def __init__(self, suite_name=None, require=None):
        self.__require = require
        self.__suite_name = suite_name

    @property
    def require(self):
        return self.__require

    @property
    def suite_name(self):
        return self.__suite_name


class AssertionBase(object):

    __unittest__ = __UnitTest__('__call__')

    def true(self, expr, msg=None):
        self.__unittest__.assertTrue(expr, msg=msg)

    def false(self, expr, msg=None):
        self.__unittest__.assertFalse(expr, msg=msg)

    def greater(self, a, b, msg=None):
        self.__unittest__.assertGreater(a, b, msg=msg)

    def equal(self, first, second, msg=None):
        self.__unittest__.assertEqual(first, second, msg=msg)

    def not_equal(self, first, second, msg=None):
        self.__unittest__.assertNotEqual(first, second, msg=msg)

    def raises(self, exc_class, callable_obj=None, *args, **kwargs):
        self.__unittest__.assertRaises(exc_class, callable_obj, *args, **kwargs)

    def is_instance(self, obj, cls, msg=None):
        self.__unittest__.assertIsInstance(obj, cls, msg=msg)

    def sequence_equal(self, seq1, seq2, msg=None, seq_type=None):
        self.__unittest__.assertSequenceEqual(seq1, seq2, msg=msg, seq_type=seq_type)

    def almost_equal(self, first, second, places=None, msg=None, delta=None):
        self.__unittest__.assertAlmostEqual(first, second, places=places, msg=msg, delta=delta)

    def not_almost_equal(self, first, second, places=None, msg=None, delta=None):
        self.__unittest__.assertNotAlmostEqual(first, second, places=places, msg=msg, delta=delta)


class CaseLayer(runnable.LayerOfRunnableObject):

    def on_init(self, case):
        """
        :type case: Case
        """
        pass

    def on_require(self, require):
        """
        :type require: list
        """
        pass

    def on_setup(self, case):
        """
        :type case: Case
        """
        pass

    def on_teardown(self, case):
        """
        :type case: Case
        """
        pass

    def on_skip(self, case, reason, result):
        """
        :type case: Case
        :type reason: str
        :type result: seismograph.result.Result
        """
        pass

    def on_any_error(self, error, case, result):
        """
        :type case: Case
        :type error: BaseException
        :type result: seismograph.result.Result
        """
        pass

    def on_error(self, error, case, result):
        """
        :type case: Case
        :type error: BaseException
        :type result: seismograph.result.Result
        """
        pass

    def on_context_error(self, error, case, result):
        """
        :type case: Case
        :type error: BaseException
        :type result: seismograph.result.Result
        """
        pass

    def on_fail(self, fail, case, result):
        """
        :type case: Case
        :type fail: AssertionError
        :type result: seismograph.result.Result
        """
        pass

    def on_success(self, case):
        """
        :type case: Case
        """
        pass

    def on_run(self, case):
        """
        :type case: Case
        """
        pass


class CaseContext(runnable.ContextOfRunnableObject):

    def __init__(self,
                 setup,
                 teardown,
                 layers=None,
                 extensions=None):
        self.__require = []
        self.__layers = layers if layers else []
        self.__extensions = dict(extensions) if extensions else {}

        self.__setup_callbacks = [setup]
        self.__teardown_callbacks = [teardown]

    @property
    def require(self):
        return self.__require

    @property
    def extensions(self):
        return self.__extensions

    @property
    def setup_callbacks(self):
        return self.__setup_callbacks

    @property
    def teardown_callbacks(self):
        return self.__teardown_callbacks

    @property
    def layers(self):
        for layer in DEFAULT_LAYERS:
            if layer.enabled:
                yield layer

        for layer in self.__layers:
            if layer.enabled:
                yield layer

    def start_context(self, case):
        try:
            call_to_chain(self.__setup_callbacks, None)
            call_to_chain(
                with_match_layers(self, case), 'on_setup', case,
            )
        except BaseException:
            runnable.stopped_on(case, 'start_context')
            raise

    def stop_context(self, case):
        try:
            call_to_chain(self.__teardown_callbacks, None)
            call_to_chain(
                with_match_layers(self, case), 'on_teardown', case,
            )
        except BaseException:
            runnable.stopped_on(case, 'stop_context')
            raise

    def install_extensions(self):
        for ext_name in self.require:
            if ext_name not in self.__extensions:
                self.__extensions[ext_name] = extensions.get(ext_name)

    def on_init(self, case):
        call_to_chain(
            with_match_layers(self, case), 'on_init', case,
        )

    def on_require(self, case):
        call_to_chain(
            with_match_layers(self, case), 'on_require', self.__require,
        )

    def on_skip(self, case, reason, result):
        try:
            call_to_chain(
                with_match_layers(self, case), 'on_skip', case, reason, result,
            )
        except BaseException:
            runnable.stopped_on(case, 'on_skip')
            raise

    def on_any_error(self, error, case, result):
        try:
            call_to_chain(
                with_match_layers(self, case), 'on_any_error', error, case, result,
            )
        except BaseException:
            runnable.stopped_on(case, 'on_any_error')
            raise

    def on_error(self, error, case, result):
        try:
            call_to_chain(
                with_match_layers(self, case), 'on_error', error, case, result,
            )
        except BaseException:
            runnable.stopped_on(case, 'on_error')
            raise

    def on_context_error(self, error, case, result):
        try:
            call_to_chain(
                with_match_layers(self, case), 'on_context_error', error, case, result,
            )
        except BaseException:
            runnable.stopped_on(case, 'on_context_error')
            raise

    def on_fail(self, fail, case, result):
        try:
            call_to_chain(
                with_match_layers(self, case), 'on_fail', fail, case, result,
            )
        except BaseException:
            runnable.stopped_on(case, 'on_fail')
            raise

    def on_success(self, case):
        try:
            call_to_chain(
                with_match_layers(self, case), 'on_success', case,
            )
        except BaseException:
            runnable.stopped_on(case, 'on_success')
            raise

    def on_run(self, case):
        try:
            call_to_chain(
                with_match_layers(self, case), 'on_run', case,
            )
        except BaseException:
            runnable.stopped_on(case, 'on_run')
            raise


assertion = AssertionBase()


class Case(with_metaclass(steps.CaseMeta, runnable.RunnableObject, runnable.MountObjectMixin)):

    __flows__ = None
    __layers__ = None
    __static__ = False
    __require__ = None
    __repeatable__ = True
    __create_reason__ = False
    __always_success__ = False
    __assertion_class__ = None

    #
    # Base components of runnable object
    #

    def __is_run__(self):
        return self.__is_run

    def __is_mount__(self):
        mount_data = getattr(
            self, '__mount_data__', None,
        )
        return isinstance(mount_data, MountData)

    def __method_name__(self):
        return self._method_name

    @runnable.mount_method
    def __class_name__(self):
        return '{}.{}'.format(
            self.__mount_data__.suite_name, self.__class__.__name__,
        )

    #
    # Behavior on magic methods
    #

    def __str__(self):
        return '{} ({}:{})'.format(
            self._method_name,
            self.__mount_data__.suite_name,
            self.__class__.__name__,
        )

    #
    # Self code is starting here
    #

    @runnable.mount_method
    def __init__(self, method_name, config=None, extensions=None):
        if not hasattr(self, method_name):
            raise AttributeError(
                '"{}" does not have attribute "{}"'.format(
                    self.__class__.__name__,
                    method_name,
                ),
            )

        if self.__flows__ and not steps.is_step_by_step_case(self):
            setattr(
                self.__class__,
                method_name,
                flows(*self.__flows__)(getattr(self.__class__, method_name)),
            )

        self.__console = None
        self.__config = config

        self.__is_run = False
        self._method_name = method_name

        self.__context = CaseContext(
            self.setup,
            self.teardown,
            extensions=extensions,
            layers=self.__layers__,
        )

        if self.__mount_data__.require:
            self.__context.require.extend(
                self.__mount_data__.require,
            )

        if self.__require__:
            self.__context.require.extend(
                self.__require__,
            )

        if self.__assertion_class__:
            self.__assertion = self.__assertion_class__()
        else:
            self.__assertion = assertion

        self.__context.on_init(self)
        self.__context.on_require(self)

        self.__context.install_extensions()

        super(Case, self).__init__()

    @classmethod
    def mount_to(cls, suite, require=None):
        if hasattr(cls, '__mount_data__'):
            raise RuntimeError(
                'Case "{}" already mounted'.format(cls.__name__),
            )

        common_require = []

        if require:
            common_require.extend(require)

        if suite.context.require:
            common_require.extend(suite.context.require)

        cls.__mount_data__ = MountData(
            suite_name=suite.name,
            require=common_require,
        )

        return cls

    def __repeat__(self):
        yield

    def __prepare__(self, method):
        return method

    @property
    def config(self):
        return self.__config

    @property
    @runnable.run_method
    def console(self):
        return self.__console

    @property
    def context(self):
        return self.__context

    @property
    def assertion(self):
        return self.__assertion

    @classmethod
    def setup_class(cls):
        pass

    @classmethod
    def teardown_class(cls):
        pass

    def setup(self):
        pass

    def teardown(self):
        pass

    def ext(self, name):
        if name not in self.__context.require:
            raise ExtensionNotRequired(name)

        return self.__context.extensions.get(name)

    @runnable.run_method
    def skip_test(self, reason):
        _skip(reason)(lambda: None)()

    def run(self, result):
        self.__is_run = True
        if result.current_state.should_stop:
            return

        timer = measure_time()

        with result.proxy() as result_proxy:
            result_proxy.print_start(self)

            if self.__always_success__:
                result_proxy.add_success(
                    self, timer(),
                )
                self.__context.on_success(self)
                return

            if hasattr(self, SKIP_ATTRIBUTE_NAME):
                reason = getattr(self, SKIP_WHY_ATTRIBUTE_NAME, 'no reason')
                result_proxy.add_skip(
                    self, reason, timer(),
                )
                self.__context.on_skip(self, reason, result_proxy)
                return

            self.__console = result_proxy.console.child_console()

            try:
                was_success = True
                self.__context.on_run(self)

                with self.__context(self):
                    try:
                        repeater = repeat(self)
                        test_method = prepare(self)

                        for _ in iter(repeater):
                            test_method()
                    except ALLOW_RAISED_EXCEPTIONS:
                        raise
                    except Skip as s:
                        was_success = False
                        result_proxy.add_skip(
                            self, s.message, timer(),
                        )
                        self.__context.on_skip(self, s.message, result_proxy)
                    except AssertionError as fail:
                        was_success = False
                        result_proxy.add_fail(
                            self, traceback.format_exc(), timer(), fail,
                        )
                        self.__context.on_fail(fail, self, result_proxy)
                    except BaseException as error:
                        was_success = False
                        result_proxy.add_error(
                            self, traceback.format_exc(), timer(), error,
                        )
                        self.__context.on_error(error, self, result_proxy)
                        self.__context.on_any_error(error, self, result_proxy)

                if was_success:
                    result_proxy.add_success(
                        self, timer(),
                    )
                    self.__context.on_success(self)
            except ALLOW_RAISED_EXCEPTIONS:
                raise
            except BaseException as error:
                result_proxy.add_error(
                    self, traceback.format_exc(), timer(), error,
                )
                self.__context.on_context_error(error, self, result_proxy)
                self.__context.on_any_error(error, self, result_proxy)

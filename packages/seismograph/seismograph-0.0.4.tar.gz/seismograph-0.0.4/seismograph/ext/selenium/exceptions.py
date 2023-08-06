# -*- coding: utf-8 -*-

from ...exceptions import SeismographError


class SeleniumExError(SeismographError):
    pass


class RouterError(SeleniumExError):
    pass


class RouteNotFound(RouterError):
    pass


class ReRaiseWebDriverException(SeleniumExError):
    pass


class FieldError(SeleniumExError):
    pass

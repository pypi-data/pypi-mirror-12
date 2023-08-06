# -*- coding: utf-8 -*-

from . import fields
from .group import make_field
from .group import FieldsGroup
from .group import iter_fields
from .group import iter_invalid
from .group import iter_required
from .group import preserve_original


class UIForm(FieldsGroup):

    def submit(self):
        raise NotImplementedError(
            'Method "submit" not implemented in "{}"'.format(
                self.__class__.__name__,
            ),
        )


__all__ = (
    'fields',
    'UIForm',
    'make_field',
    'FieldsGroup',
    'iter_fields',
    'iter_invalid',
    'iter_required',
    'preserve_original',
)

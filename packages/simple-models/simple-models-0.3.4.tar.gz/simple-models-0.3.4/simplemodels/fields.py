# -*- coding: utf-8 -*-
""" Fields for DictEmbedded model """
import copy
from decimal import Decimal, InvalidOperation

import six

from simplemodels import PYTHON_VERSION
from simplemodels.exceptions import ValidationError, ValidationDefaultError, \
    ImmutableFieldError
from simplemodels.utils import is_document


__all__ = ['SimpleField', 'IntegerField', 'FloatField', 'DecimalField',
           'CharField', 'BooleanField', 'ListField']


class SimpleField(object):

    """Class-field with descriptor for DictEmbeddedDocument"""

    MUTABLE_TYPES = (list, dict, set, bytearray)

    def __init__(self, default=None, required=False, choices=None, name=None,
                 validators=None, error_text='', immutable=False, **kwargs):
        """
        :param name: optional name
        :param default: default value
        :param required: is field required
        :param choices: choices list.
        :param validator: callable object to validate a value. DEPRECATED
        :param validators: list of callable objects - validators
        :param error_text: user-defined error text in case of errors
        :param immutable: immutable field type
        :param kwargs: for future options
        """

        self._name = None           # set by object holder (Document)
        self._holder_name = None    # set by object holder (Document)
        self._verbose_name = kwargs.get('verbose_name', name)

        self.required = required
        if choices and not isinstance(choices, (tuple, list, set)):
            raise ValueError(
                'Wrong choices data type {}, '
                'must be (tuple, list, set)'.format(type(choices)))
        self.choices = choices

        # NOTE: new feature - chain of validators
        self.validators = validators or []
        self._value = None  # will be set by Document
        self.error_text = error_text

        # Set default value
        self._set_default_value(default)

        self._immutable = immutable

    def _set_default_value(self, value):
        """Set default value, handle mutable default parameters,
        delegate set callable default value to Document

        :param value: default value
        """
        if isinstance(value, self.MUTABLE_TYPES):
            self.default = lambda: copy.deepcopy(value)
        else:
            self.default = value

        if value is not None:
            if callable(self.default):
                self.validate(value=self.default(), err=ValidationDefaultError)
            else:
                self.default = self.validate(value=self.default,
                                             err=ValidationDefaultError)

    @property
    def name(self):
        return self._verbose_name or self._name

    def validate(self, value, err=ValidationError):
        """Helper method to validate field.

        :param value: value to validate
        :param err: simplemodels.exceptions.ValidationError class
        :return: value
        """

        if not self.validators:
            return value

        for validator in self.validators:
            try:
                if is_document(validator):
                    # use document as a validator for nested documents
                    doc_cls = validator
                    value = doc_cls(**value)
                else:
                    value = validator(value)

            # InvalidOperation for decimal, TypeError
            except InvalidOperation:
                raise err("Invalid decimal operation for '{!r}' for the field "
                          "`{!r}`. {}".format(value, self, self.error_text))
            except (ValueError, TypeError):
                # Accept None value for non-required fields
                if not self.required and value is None:
                    return value

                raise err("Wrong value '{!r}' for the field `{!r}`. "
                          "{}".format(value, self, self.error_text))

        if self.choices:
            if value not in self.choices:
                raise ValueError(
                    'Value {} is restricted by choices: {}'.format(
                        value, self.choices))
        return value

    @staticmethod
    def _add_default_validator(validator, kwargs):
        """Helper method for subclasses

        :param validator:
        """
        kwargs.setdefault('validators', [])

        if validator not in kwargs['validators']:
            kwargs['validators'].append(validator)
        return kwargs

    def __get__(self, instance, owner):
        return instance.__dict__.get(self.name, self.default)

    def __set__(self, instance, value):
        if self._immutable:
            raise ImmutableFieldError('{!r} field is immutable'.format(self))
        value = self.validate(value)
        instance.__dict__[self.name] = value

    def __repr__(self):
        if self._holder_name and self.name:
            return six.u("{}.{}".format(self._holder_name, self.name))
        else:
            return self.__class__.__name__

    def __unicode__(self):
        return self.__repr__()


class IntegerField(SimpleField):
    def __init__(self, **kwargs):
        self._add_default_validator(int, kwargs)
        super(IntegerField, self).__init__(**kwargs)


class FloatField(SimpleField):
    def __init__(self, **kwargs):
        self._add_default_validator(float, kwargs)
        super(FloatField, self).__init__(**kwargs)


class DecimalField(SimpleField):
    def __init__(self, **kwargs):
        self._add_default_validator(Decimal, kwargs)
        super(DecimalField, self).__init__(**kwargs)


class CharField(SimpleField):
    def __init__(self, is_unicode=True, max_length=None, **kwargs):
        if PYTHON_VERSION == 2:
            validator = unicode if is_unicode else str
        else:
            validator = str

        self._add_default_validator(validator, kwargs)

        # Add max length validator
        if max_length:
            self.max_length = max_length
            self._add_default_validator(
                validator=self._validate_max_length,
                kwargs=kwargs)

        super(CharField, self).__init__(**kwargs)

    def _validate_max_length(self, value):
        if len(value) > self.max_length:
            raise ValidationError(
                'Max length is exceeded ({} < {}) for the field {!r}'.format(
                    len(value), self.max_length, self))


class BooleanField(SimpleField):
    def __init__(self, **kwargs):
        self._add_default_validator(bool, kwargs)
        super(BooleanField, self).__init__(**kwargs)


class DocumentField(SimpleField):
    """Embedded document field"""

    def __init__(self, model, **kwargs):
        self._add_default_validator(model, kwargs)
        super(DocumentField, self).__init__(**kwargs)


class ListField(SimpleField):
    """ List of items field"""

    def __init__(self, item_types, **kwargs):
        if not isinstance(item_types, (list, set, tuple)):
            raise ValueError(
                'Wrong item_types data format, must be list, '
                'set or tuple, given {}'.format(type(item_types)))
        self._add_default_validator(list, kwargs)

        # list of possible item instances, for example: [str, int, float]
        # NOTE: unicode value will be accepted for `str` type
        self._item_types = []

        # Item type must be callable
        errors = []
        for t in item_types:
            if callable(t):
                self._item_types.append(t)
            else:
                errors.append('{} item type must be callable'.format(t))

        if errors:
            raise ValueError('\n'.join(errors))

        super(ListField, self).__init__(**kwargs)

    def validate(self, value, err=ValidationError):
        """Custom list field validate method

        :param value: values list, save value name for interface compatibility
        :param err: Exception class
        :return: :raise err:
        """
        items_list = value
        if not isinstance(items_list, list):
            raise err('Wrong values type {}, must be a list'.format(
                type(items_list)))

        errors = []
        types = tuple(self._item_types)
        for item in items_list:
            if not isinstance(item, types):
                # Unicode hook for python 2, accept unicode type as a str value
                if PYTHON_VERSION == 2 and str in types:
                    if isinstance(item, unicode):
                        continue
                errors.append(
                    'List value {} has wrong type ({}), must be one of '
                    '{}'.format(item, type(item).__name__, self._item_types))

        if errors:
            raise err('\n'.join(errors))
        return items_list

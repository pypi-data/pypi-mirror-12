# -*- coding: utf-8 -*-
"""
    csquery.lucene
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    * http://lucene.apache.org/core/3_5_0/queryparsersyntax.html
    * http://www.lucenetutorial.com/lucene-query-syntax.html

    :author: tell-k <ffk2005 at gmail.com>
    :copyright: tell-k All Rights Reserved.
"""
from __future__ import division, print_function, absolute_import, unicode_literals  # NOQA

from collections import OrderedDict


def escape(string):
    return string.replace("'", "\'").replace('\\', '\\\\')


def format_value(value):
    if type(value) in (list, tuple):
        return format_range_values(*value)
    if type(value) == Expression:
        return value()
    try:
        if (value.startswith('(') and value.endswith(')'))\
                or (value.startswith('{') and value.endswith(']'))\
                or (value.startswith('[') and value.endswith('}'))\
                or (value.startswith('[') and value.endswith(']'))\
                or (value.startswith("'") and value.endswith("'"))\
                or ('=' in value):
            return str(escape(value))
    except AttributeError:
        return str(value)
    return "'{}'".format(escape(value))


def format_range_values(start, end=None):
    return '{}{},{}{}'.format(
        '[' if start not in (None, '') else '{',
        start if start not in (None, '') else '',
        end if end not in (None, '') else '',
        ']' if end not in (None, '') else '}',
    )


def format_options(options={}):
    if not options:
        return ''
    return ' ' + ' '.join(['{}={}'.format(k, v)
                           for k, v in options.items()])


class FieldValue(object):

    def __init__(self, value, name=None):
        if type(value) == dict:
            name, value = value.popitem()
        self.name = name
        self.value = format_value(value)

    def to_value(self):
        if self.name:
            return '{}:{}'.format(self.name, self.value)
        return self.value

    def __call__(self):
        return self.to_value()

    def __str__(self):
        return self.to_value()

    def __repr__(self):
        return '<{}: {}>'.format(self.__class__.__name__, self.to_value())


class Expression(object):

    def __init__(self, operator, options={}, *args, **kwargs):
        self.operator = operator
        self.options = options
        self.fields = [FieldValue(value=a) for a in args]
        self.fields += [FieldValue(name=k, value=kwargs[k])
                        for k in sorted(kwargs.keys())]

    def query(self):
        return '({}{}{})'.format(
            self.operator,
            format_options(self.options),
            ' {}'.format(' '.join([f() for f in self.fields]))
        )

    def __call__(self):
        return self.query()

    def __str__(self):
        return self.query()

    def __repr__(self):
        return '<{}: {}>'.format(self.__class__.__name__, self.query())


def _get_option(keys, options):
    opts = OrderedDict()
    opts.update(((key, options.pop(key)) for key in keys if key in options))
    return opts


def field(value, name=None):
    return FieldValue(value, name)


def and_(*args, **kwargs):
    return Expression('and', _get_option(['boost'], kwargs), *args, **kwargs)


def not_(*args, **kwargs):
    return Expression('not', _get_option(['field', 'boost'], kwargs),
                      *args, **kwargs)


def or_(*args, **kwargs):
    return Expression('or', _get_option(['boost'], kwargs), *args, **kwargs)


def range_(*args, **kwargs):
    return Expression('range', _get_option(['field', 'boost'], kwargs),
                      *args, **kwargs)


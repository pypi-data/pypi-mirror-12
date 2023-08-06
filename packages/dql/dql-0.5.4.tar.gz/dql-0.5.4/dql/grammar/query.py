""" Grammars for parsing query strings """
from pyparsing import (Group, OneOrMore, ZeroOrMore, delimitedList, Suppress,
                       Optional, oneOf, Combine, nestedExpr, Forward, Word)

from .common import (var, value, and_, and_or, in_, upkey, primitive, set_,
                     not_, types, string)


def make_function(name, *args):
    """ Construct a parser for a standard function format """
    expr = Word(name) + Suppress(Word('(')) + args[0]
    for arg in args[1:]:
        expr += Suppress(Word(',')) + arg
    return (expr + Suppress(Word(')')))


def create_query_constraint():
    """ Create a constraint for a query WHERE clause """
    op = oneOf('= < > >= <= != <>', caseless=True).setName('operator')
    basic_constraint = (var + op + value).setResultsName('operator')
    between = (var + Suppress(upkey('between')) + value + Suppress(and_) +
               value).setResultsName('between')
    is_in = (var + Suppress(upkey('in')) + set_).setResultsName('in')
    function = (
        make_function('attribute_exists', var) |
        make_function('attribute_not_exists', var) |
        make_function('attribute_type', var, types) |
        make_function('begins_with', var, Group(string)) |
        make_function('contains', var, value) |
        (make_function('size', var) + op + value)
    ).setResultsName('function')
    all_constraints = (between | basic_constraint | is_in | function)
    return Group(all_constraints).setName('constraint')


def create_filter_constraint():
    """ Create a constraint for a scan FILTER clause """
    op = oneOf('= != < > >= <= CONTAINS',
               caseless=True).setName('operator')
    basic_constraint = (var + op + value)
    between = (var + upkey('between') +
               Group(Suppress('(') + value + Suppress(',') + value +
                     Suppress(')')))
    null = (var + upkey('is') + upkey('null'))
    nnull = (var + upkey('is') + Combine(upkey('not') + upkey('null'), ' ', False))
    is_in = (var + upkey('in') + set_)
    ncontains = (var + Combine(upkey('not') + upkey('contains'), ' ', False) + primitive)
    begins_with = (var + Combine(upkey('begins') + upkey('with'), ' ', False) + primitive)
    return Group(between |
                 basic_constraint |
                 begins_with |
                 null |
                 nnull |
                 is_in |
                 ncontains
                 ).setName('constraint')

# pylint: disable=C0103
constraint = create_query_constraint()
filter_constraint = create_filter_constraint()
# pylint: enable=C0103


def create_where():
    """ Create a grammar for the 'where' clause used by 'select' """
    conjunction = Forward().setResultsName('conjunction')
    nested = Group(Suppress('(') + conjunction + Suppress(')'))\
        .setResultsName('conjunction')

    maybe_nested = (nested | constraint)
    inverted = Group(not_ + maybe_nested).setResultsName('not')
    full_constraint = (maybe_nested | inverted)
    conjunction <<= (full_constraint + OneOrMore(and_or + full_constraint))
    return upkey('where') + Group(conjunction | full_constraint).setResultsName('where')


def create_keys_in():
    """ Create a grammer for the 'KEYS IN' clause used for queries """
    keys = Group(Optional(Suppress('(')) + value + Optional(Suppress(',') + value) +
                 Optional(Suppress(')')))
    return (Suppress(upkey('keys') + upkey('in')) + delimitedList(keys))\
        .setResultsName('keys_in')


# pylint: disable=C0103
if_exists = Group(upkey('if') + upkey('exists'))\
    .setResultsName('exists')
if_not_exists = Group(upkey('if') + upkey('not') + upkey('exists'))\
    .setResultsName('not_exists')

where = create_where()
keys_in = create_keys_in()
limit = Group(upkey('limit') + value).setResultsName('limit')

JMESPath
========

JMESPath (pronounced ``\ˈjāmz path\``) allows you to declaratively specify how to
extract elements from a JSON document.

For example, given this document::

    {"foo": {"bar": "baz"}}

The jmespathv041p expression ``foo.bar`` will return "baz".

JMESPath also supports:

Referencing elements in a list.  Given the data::

    {"foo": {"bar": ["one", "two"]}}

The expression: ``foo.bar[0]`` will return "one".
You can also reference all the items in a list using the ``*``
syntax::

   {"foo": {"bar": [{"name": "one"}, {"name": "two"}]}}

The expression: ``foo.bar[*].name`` will return ["one", "two"].
Negative indexing is also supported (-1 refers to the last element
in the list).  Given the data above, the expression
``foo.bar[-1].name`` will return "two".

The ``*`` can also be used for hash types::

   {"foo": {"bar": {"name": "one"}, "baz": {"name": "two"}}}

The expression: ``foo.*.name`` will return ["one", "two"].

**NOTE: jmespathv041p is being actively developed.  There are a number
of features it does not currently support that may be added in the
future.**


Specification
=============

The grammar is specified using ABNF, as described in `RFC4234`_.
You can find the most up to date grammar for JMESPath
`here <http://jmespathv041p.readthedocs.org/en/latest/specification.html#grammar>`__.

You can read the full JMESPath specification
`here http://jmespathv041p.readthedocs.org/en/latest/specification.html`__.


Testing
=======

In addition to the unit tests for the jmespathv041p modules,
there is a ``tests/compliance`` directory that contains
.json files with test cases.  This allows other implementations
to verify they are producing the correct output.  Each json
file is grouped by feature.

Python Library
==============

The included python implementation has two convenience functions
that operate on python data structures.  You can use ``search``
and give it the jmespathv041p expression and the data::

    >>> import jmespathv041p
    >>> path = jmespathv041p.search('foo.bar', {'foo': {'bar': 'baz'}})
    'baz'

Similar to the ``re`` module, you can store the compiled expressions
and reuse them to perform repeated searches::

    >>> import jmespathv041p
    >>> path = jmespathv041p.compile('foo.bar')
    >>> path.search({'foo': {'bar': 'baz'}})
    'baz'
    >>> path.search({'foo': {'bar': 'other'}})
    'other'

You can also use the ``jmespathv041p.parser.Parser`` class directly
if you want more control.

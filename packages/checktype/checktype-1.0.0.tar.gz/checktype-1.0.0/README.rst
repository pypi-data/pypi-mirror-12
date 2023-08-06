Intuitive and minimalistic type checking for Python objects
===========================================================



Checktype allows simple checking of Python object formats.

E.g. make sure that an object is a list of tuples, each tuple with an int, a string and a float. This would be expressed as:

.. code:: python

    use_strict() # to activate checktype
    checktype([(1, 'hello', 2.0)], "[(1, 's', 1.0)]")

Checktype can catch many programming errors by validating your complex datastructures. It is particularily helpful when refactoring programs.Checktype has a very intuitive type system that mimics the way you define your own Python objects.

Published as a pip package at https://pypi.python.org/pypi/checktype/

Usage examples:

.. code:: python


    from checktype import checktype, use_strict # pip install checktype

    # 'activates' checktype
    # you need to explicitly configure checktype's 'strict' mode,
    # else it will do nothing (by default, to save cpu time)
    # it's common to specify it in tests
    use_strict()

    # checktype only provides a single function, that takes two arguments.
    # the first one is the python object you want to test;
    # the second one is an 'object specification' (spec), that mimics the way
    # objects are represented in Python. This spec is a string representation of
    # a python object. For example, to check that 12 is an int or 'hello' is a str:
    checktype(12, '1')
    checktype('hello', " 's' ") # note that you have to put quotes around the str

    # It is customary to consistently use the same placeholders in the spec (e.g. 1 for ints, s for string), but any value of the right type will work:
    checktype(12, '12')
    checktype(12, '12345')

    # A list of exactly 3 floats is specified as [1.,1.,1.]
    checktype([1.0,2.0,3.0], '[1.,1.,1.]')

    # To match a variable-length list of ints, use [1..]
    checktype([1,2,3], '[1..]')

    # And so on for tuples,
    checktype((1,2,3), '(1,1,1)')
    checktype((1,2,3), '(1..)')
    # dictionnaries,
    checktype({11:2},  '{1:1}')
    checktype({11:2, 12: 3},  '{1:1}')
    # and sets
    checktype({11, 2},  '{1}')

    # use the ? wildcard if you don't want to check for a specific part
    checktype({11:2, 12: "a", 13:(3,4)},  '{1:?}')

    # more complex examples
    checktype({11: (2,3), 12: (4,"5")}, '{ 1: (1,?)}')
    checktype([(2, "asdf"),(-12, "asfwe"),(1,"")], "[(1,'s')..]")
    checktype([(1, 'hello', 2.0)], "[(1, 's', 1.0)]")

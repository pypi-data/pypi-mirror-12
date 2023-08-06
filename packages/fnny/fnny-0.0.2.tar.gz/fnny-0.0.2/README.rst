very, very fnny
---------------

.. image:: https://travis-ci.org/cpdean/fnny.svg?branch=master
    :target: https://travis-ci.org/cpdean/fnny

library with some helper functions that make more functions for you.

check it out

make a plucker with pluck::

    from fnny import pluck as p
    from collections import namedtuple
    G = namedtuple("G", ["a"])
    guys = [G(i) for i in range(10)]
    expected = sum(map(lambda x: x.a, guys))
    actual = sum(map(p.a, guys))
    assert expected == actual


call a method with method::

    from fnny import method as m
    from test.test_it import _Argless()
    no_args = [_Argless() for a in range(10)]
    expected = list(map(lambda x: x.wow(), no_args))
    actual = list(map(m.wow, no_args))
    assert expected == actual

use a partially applied method with partial::
    
    from fnny import partial as pa
    from test.test_it import _OneArg()
    has_args = [_OneArg() for a in range(10)]
    expected = list(map(lambda x: x.add(1), has_args))
    actual = list(map(pa.add(1), has_args))
    assert expected == actual


partial even supports kwargs::

    from test.test_it import _OneKwarg()
    has_args = [_OneKwarg() for a in range(10)]
    expected = list(map(lambda x: x.derp(something="heyy"), has_args))
    actual = list(map(pa.derp(something="heyy"), has_args))
    assert expected == actual


but actually, python already has a way more idiomatic way to do all of the above::

    guys = [G(i) for i in range(10)]
    assert sum(map(lambda x: x.a, guys)) == sum(g.a for g in guys)

    no_args = [_Argless() for a in range(10)]
    expected = list(map(lambda x: x.wow(), no_args))
    actual = [argless.wow() for argless in no_args]
    assert expected == actual

    has_args = [_OneArg() for a in range(10)]
    expected = list(map(lambda x: x.add(1), has_args))
    actual = [one.add(1) for one in has_args]
    assert expected == actual

    has_kwargs = [_OneKwarg() for a in range(10)]
    expected = list(map(lambda x: x.derp(something="heyy"), has_kwargs))
    actual = [kw.derp(something="heyy") for kw in has_kwargs]
    assert expected == actual

But maybe there's still a place for a discriptor-based lib for function generation.

I'll add examples as soon as I think of them, I guess.

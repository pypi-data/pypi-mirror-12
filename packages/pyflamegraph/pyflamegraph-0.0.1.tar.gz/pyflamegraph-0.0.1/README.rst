============
pyflamegraph
============

Description
-----------

This is a cheap, hacky, shell wrapper around Brendan Gregg's flame graph
generator.

Installation
------------

New versions will be updated to PyPI pretty regularly so it should be as
easy as:

.. code:: bash

    pip install pyflamegraph

Running a Test instance
-----------------------

.. code:: python

    from pyflamegraph import generate

    svg = generate(input_source)

=========
omitempty
=========

.. image:: https://travis-ci.org/bfontaine/omitempty.svg?branch=master
   :target: https://travis-ci.org/bfontaine/omitempty
   :alt: Build status

.. image:: https://coveralls.io/repos/bfontaine/omitempty/badge.png?branch=master
   :target: https://coveralls.io/r/bfontaine/omitempty?branch=master
   :alt: Coverage status

.. image:: https://img.shields.io/pypi/v/omitempty.png
   :target: https://pypi.python.org/pypi/omitempty
   :alt: Pypi package

``omitempty`` is a Python module to remove empty keys in a dictionary. Its name
comes from Go’s ``json`` package which supports an ``omitempty`` tag not to
marshal empty struct fields.

The module exposes only one function that takes a dictionary and remove all
keys with falsy values.

Install
-------

.. code-block::

    [sudo] pip install omitempty

The library works with both Python 2.x and 3.x.


Usage
-----

Import the module and use it directly: ::

    import omitempty

    d = omitempty({"a": a(), "b": b(), "c": c()})


Boolean
========

.. image:: https://travis-ci.org/scisco/boolean.svg?branch=develop
    :target: https://travis-ci.org/scisco/boolean

.. image:: https://badge.fury.io/py/boolean.svg
    :target: http://badge.fury.io/py/boolean

.. image:: https://img.shields.io/pypi/l/boolean.svg
    :target: https://pypi.python.org/pypi/boolean/
    :alt: License


Converts strings such as "true", "True", "y", "n", ... to their equivalent Boolean value.

Installation
------------

.. code::

  $ pip install boolean

Usage
-----

.. code::

  >>> from boolean import boolean
  >>> boolean('True')
  True
  >>> boolean('t')
  True
  >>> boolean('f')
  False
  >>> boolean('False')
  False


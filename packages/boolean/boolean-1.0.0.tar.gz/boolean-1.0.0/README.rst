booleanp
========

Converts strings such as "true", "True", "y", "n", ... to their equivalent Boolean value.

Installation
------------

.. ::

  $ pip install boolean

Usage
-----

.. ::

  >>> from boolean import boolean
  >>> boolean('True')
  True
  >>> boolean('t')
  True
  >>> boolean('f')
  False
  >>> boolean('False')
  False


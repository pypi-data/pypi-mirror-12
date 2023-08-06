Setuptools lint command
=======================


This package expose `pylint`_ as a lint command into setup.py.


Installation
------------

This package is published on pypi. You can use pip to install it.

::

    pip install setuptools-lint


Usage
-----

::

    python setup.py lint


For a full list of options, do

::

  python setup.py lint --help

.. _`pylint` : http://pypi.python.org/pypi/pylint


News
====

0.4
---

*Release date: 18-Nov-2015*

* allow to pipe commands like ``python setup.py lint install``

0.3
---

*Release date: 14-Jun-2014*

* Adding dependency handeling, similar to that of setuptools's test command,
  such that required dependencies get fetched and added to the path prior to
  running the lint

0.2
---

*Release date: 7-Apr-2014*

* Better support for packages
* Allow specification of PyLint config file either on commandline or as setup
  keyword arg

0.1
---

*Release date: 5-Jun-2012*

* First release



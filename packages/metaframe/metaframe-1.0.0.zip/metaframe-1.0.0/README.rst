
metaframe
=========

.. image:: https://img.shields.io/pypi/v/metaframe.svg
   :alt: PyPi Version
   :scale: 100%
   :target: https://pypi.python.org/pypi/metaframe/

.. image:: https://img.shields.io/pypi/dm/metaframe.svg
   :alt: PyPi Monthly Donwloads
   :scale: 100%
   :target: https://pypi.python.org/pypi/metaframe/

.. image:: https://img.shields.io/pypi/l/metaframe.svg
   :alt: License
   :scale: 100%
   :target: https://github.com/mementum/metaframe/blob/master/LICENSE

.. image:: https://travis-ci.org/mementum/metaframe.png?branch=master
   :alt: Travis-ci Build Status
   :scale: 100%
   :target: https://travis-ci.org/mementum/metaframe

.. image:: https://readthedocs.org/projects/metaframe/badge/?version=latest
   :alt: Documentation Status
   :scale: 100%
   :target: https://readthedocs.org/projects/metaframe/

.. image:: https://img.shields.io/pypi/pyversions/metaframe.svg
   :alt: Pytghon versions
   :scale: 100%
   :target: https://pypi.python.org/pypi/metaframe/

MetaClass infrastructure to intercept instance creation/initialization enabling
modification of args/kwargs and instance.

Documentation
=============

Read the full documentation at readthedocs.org:

  - `metaframe documentation <http://metaframe.readthedocs.org/en/latest/introduction.html>`_

Python 2/3 Support
==================

  - Python 2.7
  - Python 3.2/3.3/3.4/3.5

  - It also works with pypy and pypy3

Installation
============

``metaframe`` is self-contained with no external dependencies

From pypi::

  pip install metaframe

From source:

  - Place the *metaframe* directory found in the sources inside your project

Features:
=========

  - ``MetaFrame`` metaclass to apply to any object
    - With embedded staticmethod with_metaclass to enable inheritance

  - ``MetaFrameBase`` class from which classes can inherit
  - 3 hooks (classmethods)

    - ``_new_pre``: called before object creation
    - ``_init_pre``: called after object creation / before object initialization
    - ``_init_post``: called after object initialization

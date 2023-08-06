
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
    - ``_new_do``: called for object creation
    - ``_init_pre``: called after object creation / before object initialization
    - ``_init_do``: called fo object initialization
    - ``_init_post``: called after object initialization

Usage:
======

A quick example which filters None and arguments which do not convert to float
from the kwargs before the object is created::

    from metaframe import MetaFrame


    class A(MetaFrame.as_metaclass(object)):

        @classmethod
        def _new_do(cls, *args, **kwargs):

            nkwargs = dict()
            for key, val in kwargs.items():

                # Remove any argument with a value of None
                if val is None:
                    continue

                try:
                    val = float(val)
                except:
                    continue

                nkwargs[key] = val

            # The only nuisance being the cumbersome call to _new_do
            # super doesn't work
            obj, args, kwargs = cls.__class__._new_do(cls, *args, **nkwargs)
            return obj, args, kwargs

        def __init__(self, **kwargs):
            for key, val in kwargs.items():
                print('key, val, type', key, val, type(val))


    a = A(p1=72, p2=None, p3='hello', p4=None, p5='72.5')


    # Now with a subclassed MetaB from MetaFrame
    # Here super can be applied to find the higher in the hierarchy _new_do

    class MetaB(MetaFrame):

        def _new_do(cls, *args, **kwargs):

            nkwargs = dict()
            for key, val in kwargs.items():

                # Remove any argument with a value of None
                if val is None:
                    continue

                try:
                    val = float(val)
                except:
                    continue

                nkwargs[key] = val

            # super can be called directly
            obj, args, kwargs = super(MetaB, cls)._new_do(*args, **nkwargs)
            return obj, args, kwargs


    class B(MetaB.as_metaclass()):
        def __init__(self, **kwargs):
            for key, val in kwargs.items():
                print('key, val, type', key, val, type(val))


    b = B(p1=27, p2=None, p3='olleh', p4=None, p5='5.27')

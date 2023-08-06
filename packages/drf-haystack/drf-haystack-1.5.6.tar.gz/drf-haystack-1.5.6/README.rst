Haystack for Django REST Framework
==================================

Build status
------------

.. image:: https://travis-ci.org/inonit/drf-haystack.svg?branch=master
    :target: https://travis-ci.org/inonit/drf-haystack

.. image:: https://readthedocs.org/projects/drf-haystack/badge/?version=latest
    :target: https://readthedocs.org/projects/drf-haystack/?badge=latest
    :alt: Documentation Status
    
.. image:: https://pypip.in/d/drf-haystack/badge.png
    :target: https://pypi.python.org/pypi/drf-haystack

About
-----

Small library which tries to simplify integration of Haystack with Django REST Framework.
Contains a Generic ViewSet, a Serializer and a couple of Filters in order to make search as
painless as possible.

Fresh `documentation available <http://drf-haystack.readthedocs.org/en/latest/>`_ on Read the docs!



Supported Python and Django versions
------------------------------------

Tested with the following configurations:

    - Python 2.6
        - Django 1.5 and 1.6
    - Python 2.7, 3.3 and 3.4
        - Django 1.5, 1.6, 1.7 and 1.8

Installation
------------

    $ pip install drf-haystack

Supported features
------------------
We aim to support most features Haystack does (or at least those which can be used in a REST API).
Currently we support:

    * Autocomplete
    * GEO Spatial searching
    * Highlighting
    * More Like This
    * Faceting

===============================
Whiplash API Python Client
===============================

.. image:: https://img.shields.io/travis/fulfilio/whiplash.svg
        :target: https://travis-ci.org/fulfilio/whiplash

.. image:: https://img.shields.io/pypi/v/whiplash.svg
        :target: https://pypi.python.org/pypi/whiplash


Python API Client for the whiplash API

* Free software: ISC license
* Documentation: https://whiplash.readthedocs.org.

Features
--------

* Add Items
* Manage Orders
* Manage Ship Notices

Installation
------------

::

    pip install whiplash


Example
-------

Create a new Item::


    from whiplash import Whiplash

    # Not for production
    whiplash = Whiplash('Hc2BHTn3bcrwyPooyYTP', test=True)

    product1 = whiplash.item.create(
        title='Apple iPhone 5',
        sku='A1429',
        group_id='iPhone 5',
    )
    print product1.title
    print product1.id
    print product1.currency

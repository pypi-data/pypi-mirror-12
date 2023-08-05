===============================
ParcelBrigh API wrapper
===============================

.. image:: https://img.shields.io/travis/onjin/parcelbright-python.svg
        :target: https://travis-ci.org/onjin/parcelbright-python

.. image:: https://img.shields.io/pypi/v/parcelbright.svg
        :target: https://pypi.python.org/pypi/parcelbright


ParcelBright API wrapper. For full ParcelBright API reference go to https://github.com/parcelbright/api-docs

* Free software: BSD license
* Documentation: https://parcelbright-python.readthedocs.org.

Features
--------

* create new shipment to get rates from
* find previously created shipment
* book shipment
* get tracking data
* cancel shipment

TODO
----

* Customs support
* Carriers liability support




History
-------

0.3.3 (2015-10-20)
------------------

* Remove assertions from API facade

0.3.2 (2015-08-14)
------------------

* Added shipment.track to schema

0.3.1 (2015-08-07)
------------------

* Added missing `schematics` requirements at `setup.py`

0.3.0 (2015-08-07)
------------------

* API CHANGED - Entities constructor takes `dict` instead of `kwargs`
* API CHANGED - `Shipment.create` becames instance method instead of class method
* Added entities validation using `schematics` package

0.2.3 (2015-07-29)
---------------------

* Support for `pickup_date` parameter at `Shipment.book()` method
* Added `__repr__` method to `Parcel`, `Address` and `Shipment` entities

0.2.2 (2015-07-29)
---------------------

* Raise `TrackingError` from `Shipment.track()` if shipment has not tracking
  information available

0.2.1 (2015-07-29)
---------------------

* Remove `Shipment.is_booked()` method. Use `Shipment.state` instead.
* Raise `ShipmentNotCompletedException` from `Shipment.track()` method

0.2.0 (2015-07-28)
---------------------

* Added support to track and cancel shipments

0.1.0 (2015-07-27)
---------------------

* First release on PyPI.



pyopening\_hours
================

|Build Status|

Python module providing access to the
`opening\_hours.js <https://github.com/ypid/opening_hours.js>`__ library
which is written in JavaScript.

This python library only implements the `simple
API <https://github.com/ypid/opening_hours.js#simple-api>`__ from
opening\_hours.js at the moment (without optional parameters).

Installation
------------

Install
`pyopening\_hours <https://pypi.python.org/pypi/pyopening_hours/>`__
simply by using pip:

::

    pip install pyopening_hours

Usage
-----

.. code:: python

    import pyopening_hours

    try:
        oh = pyopening_hours.OpeningHours(u'Lun-')
    except pyopening_hours.ParseException as error:
        print(error.message)

    value = u'Mon,Tu,Th,Fr 12:00-18:00; Samstag 12:00-17:00 "I ❤ unicode"; Th[3] OFF; Th[-1] off'
    oh = pyopening_hours.OpeningHours(value)
    print(u"Parsing complex value: {}".format(value))
    print(u"Is{} week stable".format('' if oh.isWeekStable() else ' not'))
    print(u"Facility is {}".format(oh.getStateString()))
    print(u"Next change in UTC: {}".format(oh.getNextChange().strftime('%Y-%m-%d %H:%M:%S')))
    print(u"Warnings:")
    for line in oh.getWarnings():
        print('  ' + line)

Development
-----------

Just clone the repository with

.. code:: Shell

    git clone https://github.com/ypid/pyopening_hours

and install it’s dependencies (execute inside the repository):

.. code:: Shell

    make dependencies-get

Used by other projects
----------------------

This library is used in the following projects:

-  `opening\_hours\_bot <https://github.com/ypid/opening_hours_bot>`__

Other modules
-------------

-  `osm-opening-hours <https://github.com/martinfilliau/osm-opening-hours>`__
   (pure python implementation)

.. |Build Status| image:: https://travis-ci.org/ypid/pyopening_hours.svg?branch=master
   :target: https://travis-ci.org/ypid/pyopening_hours

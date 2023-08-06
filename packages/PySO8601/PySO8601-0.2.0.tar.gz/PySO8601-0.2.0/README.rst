========
PySO8601
========

.. image:: https://travis-ci.org/OldhamMade/PySO8601.svg?branch=master
    :target: https://travis-ci.org/OldhamMade/PySO8601

PySO8601 aims to be a better Python module to parse ISO 8601 dates. It is inspired 
by the `iso8601`_ currently available in the `pypi repository`_, however this module is 
designed to accept any valid ISO8601 formatted string:

- `Date`_ including `Week Dates`_ (eg. ``2011-W12-6``) 
  and `Ordinal Dates`_ (eg. ``2012-003``)
- `Time`_ including `Time zone designations`_
- `Combined Date & Time`_
- `Durations`_
- `Intervals`_

Truncated representations (``YYYYMM``, ``YYMMDD``, ``hhmmss``, etc) are also accepted.

-----
USAGE
-----

::

    import PySO8601
    spam = PySO8601.parse('2011-01-01T14:32')
    print spam # prints: 2011-01-01 14:32:00
    eggs = PySO8601.parse('2010W052') # Week 5, day 2
    print eggs # prints: 2010-02-01 00:00:00

For full examples on usage please review the `specs`_ in the source.

---------------
IMPORTANT NOTES
---------------

Python 3:
  PySO8601 is now compatible with Python 2.6, 2.7, and >= 3.3.

Durations:
  ``parse_duration``, when only provided a duration string, will assume 365 days in a year and 30 days in a month, due to the difficult nature of working with calendars. However, passing a ``start`` or ``end`` timestamp will provide the correct calculation based on that date.

.. _iso8601: http://code.google.com/p/pyiso8601
.. _pypi repository: http://pypi.python.org/pypi/iso8601
.. _Date: http://en.wikipedia.org/wiki/ISO_8601#Dates
.. _Week Dates: http://en.wikipedia.org/wiki/ISO_8601#Week_dates
.. _Ordinal Dates: http://en.wikipedia.org/wiki/ISO_8601#Ordinal_dates
.. _Time: http://en.wikipedia.org/wiki/ISO_8601#Times
.. _Time zone designations: http://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators
.. _Combined Date & Time: http://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations
.. _Durations: http://en.wikipedia.org/wiki/ISO_8601#Durations 
.. _Intervals: http://en.wikipedia.org/wiki/ISO_8601#Time_intervals
.. _specs: https://github.com/OldhamMade/PySO8601/tree/master/specs

xmlstats-py
===========

|Build Status|

A python module for interacting with the `xmlstats
API <https://erikberg.com/api>`__

This module aims to closely mirror the methods provided by the xmlstats
API in terms of parameters and output structure.

Installing
----------

``pip install xmlstats-py`` Compatible with Python 2.7, 3.2+

Usage
-----

Xmlstats can return "objectified" data, in which nested JSON objects
from the xmlstats API are accessible as attributes, or it can return
data in native python objects, as if parsed with ``json.load()``.

.. code:: python

    stats = Xmlstats(access_token=MY_ACCESS_TOKEN, user_agent=MY_USER_AGENT, objectify=True)
    # if objectify=False, data will be returned in native python objects

    stats.objectify_off() # set objectify = False
    stats.objectify_on()  # set objectify = True

Methods
~~~~~~~

See the `API documentation <https://erikberg.com/api/methods>`__ for a
complete explanation of parameters and results.
#####get\_boxscore(sport, event\_id) sport = "nba" or "mlb"

get\_events(date, sport)
^^^^^^^^^^^^^^^^^^^^^^^^

Date must be in YYYYmmdd format

get\_teams(sport)
^^^^^^^^^^^^^^^^^

get\_roster(sport, team\_id, status=None)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

status = "expanded" will return the 40-man roster for an MLB team,
rather than 25-man roster

get\_nba\_team\_stats(date, team\_id=None)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

get\_team\_results(team\_id, season=None, since=None, until=None, order=None)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

get\_nba\_draft\_results(season=None, team\_id=None)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

get\_nba\_leaders(category, limit=None,qualified=None, season\_type=None)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For list of category IDs, see
`here <https://erikberg.com/api/methods/nba-leaders>`__. Qualified
parameter (default=True) determines whether players who meet NBA's
minimum qualifications will be returned, or all players.

get\_standings(sport, date=None)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

get\_wildcard\_standings(date)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Examples
--------

Get Boxscores for a given date - *yyyymmdd*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    stats = Xmlstats(access_token=MY_ACCESS_TOKEN, user_agent=MY_USER_AGENT)
    events = stats.get_events(date=20141028, sport="nba")  # returns event objects for all nba events on given date
    event_ids = [event.event_id for event in events.event]
    boxscores = []
    for event_id in event_ids:
        boxscores.append(stats.get_boxscore(sport="nba", event_id))

Note: As in the xmlstats API, the ``get_events()`` method returns an
instance with 2 attributes: ``events_date`` is a date string; ``event``
is an array of event objects

.. |Build Status| image:: https://travis-ci.org/dwelch2101/xmlstats-py.svg?branch=master
   :target: https://travis-ci.org/dwelch2101/xmlstats-py


Changelog
=========

0.1.5 (2015-11-03)
------------------

Fixes:

- Fixed http_get bug that prevented including paramaters in the next request after a 429 response code from xlmstats server.


0.1.4 (2015-11-02)
------------------

Fixes:

- Fixed format_result bug that prevented higher level API functions from working.

Testing:

- Added some basic tests, with Travis CI integration

Documentation:

- Added Travis CI embedded status image to READMEg


0.1.3 (2015-11-02)
------------------

Fixes:

- Fixed bugs in http_get handling of 429 response from xmlstats API server. http_get now waits for the amount of time specified by server 429 response before continuing to make requests.


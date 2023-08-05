

Run the Tests
-------------

Install tox and run it::

    pip install tox
    tox

Limit the tests to a specific python version::

    tox -e py27

Conventions
-----------

Onegov Election Day follows PEP8 as close as possible. To test for it run::

    tox -e pep8

Onegov Election Day uses `Semantic Versioning <http://semver.org/>`_

Build Status
------------

.. image:: https://travis-ci.org/OneGov/onegov.election_day.png
  :target: https://travis-ci.org/OneGov/onegov.election_day
  :alt: Build Status

Coverage
--------

.. image:: https://coveralls.io/repos/OneGov/onegov.election_day/badge.png?branch=master
  :target: https://coveralls.io/r/OneGov/onegov.election_day?branch=master
  :alt: Project Coverage

Latests PyPI Release
--------------------
.. image:: https://pypip.in/v/onegov.election_day/badge.png
  :target: https://crate.io/packages/onegov.election_day
  :alt: Latest PyPI Release

License
-------
onegov.election_day is released under GPLv2

Changelog
---------

Unreleased
~~~~~~~~~~

0.1.3 (2015-10-12)
~~~~~~~~~~~~~~~~~~~

- Fix upload not allowing for different ballot types initially.
  [href]

0.1.2 (2015-10-12)
~~~~~~~~~~~~~~~~~~~

- Explicitly passes the encoding when reading the yaml file to avoid getting
  the wrong one through the environment.
  [href]

0.1.1 (2015-10-12)
~~~~~~~~~~~~~~~~~~~

- Enables requirements.txt generation on release.
  [href]

0.1.0 (2015-10-12)
~~~~~~~~~~~~~~~~~~~

- Initial Release



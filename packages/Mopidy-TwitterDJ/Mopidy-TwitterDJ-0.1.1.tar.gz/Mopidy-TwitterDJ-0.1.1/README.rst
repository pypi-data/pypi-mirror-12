****************************
Mopidy-TwitterDJ
****************************

.. image:: https://img.shields.io/pypi/v/Mopidy-TwitterDJ.svg?style=flat
    :target: https://pypi.python.org/pypi/Mopidy-TwitterDJ/
    :alt: Latest PyPI version

.. image:: https://img.shields.io/pypi/dm/Mopidy-TwitterDJ.svg?style=flat
    :target: https://pypi.python.org/pypi/Mopidy-TwitterDJ/
    :alt: Number of PyPI downloads

.. image:: https://img.shields.io/travis/lino/mopidy-twitterdj/master.svg?style=flat
    :target: https://travis-ci.org/lino/mopidy-twitterdj
    :alt: Travis CI build status

.. image:: https://img.shields.io/coveralls/lino/mopidy-twitterdj/master.svg?style=flat
   :target: https://coveralls.io/r/lino/mopidy-twitterdj
   :alt: Test coverage

Controls Mopidy via Twitter


Installation
============

Install by running::

    pip install Mopidy-TwitterDJ

Or, if available, install the Debian/Ubuntu package from `apt.mopidy.com
<http://apt.mopidy.com/>`_.


Configuration
=============

Before starting Mopidy, you must add configuration for
Mopidy-TwitterDJ to your Mopidy configuration file::

    [twitterdj]
    enabled = true
    token = YOUR-TWITTER-OAUTH-TOKEN
    secret = YOUR-TWITTER-OAUTH-SECRET
    consumerkey = YOURKEY
    consumersecret = YOURCONSUMERSECRET
    username = TWITTER-USERNAME
    playlist = SPOTIFY-PLAYLIST-URI


Project resources
=================

- `Source code <https://github.com/lino/mopidy-twitterdj>`_
- `Issue tracker <https://github.com/lino/mopidy-twitterdj/issues>`_


Changelog
=========

v0.1.1
----------------------------------------

- Fixed a threading bug in certain python environments


v0.1.0
----------------------------------------

- Initial release.

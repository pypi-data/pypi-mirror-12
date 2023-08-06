===============================
Pagerduty
===============================

.. image:: https://img.shields.io/travis/marvinpinto/charlesbot-pagerduty/master.svg?style=flat-square
    :target: https://travis-ci.org/marvinpinto/charlesbot-pagerduty
    :alt: Travis CI
.. image:: https://img.shields.io/coveralls/marvinpinto/charlesbot-pagerduty/master.svg?style=flat-square
    :target: https://coveralls.io/github/marvinpinto/charlesbot-pagerduty?branch=master
    :alt: Code Coverage
.. image:: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
    :target: LICENSE.txt
    :alt: Software License

A Charlesbot__ plugin that interacts with Pagerduty and does some cool shit.

__ https://github.com/marvinpinto/charlesbot


How does this work
------------------

This plugin adds the following ``!help`` targets:

.. code:: text

    !oncall - Find out who's on-call right now

This will query Pagerduty and print out a list of all the on-call folks (for
all the schedules).

.. image:: /images/oncall.png?raw=true


Installation
------------

.. code:: bash

    pip install charlesbot-pagerduty

Instructions for how to run Charlesbot are over at https://github.com/marvinpinto/charlesbot.


Configuration
-------------

In your Charlesbot ``config.yaml``, enable this plugin by adding the following
entry to the ``main`` section:

.. code:: yaml

    main:
      enabled_plugins:
        - 'charlesbot_pagerduty.pagerduty.Pagerduty'

Then add a ``pagerduty`` dictionary block that looks something like:

.. code:: yaml

    pagerduty:
      token: 'E7px6VVr3PVHZPJq51oa'
      subdomain: 'acme'

Note that you will need a valid Pagerduty API token for the **token** value, a
*read-only* token should suffice here.

Sample config file
~~~~~~~~~~~~~~~~~~

.. code:: yaml

    main:
      slackbot_token: 'xoxb-1234'
      enabled_plugins:
        - 'charlesbot_pagerduty.pagerduty.Pagerduty'

    pagerduty:
      token: 'E7px6VVr3PVHZPJq51oa'
      subdomain: 'acme'


License
-------
See the LICENSE.txt__ file for license rights and limitations (MIT).

__ ./LICENSE.txt

==========
senlin-api
==========

.. program:: senlin-api

SYNOPSIS
========

``senlin-api [options]``

DESCRIPTION
===========

senlin-api provides an external REST API to the Senlin service.

INVENTORY
=========

senlin-api is a WSGI application that exposes an external ReST style API to
the Senlin service. senlin-api communicates with senlin-engine using Remote
Procedure Calls (RPC), which is based on AMQP protocol.

OPTIONS
=======

.. cmdoption:: --config-file

  Path to a config file to use. Multiple config files can be specified, with
  values in later files taking precedence.


.. cmdoption:: --config-dir

  Path to a config directory to pull .conf files from. This file set is
  sorted, so as to provide a predictable parse order if individual options are
  over-ridden. The set is parsed after the file(s), if any, specified via 
  --config-file, hence over-ridden options in the directory take precedence.

FILES
========

* /etc/senlin/senlin.conf
* /etc/senlin/api-paste.ini
* /etc/senlin/policy.json

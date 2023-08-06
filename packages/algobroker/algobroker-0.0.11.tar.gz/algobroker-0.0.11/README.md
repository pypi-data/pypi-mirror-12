This is an execution engine for algo trading.  The idea is that this
python server gets requests from clients and then forwards them to the
broker api.

The first iteration will have the following capabilities:

* connect to bitcoin brokers (btcchina and bitmex)
* send out alerts via SMS

This module handles only execution.  The reason for having this in a
separate module are:

* flexibility, you can feed orders to this engine from any algo
  trading system
* security. The keys to connect to the brokers are localized within
  this package
* reliability. You can swap out a live execution engine for one that
  does paper trading or loop back
* performance. You can have multiple brokers that route to separate
  systems

INSTALL
=======

To install, set up a plivo account, run the servers via start-algo.sh
and then send the servers commands via init.py

Sample control files are in algobroker/test

This installation does a simple scan of the quotes from yahoo and
sends out an sms message if it hits certain limits.


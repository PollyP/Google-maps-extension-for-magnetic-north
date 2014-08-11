Google-maps-extension-for-magnetic-north
========================================

A Chrome extension that adds a magnetic north indicator for Google Maps

This code uses Bill Chadwick's World Magnetic Model port to javascript to
compute the magnetic declination. The original code is at 
http://wtp2.appspot.com/WorldMagneticModel.js

Some of the MN switch CSS code originally comes from Proto.IO's
On/Off FlipSwitch code generator at http://proto.io/freebies/onoff/.

All other code is copyright (c) 2014 by Polly Powledge and licensed
under the MIT license.

Installation
============

To install this from the GitHub repo, clone or download the project,
and then follow these instructions for installing an unpacked extension:

https://developer.chrome.com/extensions/getstarted#unpacked

Limitations
===========

Currently the date for the World Magnetic Model is hard-coded to
mid-2014. Also, the altititude is set for zero for the model.



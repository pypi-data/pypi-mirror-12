yubistorm
=========

Pure python module that provides async calls for the YubiCloud
authentication servers (
https://www.yubico.com/products/services-software/yubicloud/ ) API
and works with tornado.

This project provides the yubistorm.YubiStorm class that implements
API calls for the YubiKey validation protocol (
https://developers.yubico.com/yubikey-val/Validation_Protocol_V2.0.html )
and lets you easily create a web server that authenticates users with
two factor authentication. This is an asynchronous library that works
with tornado's ioloop. High level methods of the yubistorm.YubiStorm
class are awaitable, and can be used in a non-blocking way.

Documentation
-------------

http://pythonhosted.org/yubistorm/

Installation
------------

Please note that this version works with tornado 4.3 only! Below version
4.3, tornado does not support asnyc def statements. The 4.3 version
is now available from PyPi.

    pip3 install tornado
    pip3 install yubistorm

License
-------

Yubistorm is distributed under the GNU LGPL v3 license.
http://www.gnu.org/licenses/lgpl-3.0.html

Changelog
---------

v0.1.0 - Initial beta version

Getting Started
---------------

The YubiCould API lets you authenticate users with a YubiKey hardware
device. Beside authentication, the API returns the unique identifier
of the hardware key that can be assigned to a local user, and it can
be used to identify the user that wants to log in. To implement two
factor authentication, you also need to add another factor (for example,
check a secret password or do a challenge/response).

Get your API credentials
........................

To get a new API client id and key, go to https://upgrade.yubico.com/getapikey/ and follow instructions.

You must **make sure** that you wait at least 5 minutes before you try to use a newly requested API key.
In fact, my experience is that sometimes it can take 15-30 minutes  before all YubiCloud servers are
synchronized.

Making API calls
................

First, you need to create a client:

    import yubistorm

    client = yubistorm.YubiStorm(client_id=YOUR_CLIENT_ID, secret_key=YOUR_SECRET_KEY)


Then you can verify the otp inside a tornado http(s) request:


    otp = request.get_argument("otp")
    yubikey_id = await client.authenticate(otp) # Use the id to identify the user


Use the example server for the know-how
.......................................

Check out the repostory from bitbucket, and start a test server in less them 5 minutes. Try the test server, and
check the source to see how to use YubiCloud authentication from a working tornado server:

    hg clone https://bitbucket.org/nagylzs/yubistorm
    cd yubistorm/test
    cp local.py.default local.py # also edit and put your app client id and secret here
    python3.5 main.py # and then point your browser to port :8080

Resources
---------

* Check out the Tornado API docs ( http://tornadokevinlee.readthedocs.org/en/latest/ ).
* Check out the YubiCloud validation protocol ( https://developers.yubico.com/yubikey-val/Validation_Protocol_V2.0.html ).

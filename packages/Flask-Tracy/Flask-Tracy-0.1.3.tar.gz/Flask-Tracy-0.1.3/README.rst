Flask-Tracy
=============

`Flask-Tracy`_ is an extension to `Flask`_ that logs tracing information
per request.  

Time, url, client IP, client name, transaction ID, and 
request duration are logged as informational to the `tracy` logger.

Configuration:
 - `TRACY_REQURE_CLIENT`: (OPTIONAL) configuration boolean used to return a 400 when no client name header (defaults to `Trace-ID`) is present.

Example:

::

    from flask import Flask
    from flask.ext.tracy import Tracy

    app = Flask(__name__)
    appp.config.from_object('some_file.ini')

    Tracy(app)
    # To exclude routes from being traced.
    #Tracy(app, excluded_routes=['/test/'])


    @app.route('/')
    def index()
        return "Hello World"

Example Log:

::

    2015-09-17 18:15:16,252 200 http://localhost:5000/ 192.168.100.1 APP_1 0be9d830-5d68-11e5-82d5-0242ac11000e 0.000363


get Flask-Tracy
====================

Install `flask`_

    pip install Flask-Tracy

Download the latest release from `Python Package Index`_
or clone `the repository`_

.. _Flask: http://flask.pocoo.org/
.. _the repository: https://github.com/juztin/flask-tracy
.. _Python Package Index: https://pypi.python.org/pypi/Flask-Tracy

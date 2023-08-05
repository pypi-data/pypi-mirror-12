|Build Status| |Stories in Ready| |Gitter|

VCR.py
======

.. image:: https://raw.github.com/kevin1024/vcrpy/master/vcr.png
   :alt: vcr.py

This is a Python version of `Ruby's VCR
library <https://github.com/vcr/vcr>`__.

What it does
------------

VCR.py simplifies and speeds up tests that make HTTP requests. The
first time you run code that is inside a VCR.py context manager or
decorated function, VCR.py records all HTTP interactions that take
place through the libraries it supports and serializes and writes them
to a flat file (in yaml format by default). This flat file is called a
cassette. When the relevant peice of code is executed again, VCR.py
will read the serialized requests and responses from the
aforementioned cassette file, and intercept any HTTP requests that it
recognizes from the original test run and return the responses that
corresponded to those requests. This means that the requests will not
actually result in HTTP traffic, which confers several benefits
including:

-  The ability to work offline
-  Completely deterministic tests
-  Increased test execution speed

If the server you are testing against ever changes its API, all you need
to do is delete your existing cassette files, and run your tests again.
VCR.py will detect the absence of a cassette file and once again record
all HTTP interactions, which will update them to correspond to the new
API.

Compatibility Notes
-------------------

VCR.py supports Python 2.6 and 2.7, 3.3, 3.4, and
`pypy <http://pypy.org>`__.

The following http libraries are supported:

-  urllib2
-  urllib3
-  http.client (python3)
-  requests (both 1.x and 2.x versions)
-  httplib2
-  boto
-  Tornado's AsyncHTTPClient

Usage
-----

.. code:: python

    import vcr
    import urllib2

    with vcr.use_cassette('fixtures/vcr_cassettes/synopsis.yaml'):
        response = urllib2.urlopen('http://www.iana.org/domains/reserved').read()
        assert 'Example domains' in response

Run this test once, and VCR.py will record the HTTP request to
``fixtures/vcr_cassettes/synopsis.yml``. Run it again, and VCR.py will
replay the response from iana.org when the http request is made. This
test is now fast (no real HTTP requests are made anymore), deterministic
(the test will continue to pass, even if you are offline, or iana.org
goes down for maintenance) and accurate (the response will contain the
same headers and body you get from a real request).

You can also use VCR.py as a decorator. The same request above would
look like this:

.. code:: python

    @vcr.use_cassette('fixtures/vcr_cassettes/synopsis.yaml')
    def test_iana():
        response = urllib2.urlopen('http://www.iana.org/domains/reserved').read()
        assert 'Example domains' in response

When using the decorator version of ``use_cassette``, it is possible to
omit the path to the cassette file.

.. code:: python

    @vcr.use_cassette()
    def test_iana():
        response = urllib2.urlopen('http://www.iana.org/domains/reserved').read()
        assert 'Example domains' in response

In this case, the cassette file will be given the same name as the test
function, and it will be placed in the same directory as the file in
which the test is defined. See the Automatic Test Naming section below
for more details.

Configuration
-------------

If you don't like VCR's defaults, you can set options by instantiating a
``VCR`` class and setting the options on it.

.. code:: python


    import vcr

    my_vcr = vcr.VCR(
        serializer='json',
        cassette_library_dir='fixtures/cassettes',
        record_mode='once',
        match_on=['uri', 'method'],
    )

    with my_vcr.use_cassette('test.json'):
        # your http code here

Otherwise, you can override options each time you use a cassette.

.. code:: python

    with vcr.use_cassette('test.yml', serializer='json', record_mode='once'):
        # your http code here

Note: Per-cassette overrides take precedence over the global config.

Request matching
----------------

Request matching is configurable and allows you to change which requests
VCR considers identical. The default behavior is
``['method', 'scheme', 'host', 'port', 'path', 'query']`` which means
that requests with both the same URL and method (ie POST or GET) are
considered identical.

This can be configured by changing the ``match_on`` setting.

The following options are available :

-  method (for example, POST or GET)
-  uri (the full URI.)
-  host (the hostname of the server receiving the request)
-  port (the port of the server receiving the request)
-  path (the path of the request)
-  query (the query string of the request)
-  raw\_body (the entire request body as is)
-  body (the entire request body unmarshalled by content-type
   i.e. xmlrpc, json, form-urlencoded, falling back on raw\_body)
-  headers (the headers of the request)

   Backwards compatible matchers:
-  url (the ``uri`` alias)

If these options don't work for you, you can also register your own
request matcher. This is described in the Advanced section of this
README.

Record Modes
------------

VCR supports 4 record modes (with the same behavior as Ruby's VCR):

once
~~~~

-  Replay previously recorded interactions.
-  Record new interactions if there is no cassette file.
-  Cause an error to be raised for new requests if there is a cassette
   file.

It is similar to the new\_episodes record mode, but will prevent new,
unexpected requests from being made (i.e. because the request URI
changed).

once is the default record mode, used when you do not set one.

new\_episodes
~~~~~~~~~~~~~

-  Record new interactions.
-  Replay previously recorded interactions. It is similar to the once
   record mode, but will always record new interactions, even if you
   have an existing recorded one that is similar, but not identical.

This was the default behavior in versions < 0.3.0

none
~~~~

-  Replay previously recorded interactions.
-  Cause an error to be raised for any new requests. This is useful when
   your code makes potentially dangerous HTTP requests. The none record
   mode guarantees that no new HTTP requests will be made.

all
~~~

-  Record new interactions.
-  Never replay previously recorded interactions. This can be
   temporarily used to force VCR to re-record a cassette (i.e. to ensure
   the responses are not out of date) or can be used when you simply
   want to log all HTTP requests.

Advanced Features
-----------------

If you want, VCR.py can return information about the cassette it is
using to record your requests and responses. This will let you record
your requests and responses and make assertions on them, to make sure
that your code under test is generating the expected requests and
responses. This feature is not present in Ruby's VCR, but I think it is
a nice addition. Here's an example:

.. code:: python

    import vcr
    import urllib2

    with vcr.use_cassette('fixtures/vcr_cassettes/synopsis.yaml') as cass:
        response = urllib2.urlopen('http://www.zombo.com/').read()
        # cass should have 1 request inside it
        assert len(cass) == 1 
        # the request uri should have been http://www.zombo.com/
        assert cass.requests[0].uri == 'http://www.zombo.com/'

The ``Cassette`` object exposes the following properties which I
consider part of the API. The fields are as follows:

-  ``requests``: A list of vcr.Request objects corresponding to the http
   requests that were made during the recording of the cassette. The
   requests appear in the order that they were originally processed.
-  ``responses``: A list of the responses made.
-  ``play_count``: The number of times this cassette has played back a
   response.
-  ``all_played``: A boolean indicating whether all the responses have
   been played back.
-  ``responses_of(request)``: Access the responses that match a given
   request

The ``Request`` object has the following properties:

-  ``uri``: The full uri of the request. Example:
   "https://google.com/?q=vcrpy"
-  ``scheme``: The scheme used to make the request (http or https)
-  ``host``: The host of the request, for example "www.google.com"
-  ``port``: The port the request was made on
-  ``path``: The path of the request. For example "/" or "/home.html"
-  ``query``: The parsed query string of the request. Sorted list of
   name, value pairs.
-  ``method`` : The method used to make the request, for example "GET"
   or "POST"
-  ``body``: The body of the request, usually empty except for POST /
   PUT / etc

Backwards compatible properties:

-  ``url``: The ``uri`` alias
-  ``protocol``: The ``scheme`` alias

Register your own serializer
----------------------------

Don't like JSON or YAML? That's OK, VCR.py can serialize to any format
you would like. Create your own module or class instance with 2 methods:

-  ``def deserialize(cassette_string)``
-  ``def serialize(cassette_dict)``

Finally, register your class with VCR to use your new serializer.

.. code:: python

    import vcr

    class BogoSerializer(object):
        """
        Must implement serialize() and deserialize() methods
        """
        pass

    my_vcr = vcr.VCR()
    my_vcr.register_serializer('bogo', BogoSerializer())

    with my_vcr.use_cassette('test.bogo', serializer='bogo'):
        # your http here

    # After you register, you can set the default serializer to your new serializer

    my_vcr.serializer = 'bogo'

    with my_vcr.use_cassette('test.bogo'):
        # your http here

Register your own request matcher
---------------------------------

Create your own method with the following signature

.. code:: python

    def my_matcher(r1, r2):

Your method receives the two requests and must return ``True`` if they
match, ``False`` if they don't.

Finally, register your method with VCR to use your new request matcher.

.. code:: python

    import vcr

    def jurassic_matcher(r1, r2):
        return r1.uri == r2.uri and 'JURASSIC PARK' in r1.body

    my_vcr = vcr.VCR()
    my_vcr.register_matcher('jurassic', jurassic_matcher)

    with my_vcr.use_cassette('test.yml', match_on=['jurassic']):
        # your http here

    # After you register, you can set the default match_on to use your new matcher

    my_vcr.match_on = ['jurassic']

    with my_vcr.use_cassette('test.yml'):
        # your http here

Filter sensitive data from the request
--------------------------------------

If you are checking your cassettes into source control, and are using
some form of authentication in your tests, you can filter out that
information so it won't appear in your cassette files. There are a few
ways to do this:

Filter information from HTTP Headers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the ``filter_headers`` configuration option with a list of headers
to filter.

.. code:: python

    with my_vcr.use_cassette('test.yml', filter_headers=['authorization']):
        # sensitive HTTP request goes here

Filter information from HTTP querystring
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the ``filter_query_parameters`` configuration option with a list of
query parameters to filter.

.. code:: python

    with my_vcr.use_cassette('test.yml', filter_query_parameters=['api_key']):
        requests.get('http://api.com/getdata?api_key=secretstring')

Filter information from HTTP post data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the ``filter_post_data_parameters`` configuration option with a list
of post data parameters to filter.

.. code:: python

    with my_vcr.use_cassette('test.yml', filter_post_data_parameters=['client_secret']):
        requests.post('http://api.com/postdata', data={'api_key': 'secretstring'})

Custom Request filtering
~~~~~~~~~~~~~~~~~~~~~~~~

If none of these covers your request filtering needs, you can register a
callback that will manipulate the HTTP request before adding it to the
cassette. Use the ``before_record`` configuration option to so this.
Here is an example that will never record requests to the /login
endpoint.

.. code:: python

    def before_record_cb(request):
        if request.path != '/login':
            return request

    my_vcr = vcr.VCR(
        before_record = before_record_cb,
    )
    with my_vcr.use_cassette('test.yml'):
        # your http code here

You can also mutate the response using this callback. For example, you
could remove all query parameters from any requests to the ``'/login'``
path.

.. code:: python

    def scrub_login_request(request):
        if request.path == '/login':
            request.uri, _ =  urllib.splitquery(response.uri)
        return request

    my_vcr = vcr.VCR(
        before_record=scrub_login_request,
    )
    with my_vcr.use_cassette('test.yml'):
        # your http code here

Custom Response Filtering
~~~~~~~~~~~~~~~~~~~~~~~~~

VCR.py also suports response filtering with the
``before_record_response`` keyword argument. It's usage is similar to
that of ``before_record``:

.. code:: python

    def scrub_string(string, replacement=''):
        def before_record_response(response):
            response['body']['string'] = response['body']['string'].replace(string, replacement)
            return response
        return before_record_response

    my_vcr = vcr.VCR(
        before_record_response=scrub_string(settings.USERNAME, 'username'),
    )
    with my_vcr.use_cassette('test.yml'):
         # your http code here    

Ignore requests
---------------

If you would like to completely ignore certain requests, you can do it
in a few ways:

-  Set the ``ignore_localhost`` option equal to True. This will not
   record any requests sent to (or responses from) localhost, 127.0.0.1,
   or 0.0.0.0.
-  Set the ``ignore_hosts`` configuration option to a list of hosts to
   ignore
-  Add a ``before_record`` callback that returns None for requests you
   want to ignore

Requests that are ignored by VCR will not be saved in a cassette, nor
played back from a cassette. VCR will completely ignore those requests
as if it didn't notice them at all, and they will continue to hit the
server as if VCR were not there.

Custom Patches
--------------

If you use a custom ``HTTPConnection`` class, or otherwise make http
requests in a way that requires additional patching, you can use the
``custom_patches`` keyword argument of the ``VCR`` and ``Cassette``
objects to patch those objects whenever a cassette's context is entered.
To patch a custom version of ``HTTPConnection`` you can do something
like this:

::

    import where_the_custom_https_connection_lives
    from vcr.stubs import VCRHTTPSConnection
    my_vcr = config.VCR(custom_patches=((where_the_custom_https_connection_lives, 'CustomHTTPSConnection', VCRHTTPSConnection),))

    @my_vcr.use_cassette(...)

Automatic Cassette Naming
-------------------------

VCR.py now allows the omission of the path argument to the use\_cassette
function. Both of the following are now legal/should work

.. code:: python

    @my_vcr.use_cassette
    def my_test_function():
        ...

.. code:: python

    @my_vcr.use_cassette()
    def my_test_function():
        ...

In both cases, VCR.py will use a path that is generated from the
provided test function's name. If no ``cassette_library_dir`` has been
set, the cassette will be in a file with the name of the test function
in directory of the file in which the test function is declared. If a
``cassette_library_dir`` has been set, the cassette will appear in that
directory in a file with the name of the decorated function.

It is possible to control the path produced by the automatic naming
machinery by customizing the ``path_transformer`` and
``func_path_generator`` vcr variables. To add an extension to all
cassette names, use ``VCR.ensure_suffix`` as follows:

.. code:: python

    my_vcr = VCR(path_transformer=VCR.ensure_suffix('.yaml'))

    @my_vcr.use_cassette
    def my_test_function():

Installation
------------

VCR.py is a package on PyPI, so you can ``pip install vcrpy`` (first you
may need to ``brew install libyaml``
[`Homebrew <http://mxcl.github.com/homebrew/>`__\ ])

Ruby VCR compatibility
----------------------

VCR.py does not aim to match the format of the Ruby VCR YAML files.
Cassettes generated by Ruby's VCR are not compatible with VCR.py.

Running VCR's test suite
------------------------

The tests are all run automatically on `Travis
CI <https://travis-ci.org/kevin1024/vcrpy>`__, but you can also run them
yourself using `py.test <http://pytest.org/>`__ and
`Tox <http://tox.testrun.org/>`__. Tox will automatically run them in
all environments VCR.py supports. The test suite is pretty big and slow,
but you can tell tox to only run specific tests like this:

``tox -e py27requests -- -v -k "'test_status_code or test_gzip'"``

This will run only tests that look like ``test_status_code`` or
``test_gzip`` in the test suite, and only in the python 2.7 environment
that has ``requests`` installed.

Also, in order for the boto tests to run, you will need an AWS key.
Refer to the `boto
documentation <http://boto.readthedocs.org/en/latest/getting_started.html>`__
for how to set this up. I have marked the boto tests as optional in
Travis so you don't have to worry about them failing if you submit a
pull request.

Logging
-------

VCR.py has a few log messages you can turn on to help you figure out if
HTTP requests are hitting a real server or not. You can turn them on
like this:

.. code:: python

    import vcr
    import requests
    import logging

    logging.basicConfig() # you need to initialize logging, otherwise you will not see anything from vcrpy
    vcr_log = logging.getLogger("vcr")
    vcr_log.setLevel(logging.INFO)

    with vcr.use_cassette('headers.yml'):
            requests.get('http://httpbin.org/headers')

The first time you run this, you will see:

::

    INFO:vcr.stubs:<Request (GET) http://httpbin.org/headers> not in cassette, sending to real server

The second time, you will see:

::

    INFO:vcr.stubs:Playing response for <Request (GET) http://httpbin.org/headers> from cassette

If you set the loglevel to DEBUG, you will also get information about
which matchers didn't match. This can help you with debugging custom
matchers.

Speed
-----
VCR.py runs about 10x faster when pyyaml can use the libyaml extensions. However, just installing ``libyaml`` (Mac) or ``libyaml-dev`` (Linux) is not enough, as pyyaml needs to be rebuild with the proper flag. Note that this flag is cached by pip, so clear the cache first. 

Are you using libyaml already? This should work:

.. code:: sh

    python -c 'from yaml import CLoader'

If not:

.. code:: sh

    pip uninstall pyyaml
    pip --no-cache-dir install pyyaml


Upgrade
-------

New Cassette Format
~~~~~~~~~~~~~~~~~~~

The cassette format has changed in *VCR.py 1.x*, the *VCR.py 0.x*
cassettes cannot be used with *VCR.py 1.x*. The easiest way to upgrade
is to simply delete your cassettes and re-record all of them. VCR.py
also provides a migration script that attempts to upgrade your 0.x
cassettes to the new 1.x format. To use it, run the following command:

::

    python -m vcr.migration PATH

The PATH can be either a path to the directory with cassettes or the
path to a single cassette.

*Note*: Back up your cassettes files before migration. The migration
*should* only modify cassettes using the old 0.x format.

New serializer / deserializer API
---------------------------------

If you made a custom serializer, you will need to update it to match the
new API in version 1.0.x

-  Serializers now take dicts and return strings.
-  Deserializers take strings and return dicts (instead of requests,
   responses pair)

Changelog
---------
-  1.7.4 [#217] Make use_cassette decorated functions actually return a
   value (thanks @bcen). [#199] Fix path transfromation defaults.
   Better headers dictionary management.
-  1.7.3 [#188] ``additional_matchers`` kwarg on ``use_cassette``.
   [#191] Actually support passing multiple before_record_request
   functions (thanks @agriffis).
-  1.7.2 [#186] Get effective_url in tornado (thanks @mvschaik), [#187]
   Set request_time on Response object in tornado (thanks @abhinav).
-  1.7.1 [#183] Patch ``fetch_impl`` instead of the entire HTTPClient
   class for Tornado (thanks @abhinav).
-  1.7.0 [#177] Properly support coroutine/generator decoration. [#178]
   Support distribute (thanks @graingert). [#163] Make compatibility
   between python2 and python3 recorded cassettes more robust (thanks
   @gward).
-  1.6.1 [#169] Support conditional requirements in old versions of
   pip, Fix RST parse errors generated by pandoc, [Tornado] Fix
   unsupported features exception not being raised, [#166]
   content-aware body matcher.
-  1.6.0 [#120] Tornado support (thanks @abhinav), [#147] packaging fixes
   (thanks @graingert), [#158] allow filtering post params in requests
   (thanks @MrJohz), [#140] add xmlrpclib support (thanks @Diaoul).
-  1.5.2 Fix crash when cassette path contains cassette library
   directory (thanks @gazpachoking).
-  1.5.0 Automatic cassette naming and 'application/json' post data
   filtering (thanks @marco-santamaria).
-  1.4.2 Fix a bug caused by requests 2.7 and chunked transfer encoding
-  1.4.1 Include README, tests, LICENSE in package. Thanks @ralphbean.
-  1.4.0 Filter post data parameters (thanks @eadmundo), support for
   posting files through requests, inject\_cassette kwarg to access
   cassette from ``use_cassette`` decorated function,
   ``with_current_defaults`` actually works (thanks @samstav).
-  1.3.0 Fix/add support for urllib3 (thanks @aisch), fix default port
   for https (thanks @abhinav).
-  1.2.0 Add custom\_patches argument to VCR/Cassette objects to allow
   users to stub custom classes when cassettes become active.
-  1.1.4 Add force reset around calls to actual connection from stubs,
   to ensure compatibility with the version of httplib/urlib2 in python
   2.7.9.
-  1.1.3 Fix python3 headers field (thanks @rtaboada), fix boto test
   (thanks @telaviv), fix new\_episodes record mode (thanks @jashugan),
   fix Windows connectionpool stub bug (thanks @gazpachoking), add
   support for requests 2.5
-  1.1.2 Add urllib==1.7.1 support. Make json serialize error handling
   correct Improve logging of match failures.
-  1.1.1 Use function signature preserving ``wrapt.decorator`` to write
   the decorator version of use\_cassette in order to ensure
   compatibility with py.test fixtures and python 2. Move all request
   filtering into the ``before_record_callable``.
-  1.1.0 Add ``before_record_response``. Fix several bugs related to the
   context management of cassettes.
-  1.0.3: Fix an issue with requests 2.4 and make sure case sensitivity
   is consistent across python versions
-  1.0.2: Fix an issue with requests 2.3
-  1.0.1: Fix a bug with the new ignore requests feature and the once
   record mode
-  1.0.0: *BACKWARDS INCOMPATIBLE*: Please see the 'upgrade' section in
   the README. Take a look at the matcher section as well, you might
   want to update your ``match_on`` settings. Add support for filtering
   sensitive data from requests, matching query strings after the order
   changes and improving the built-in matchers, (thanks to @mshytikov),
   support for ignoring requests to certain hosts, bump supported
   Python3 version to 3.4, fix some bugs with Boto support (thanks
   @marusich), fix error with URL field capitalization in README (thanks
   @simon-weber), added some log messages to help with debugging, added
   ``all_played`` property on cassette (thanks @mshytikov)
-  0.7.0: VCR.py now supports Python 3! (thanks @asundg) Also I
   refactored the stub connections quite a bit to add support for the
   putrequest and putheader calls. This version also adds support for
   httplib2 (thanks @nilp0inter). I have added a couple tests for boto
   since it is an http client in its own right. Finally, this version
   includes a fix for a bug where requests wasn't being patched properly
   (thanks @msabramo).
-  0.6.0: Store response headers as a list since a HTTP response can
   have the same header twice (happens with set-cookie sometimes). This
   has the added benefit of preserving the order of headers. Thanks
   @smallcode for the bug report leading to this change. I have made an
   effort to ensure backwards compatibility with the old cassettes'
   header storage mechanism, but if you want to upgrade to the new
   header storage, you should delete your cassettes and re-record them.
   Also this release adds better error messages (thanks @msabramo) and
   adds support for using VCR as a decorator (thanks @smallcode for the
   motivation)
-  0.5.0: Change the ``response_of`` method to ``responses_of`` since
   cassettes can now contain more than one response for a request. Since
   this changes the API, I'm bumping the version. Also includes 2
   bugfixes: a better error message when attempting to overwrite a
   cassette file, and a fix for a bug with requests sessions (thanks
   @msabramo)
-  0.4.0: Change default request recording behavior for multiple
   requests. If you make the same request multiple times to the same
   URL, the response might be different each time (maybe the response
   has a timestamp in it or something), so this will make the same
   request multiple times and save them all. Then, when you are
   replaying the cassette, the responses will be played back in the same
   order in which they were received. If you were making multiple
   requests to the same URL in a cassette before version 0.4.0, you
   might need to regenerate your cassette files. Also, removes support
   for the cassette.play\_count counter API, since individual requests
   aren't unique anymore. A cassette might contain the same request
   several times. Also removes secure overwrite feature since that was
   breaking overwriting files in Windows, and fixes a bug preventing
   request's automatic body decompression from working.
-  0.3.5: Fix compatibility with requests 2.x
-  0.3.4: Bugfix: close file before renaming it. This fixes an issue on
   Windows. Thanks @smallcode for the fix.
-  0.3.3: Bugfix for error message when an unreigstered custom matcher
   was used
-  0.3.2: Fix issue with new config syntax and the ``match_on``
   parameter. Thanks, @chromy!
-  0.3.1: Fix issue causing full paths to be sent on the HTTP request
   line.
-  0.3.0: *Backwards incompatible release* - Added support for record
   modes, and changed the default recording behavior to the "once"
   record mode. Please see the documentation on record modes for more.
   Added support for custom request matching, and changed the default
   request matching behavior to match only on the URL and method. Also,
   improved the httplib mocking to add support for the
   ``HTTPConnection.send()`` method. This means that requests won't
   actually be sent until the response is read, since I need to record
   the entire request in order to match up the appropriate response. I
   don't think this should cause any issues unless you are sending
   requests without ever loading the response (which none of the
   standard httplib wrappers do, as far as I know. Thanks to @fatuhoku
   for some of the ideas and the motivation behind this release.
-  0.2.1: Fixed missing modules in setup.py
-  0.2.0: Added configuration API, which lets you configure some
   settings on VCR (see the README). Also, VCR no longer saves cassettes
   if they haven't changed at all and supports JSON as well as YAML
   (thanks @sirpengi). Added amazing new skeumorphic logo, thanks
   @hairarrow.
-  0.1.0: *backwards incompatible release - delete your old cassette
   files*: This release adds the ability to access the cassette to make
   assertions on it, as well as a major code refactor thanks to
   @dlecocq. It also fixes a couple longstanding bugs with redirects and
   HTTPS. [#3 and #4]
-  0.0.4: If you have libyaml installed, vcrpy will use the c bindings
   instead. Speed up your tests! Thanks @dlecocq
-  0.0.3: Add support for requests 1.2.3. Support for older versions of
   requests dropped (thanks @vitormazzi and @bryanhelmig)
-  0.0.2: Add support for requests / urllib3
-  0.0.1: Initial Release

License
=======

This library uses the MIT license. See `LICENSE.txt <LICENSE.txt>`__ for
more details

.. |Build Status| image:: https://secure.travis-ci.org/kevin1024/vcrpy.png?branch=master
   :target: http://travis-ci.org/kevin1024/vcrpy
.. |Stories in Ready| image:: https://badge.waffle.io/kevin1024/vcrpy.png?label=ready&title=Ready
   :target: https://waffle.io/kevin1024/vcrpy
.. |Gitter| image:: https://badges.gitter.im/Join%20Chat.svg
   :alt: Join the chat at https://gitter.im/kevin1024/vcrpy
   :target: https://gitter.im/kevin1024/vcrpy?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

Firefox Accounts support in Cliquet
===================================

|travis| |master-coverage|

.. |travis| image:: https://travis-ci.org/mozilla-services/cliquet-fxa.svg?branch=master
    :target: https://travis-ci.org/mozilla-services/cliquet-fxa

.. |master-coverage| image::
    https://coveralls.io/repos/mozilla-services/cliquet-fxa/badge.png?branch=master
    :alt: Coverage
    :target: https://coveralls.io/r/mozilla-services/cliquet-fxa

*Cliquet-fxa* enables authentication in *Cliquet* using *Firefox Accounts*
OAuth2 bearer tokens.

It provides:

* An authentication policy class;
* Integration with *Cliquet* cache backend for token verifications;
* Integration with *Cliquet* for heartbeat view checks;
* Some endpoints to perform the *OAuth* dance (*optional*).


* `Cliquet documentation <http://cliquet.readthedocs.org/en/latest/>`_
* `Issue tracker <https://github.com/mozilla-services/cliquet-fxa/issues>`_


Installation
------------

As `stated in the official documentation <https://developer.mozilla.org/en-US/Firefox_Accounts>`_,
Firefox Accounts OAuth integration is currently limited to Mozilla relying services.

Install the Python package:

::

    pip install cliquet-fxa


Include the package in the project configuration:

::

    pyramid.includes = cliquet_fxa

And configure authentication policy using `pyramid_multiauth
<https://github.com/mozilla-services/pyramid_multiauth#deployment-settings>`_ formalism:

::

    multiauth.policies = fxa

By default, it will rely on the cache configured in *Cliquet*.


Configuration
-------------

Fill those settings with the values obtained during the application registration:

::

    fxa-oauth.client_id = 89513028159972bc
    fxa-oauth.client_secret = 9aced230585cc0aaea0a3467dd800
    fxa-oauth.oauth_uri = https://oauth-stable.dev.lcip.org
    fxa-oauth.requested_scope = profile kinto
    fxa-oauth.required_scope = kinto
    fxa-oauth.webapp.authorized_domains = *.firefox.com
    # fxa-oauth.cache_ttl_seconds = 300
    # fxa-oauth.state.ttl_seconds = 3600


In case the application shall not behave as a relier (a.k.a. OAuth dance
endpoints disabled):

::

    fxa-oauth.relier.enabled = false


If necessary, override default values for authentication policy:

::

    # multiauth.policy.fxa.realm = Realm
    # multiauth.policy.fxa.use = cliquet_fxa.authentication.FxAOAuthAuthenticationPolicy


Login flow
----------

OAuth Bearer token
::::::::::::::::::

Use the OAuth token with this header:

::

    Authorization: Bearer <oauth_token>


:notes:

    If the token is not valid, this will result in a ``401`` error response.


Obtain token using Web UI
:::::::::::::::::::::::::

* Navigate the client to ``GET /fxa-oauth/login?redirect=http://app-endpoint/#``.
  There, a session cookie will be set, and the client will be redirected to a login
  form on the FxA content server;
* After submitting the credentials on the login page, the client will
  be redirected to ``http://app-endpoint/#{token}`` (the web-app).


Obtain token custom flow
::::::::::::::::::::::::

The ``GET /v1/fxa-oauth/params`` endpoint can be use to get the
configuration in order to trade the *Firefox Accounts* BrowserID with a
*Bearer Token*. `See Firefox Account documentation about this behavior
<https://developer.mozilla.org/en-US/Firefox_Accounts#Firefox_Accounts_BrowserID_API>`_

.. code-block:: http

    $ http GET http://localhost:8000/v0/fxa-oauth/params -v

    GET /v0/fxa-oauth/params HTTP/1.1
    Accept: */*
    Accept-Encoding: gzip, deflate
    Host: localhost:8000
    User-Agent: HTTPie/0.8.0


    HTTP/1.1 200 OK
    Content-Length: 103
    Content-Type: application/json; charset=UTF-8
    Date: Thu, 19 Feb 2015 09:28:37 GMT
    Server: waitress

    {
        "client_id": "89513028159972bc",
        "oauth_uri": "https://oauth-stable.dev.lcip.org",
        "scope": "profile"
    }


Changelog
=========

This document describes changes between each past release.

1.3.2 (2015-10-22)
------------------

**Bug fixes**

- In case the Oauth dance is interrupted, return a ``408 Request Timeout`` 
  error instead of the ``401 Unauthenticated`` one. (#11)
- Do not call ``cliquet.load_default_settings`` from cliquet-fxa (#12)


1.3.1 (2015-09-29)
------------------

- Separate multiple scopes by a + in login URL.


1.3.0 (2015-09-29)
------------------

**Bug fixes**

- Multiple scopes can be requested on the login flow.
- Multiple scopes can be required for the app.

**Configuration changes**

- ``fxa-oauth.scope`` is now deprecated. ``fxa-oauth.requested_scope`` and
  ``fxa-oauth.required_scope`` should be used instead.


1.2.0 (2015-06-24)
------------------

- Add default settings to define a policy "fxa".
  It is now possible to just include ``cliquet_fxa`` and
  add ``fxa`` to ``multiauth.policies`` setting list.
- Do not check presence of cliquet cache in initialization
  phase.
- Do not use Cliquet logger to prevent initialization errors.


1.1.0 (2015-06-18)
------------------

- Do not prefix authenticated user with ``fxa_`` anymore (#5)


1.0.0 (2015-06-09)
------------------

- Imported code from *Cliquet*


Contributors
============

* Alexis Metaireau <alexis@mozilla.com>
* Mathieu Leplatre <mathieu@mozilla.com>
* Nicolas Perriault <nperriault@mozilla.com>
* Rémy Hubscher <rhubscher@mozilla.com>
* Tarek Ziade <tarek@mozilla.com>



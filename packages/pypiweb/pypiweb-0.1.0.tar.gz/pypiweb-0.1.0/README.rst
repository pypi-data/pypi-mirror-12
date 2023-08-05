pypiweb minimal PyPI server for use with pip
============================================

It's a fork of pypi-server (https://github.com/pypiserver/pypiserver)

Add a interface pypi web: http//<my-ip>/pypi and add manage template

For install, use: https://github.com/pypiserver/pypiserver and replace pypi-server command
by pypiweb

Installation
------------

::

    pip install pypiweb

Or

::

    git clone https://github.com/fraoustin/pypiweb.git
    cd pypiweb
    python setup.py install

Uploading packages from sources, remotely
-----------------------------------------
Instead of copying packages directly to the server's folder,
you may also upload them remotely with a ``python setup.py upload`` command.
Currently only password-protected uploads are supported!

#. First make sure you have the *passlib* module installed,
   which is needed for parsing the apache *htpasswd* file specified by
   the `-P`, `--passwords` option (see next steps)::

     pip install passlib

#. Create the apache *htpasswd* file with at least one user/password pair
   with this command (you'll be prompted for a password)::

     htpasswd -sc .htaccess <some_username>

   .. Tip::
     Read this SO question for running `htpasswd` cmd under *Windows*:

        http://serverfault.com/questions/152950/how-to-create-and-edit-htaccess-and-htpasswd-locally-on-my-computer-and-then-u

     or if you have bogus passwords for an internal service you may use this
     public service:

        http://www.htaccesstools.com/htpasswd-generator/

     It is also possible to disable authentication even for uploads.
     To avoid lazy security decisions, read help for ``-P`` and ``-a`` options.

#. You  need to restart the server with the `-P` option only once
   (but user/password pairs can later be added or updated on the fly)::

     ./pypiweb -p 8080 -P .htaccess ~/packages &

#. You  need change a template::

     ./pypiweb -p 8080 -P .htaccess --add-template mytemplatedir ~/packages &

#. On client-side, edit or create a `~/.pypirc` file with a similar content::

     [distutils]
     index-servers =
       pypi
       local

     [pypi]
     username:<your_pypi_username>
     password:<your_pypi_passwd>

     [local]
     repository: http://localhost:8080
     username: <some_username>
     password: <some_passwd>

#. Then from within the directory of the python-project you wish to upload,
   issue this command::

     python setup.py sdist upload -r local

.. Tip::
    To avoid storing you passwords on disk in clear text, you may either:
       - Use the `register` command with the `-r` option, like that::

           python setup.py sdist register -r local upload -r local

       - Use `twine <https://pypi.python.org/pypi/twine>`_ library which
         breaks the procedure in two steps.


Client-side configurations
--------------------------
Always specifying the the pypi url on the command line is a bit
cumbersome. Since pypiweb redirects pip/easy_install to the
pypi.python.org index if it doesn't have a requested package, it's a
good idea to configure them to always use your local pypi index.

`pip`
~~~~~
For *pip* this can be done by setting the environment variable
`PIP_EXTRA_INDEX_URL` in your `.bashrc`/`.profile`/`.zshrc`::

  export PIP_EXTRA_INDEX_URL=http://localhost:8080/simple/

or by adding the following lines to `~/.pip/pip.conf`::

  [global]
  extra-index-url = http://localhost:8080/simple/

.. Note::
    If you have installed *pypiweb* on a remote url without *https*
    you wil receive an "untrusted" warning from *pip*, urging you to append
    the `--trusted-host` option.  You can also include this option permanently
    in your configuration-files or environment variables.

Using a different WSGI server
-----------------------------
- *pypiweb* ships with it's own copy of bottle.
  It's possible to use bottle with different WSGI servers.

- *pypiweb* chooses any of the
  following *paste*, *cherrypy*, *twisted*, *wsgiref* (part of python) if
  available.

- If none of the above servers matches your needs, pypiserver also
  exposes an API to get the internal WSGI app, which you can then run
  under any WSGI server you like. `pypiweb.app` has the following
  interface::

    def app(root=None,
        redirect_to_fallback=True,
        fallback_url="http://pypi.python.org/simple")

  and returns the WSGI application. `root` is the package directory,
  `redirect_to_fallback` specifies whether to redirect to `fallback_url` when
  a package is missing.

apache/mod_wsgi
~~~~~~~~~~~~~~~
In case you're using *apache2* with *mod_wsgi*, the following config-file
(contributed by Thomas Waldmann) can be used::

    # An example pypiserver.wsgi for use with apache2 and mod_wsgi, edit as necessary.
    #
    # apache virtualhost configuration for mod_wsgi daemon mode:
    #    Alias /robots.txt /srv/yoursite/htdocs/robots.txt
    #    WSGIPassAuthorization On
    #    WSGIScriptAlias /     /srv/yoursite/cfg/pypiserver.wsgi
    #    WSGIDaemonProcess     pypisrv user=pypisrv group=pypisrv processes=1 threads=5 maximum-requests=500 umask=0007 display-name=wsgi-pypisrv inactivity-timeout=300
    #    WSGIProcessGroup      pypisrv

    PACKAGES = "/srv/yoursite/packages"
    HTPASSWD = "/srv/yoursite/htpasswd"
    TEMPLATE = "/srv/yoursite/template"
    import pypiweb
    application = pypiweb.app(PACKAGES, redirect_to_fallback=True, password_file=HTPASSWD, add_template=TEMPLATE)

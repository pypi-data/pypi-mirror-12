About samlauth
-------------------------

samlauth is a Pluggable application for TurboGears2 to authenticate
users against an SAML2 Identity Provider.

Installing
-------------------------------

samlauth can be installed both from pypi or from bitbucket::

    pip install tgapp-samlauth

should just work for most of the users

Plugging samlauth
----------------------------

In your application *config/app_cfg.py* import **plug**::

    from tgext.pluggable import plug

Then at the *end of the file* call plug with samlauth::

    pluggable.plug(base_config, 'samlauth', config_namespace='samlauth',
                   userdata_adapter=base_config.sa_auth.authmetadata.identify_from_saml)

You will be able to login at
*http://localhost:8080/samlauth/login*.

UserData Adapter
----------------

When plugging tgapp-samlauth an ``userdata_adapter`` option is required.
userdata adapter must be a callable that receives the identity provider data and
returns the user_id which will be used to login user. Depending on your TGAuthMetadata
the returned user_id must exist on your local database.

Options
-------

The options are loaded from config file in ``config_namespace``, if
your config namespace is ``"samlauth"`` your options will be: ``samlauth.config_file``
and ``samlauth.enc_key_files``.

Available options are:

    - ``.config_file`` -> the PySAML2 config file from where to load SP data
    - ``.enc_key_files`` -> List of .pem files used to decrypt SAML responses.



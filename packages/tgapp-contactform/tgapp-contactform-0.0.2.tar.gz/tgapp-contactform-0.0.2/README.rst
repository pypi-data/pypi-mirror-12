About contactform
-------------------------

tgapp-contactform is a Pluggable application for TurboGears2 that
shows a simple contact form.

Installing
-------------------------------

contactform can be installed both from pypi or from bitbucket::

    pip install tgapp-contactform

should just work for most of the users

Plugging contactform
----------------------------

In your application *config/app_cfg.py* import **plug**::

    from tgext.pluggable import plug

Then at the *end of the file* call plug with contactform::

    plug(base_config, 'contactform')

You will be able to access the plugged application at
*http://localhost:8080/contactform*.

Options
~~~~~~~

``contactform.sender`` and ``contactform.recipients`` can
be used to specify the mail sender and receiver. They are required
but can be overwritten using the ``contactform.before_send`` hook.

Available Hooks
----------------------

contactform makes available a some hooks which will be
called during some actions to alter the default
behavior of the appplications:

    * ``contactform.before_send(maildata) -> maildata`` -> called before sending email (the hook **must return** the maildata)


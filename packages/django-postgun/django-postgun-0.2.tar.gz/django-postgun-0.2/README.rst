=======
Postgun
=======

Send email using Mailgun with Mailgun specific attributes.

It also includes an API-compatible send_mail function that allows you to pass
custom Mailgun-specific attributes when sending email including:

* campaign
* deliverytime
* dkim
* track
* tracking clicks
* tracking opens
* tags


Quick start
-----------

1. Add "postgun" to INSTALLED_APPS:

.. code:: python

  INSTALLED_APPS = (
    ...
    'postgun'
  )

2. Add the following settings to your settings.py:

.. code:: python

    EMAIL_BACKEND = 'postgun.backends.MailgunEmailBackend'
    MAILGUN_DOMAIN = 'example.com'
    MAILGUN_API_KEY = 'key-my-api-key'
    MAILGUN_PUBLIC_KEY = 'pubkey-my-public-key' #Only needed for email validation


Sending Email
-------------
.. code:: python

  from postman import send_mail
  response_data = {}
  send_mail('Test Email',  #subject
        'This is your test message.', #text content
        'admin@example.com',  #from address
        ['james@example.com', ],  #recipients
        html_message='This is your <strong>test</strong> message.', #html (optional) 
        campaign='test',  #Mailgun campaign id
        tags=['testing', 'august', 'beta'],  #Mailgun tags - 3 max
        reply_to='jacob@example.com', #Reply to address
        response_data=response_data, #Variable to save response data from mailgun i.e. id and message
        )


Validating Email
----------------

Validate email checks against the Mailgun validation API to see if an
address is valid.

If an address is invalid and there are no suggestions a ValidationError is raised.
If an address is invalid and there *are* suggestions a ValidationError is raised with the suggestion in the message.
Returns True on valid email or ConnectionError, AttributeErrors

.. code:: python

  from postman.validators import validate_email_mailgun
  is_valid = validate_email_mailgun('james@hotmail.co.uk')


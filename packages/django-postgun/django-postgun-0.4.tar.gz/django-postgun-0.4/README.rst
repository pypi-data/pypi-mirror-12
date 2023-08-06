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

1. Install django_postgun

.. code:: python

  pip install django_postgun


2. Add "postgun" to INSTALLED_APPS:

.. code:: python

  INSTALLED_APPS = (
    ...
    'postgun'
  )

3. Add the following settings to your settings.py:

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


Getting Email Events
--------------------

Pull in Mailgun Events for a given period of time and by filter. Accepts all of the regular Mailgun API arguments
for events and collects results spread across multiple pages into a single list for processing.

* begin: datetime The time to start getting events.
* end: datetime The time to grab events until.
* ascending: True/False Ascending or descending (defult True)
* limit: integer Limit to x number of items per page (default 300)
* field: string Mailgun field filters (default no filter)

.. code:: python

  import datetime
  from postman.events import get_events

  begin = datetime.datetime.now() - timedelta(days=1)

  items = get_events(begin=begin, limit=100)
  for event in items:
    #Process individual JSON events here




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
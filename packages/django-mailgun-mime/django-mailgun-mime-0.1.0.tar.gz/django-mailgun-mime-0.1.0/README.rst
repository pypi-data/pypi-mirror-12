===================
Django-mailgun-mime
===================

Description
___________
It is an wrapper for Django that allows to send mail via Mailgun`s API.
For the reference of Mailgun`s API, please visit:
    `api for sending <https://documentation.mailgun.com/api-sending.html#sending>`_

For the Django`s email implementation, please visit:
    `sending email <https://docs.djangoproject.com/en/1.8/topics/email/>`_

This wrapper sends request to Mailgun`s mime API
to efficiently use Django`s EmailMessage instance.
In this case we just put mime message,
prepared by django`s EmailMessage instance,
and attach it as a file.
After receiving your message Mailgun`s API will do the rest of job.

This wrapper also supports Mailgun`s extra headers,
which can be very useful.
So if the wrapper finds such header it will placed to request`s data.
But please, notice that the wrapper
does not validates Mailgun`s extra headers.
Because after starting validating extra headers,
it will stop to be simple and tiny. :-)


Requirements
------------
Python 3.x
Django 1.7+
requests for Python

Quick start
-----------
1. Make an account at Mailgun;
2. Set up correctly Mailgun`s records at your DNS provider. (Just follow for the Mailgun instruction);
3. Wait until Mailgun will check and approve your settings;
4. If you fail go back to point 2;
5. Set up at yours project settings these variables::

    EMAIL_BACKEND = 'django_mailgun_mime.backends.MailgunMIMEBackend'
    MAILGUN_API_KEY = 'your api key'
    MAILGUN_DOMAIN_NAME = 'your.domain'
    # optionally:
    DEFAULT_FROM_EMAIL = 'postmaster@your.domain'
    SERVER_EMAIL = 'admin@your.domain'
6. Now you can send email via Mailgun API. Also you can send email through Mailgun SMTP service. In this case just use Django`s SMTP backend.

Examples
--------
Firstly, we need to import some dependencies::

    from django.template.loader import render_to_string
    from django.conf import settings
    from django.core.mail import send_mail, EmailMultiAlternatives
    from django.core.mail import get_connection
A simple email sending example::

    # We will use these paths ahead
    path_to_txt = 'path/to/template.txt'
    path_to_html = 'path/to/template.html'

    s = 'Simple test for Mailgun awesomeness'
    m = 'Congratulations! Now you know Mailgun awesomeness!'
    context = {'title': s, 'message': m}

    txt = render_to_string(path_to_txt, context)
    html = render_to_string(path_to_html, context)
    send_mail(s, txt, settings.DEFAULT_FROM_EMAIL, ['to@example.com'], html_message=html)
Example with Mailgun extra headers and file attachment::

    s = 'Testing Mailgun awesomeness!'
    m = 'Message content for email with tracking.'
    context = {'title': s, 'message': m}

    txt = render_to_string(path_to_txt, context)
    html = render_to_string(path_to_html, context)

    msg = EmailMultiAlternatives(s, txt, settings.DEFAULT_FROM_EMAIL,
                                 ['to@example.com'])
    msg.attach_alternative(html, 'text/html')
    msg.attach_file('path/to/file')
    msg.extra_headers['o:tracking-opens'] = 'yes'
    msg.extra_headers['h:Reply-To'] = 'from@example.com'
    msg.send()
Example with specifying connection::

    api_key = 'API_KEY_FROM_MAILGUN'
    domain = 'yours.domain.name.checked.and.setted.at.mailgun'
    connection = get_connection('django_mailgun_mime.backends.MailgunMIMEBackend',
                                api_key=api_key,
                                domain=domain)

    s = 'Testing specific connection!'
    m = 'Well... You receive it. What now?'
    context = {'title': s, 'message': m}

    txt = render_to_string(path_to_txt, context)
    html = render_to_string(path_to_html, context)

    send_mail(s, txt, settings.DEFAULT_FROM_EMAIL, ['to@example.com'],
                     connection=connection, html_message=html)

License
-------

|ImLink|_

.. |ImLink| image:: https://i.creativecommons.org/l/by-sa/4.0/88x31.png
.. _ImLink: http://creativecommons.org/licenses/by-sa/4.0/

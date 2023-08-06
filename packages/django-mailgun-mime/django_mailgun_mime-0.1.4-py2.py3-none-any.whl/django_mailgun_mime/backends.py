import requests
from django.core.mail.backends.base import BaseEmailBackend
from django.core.mail.message import sanitize_address
from django.conf import settings


class MailgunMIMEError(Exception):
    pass


class MailgunMIMEBackend(BaseEmailBackend):
    """
        It is an wrapper for Django that allows to send mail via Mailgun`s API.
        For the reference of Mailgun`s API, please visit:
            https://documentation.mailgun.com/api-sending.html#sending.

        For the Django`s email documentation, please visit:
            https://docs.djangoproject.com/en/1.8/topics/email/

        This wrapper sends request to Mailgun`s mime API
        to efficiently use Django`s EmailMessage instance.
        In this case we just put mime message ,
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

        If something goes wrong you will receive a response with error.
    """
    M_HEADERS = (
        'o:tag',
        'o:campaign',
        'o:deliverytime',
        'o:dkim',
        'o:testmode',
        'o:tracking',
        'o:tracking-clicks',
        'o:tracking-opens'
    )
    M_PEFIXES = ('h:', 'v:')

    def __init__(self, fail_silently=False, **kwargs):
        super(MailgunMIMEBackend, self).__init__(fail_silently=fail_silently,
                                                 **kwargs)

        self._api_key = kwargs.get('api_key') or settings.MAILGUN_API_KEY
        domain = kwargs.get('domain') or settings.MAILGUN_DOMAIN_NAME

        if not fail_silently and (not self._api_key or not domain):
            raise AttributeError('Mailgun api key and domain are required!')

        self._url = 'https://api.mailgun.net/v3/%s/messages.mime' % domain

    def _send(self, e_message):
        """A helper method that does the actual sending."""
        if not e_message.recipients():
            return False
        recipients = [sanitize_address(addr, e_message.encoding)
                      for addr in e_message.recipients()]

        try:
            files = {'message': e_message.message().as_bytes(linesep='\r\n')}
            data = {'to': ','.join(recipients)}

            hdrs = e_message.extra_headers
            check = lambda x: x in self.M_HEADERS or \
                              any(x.startswith(i) for i in self.M_PEFIXES)
            data.update({k: v for k, v in hdrs.items() if check(k)})

            response = requests.post(self._url,
                                     auth=('api', self._api_key),
                                     data=data,
                                     files=files)
        except:
            if not self.fail_silently:
                raise
            return False

        if response.status_code != 200:
            if not self.fail_silently:
                raise MailgunMIMEError(response.text)
            return False

        return True

    def send_messages(self, email_messages):
        """
        Sends one or more EmailMessage objects and returns the number of email
        messages sent.
        """
        if not email_messages:
            return
        num_sent = 0
        for message in email_messages:
            sent = self._send(message)
            if sent:
                num_sent += 1
        return num_sent

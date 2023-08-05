from django.db import models
from django.core.mail import get_connection, EmailMultiAlternatives, EmailMessage
from jsonfield import JSONField
from django.template import Template, Context
import re


class DeferredMail(models.Model):
    template = models.ForeignKey('EmailTemplate')
    context = JSONField(blank=True, null=True)
    email = models.EmailField()
    title = models.CharField(max_length=255)
    key = models.CharField(max_length=100, db_index=True, default='##default_key##')
    schedule_time = models.DateTimeField()

    def __str__(self):
        return "%s, %s" % (self.email, self.title)

    def __unicode__(self):
        return self.__str__()

    @classmethod
    def remove_by(cls, key):
        cls.objects.filter(key=key).delete()


class EmailTemplate(models.Model):
    name = models.SlugField()
    html_content = models.TextField()
    text_content = models.TextField()

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.__str__()

    def render(self, context):
        html_template = Template(self.html_content)
        text_template = Template(self.text_content)
        return html_template.render(Context(context)), text_template.render(Context(context))


class Provider(models.Model):

    enabled = models.BooleanField(verbose_name="If this provider is enabled", default=True)
    smtp_host = models.CharField(verbose_name="Host of SMTP Server", max_length=255)
    smtp_port = models.IntegerField(verbose_name="Port of SMTP Server", default=587)
    smtp_username = models.CharField(verbose_name="User Name of SMTP Server", max_length=255)
    smtp_password = models.CharField(verbose_name="Password of SMTP Server", max_length=255)
    use_tls = models.BooleanField(verbose_name="If the server uses TLS", default=False)

    from_address = models.CharField(verbose_name="From address for this SMTP Server", max_length=255)

    blacklist = JSONField(verbose_name="Never send emails to these domains with this provider. e.g., @msn.com", blank=True)

    quota = models.IntegerField(verbose_name="Quota of the SMTP Server", default=15000)
    usage = models.IntegerField(verbose_name="Usage of the SMTP Server", default=0)
    quota_type_is_daily = models.BooleanField(verbose_name="Is the quota of the server daily?", default=False)

    preference = models.IntegerField(verbose_name="Preference of the Server, Higher the Better", default=0)

    def reset_usage(self):
        self.usage = 0
        self.save()

    def add_usage(self):
        self.usage += 1
        self.save()

    def within_quota(self):
        if not self.quota:
            return True
        return self.usage < self.quota

    def __str__(self):
        return self.smtp_host

    def __unicode__(self):
        return self.__str__()

    def get_connection(self):
        return get_connection(host=self.smtp_host,
                              port=self.smtp_port,
                              username=self.smtp_username,
                              password=self.smtp_password,
                              use_tls=self.use_tls)

    def send(self, address, title, content, html_message=None, html_only=False):
        if html_only:
            msg = EmailMessage(title, content, self.from_address, [address], connection=self.get_connection())
            msg.content_subtype = "html"
        else:
            msg = EmailMultiAlternatives(
                title,
                content,
                self.from_address,
                [address],
                connection=self.get_connection()
            )
            msg.attach_alternative(
                html_message,
                "text/html"
            )
        msg.send()
        msg.connection.close()
        self.add_usage()

    def can_send(self, address):
        if not self.enabled:
            return False
        if not self.within_quota():
            return False
        suffix = re.search("@[\w.]+", address).group()
        if suffix in self.blacklist:
            return False
        return True

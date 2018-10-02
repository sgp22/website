from django.contrib.postgres.fields import JSONField
from django.db import models

class Feedback(models.Model):
    doc_data = JSONField(
        default=dict,
        blank=True,
        help_text='Json format'
    )
    meta_data = JSONField(
        default=dict,
        blank=True,
        help_text='Json format'
    )
    relative_url = models.CharField(
        max_length=100,
        null=False,
        default=''
    )
    thumb_type = models.CharField(
        max_length=100,
        null=False,
        default=''
    )
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta(object):
        verbose_name = 'Feedback'
        verbose_name_plural = 'All Feedback Objects'
        ordering = ('-date_updated', '-date_created',)

    def __str__(self):
        return '%s' % self.id

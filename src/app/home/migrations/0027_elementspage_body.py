# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-01-10 15:31
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0026_elementspage_fka'),
    ]

    operations = [
        migrations.AddField(
            model_name='elementspage',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('richText', home.models.APIRichTextBlock()), ('markdown', home.models.APIMarkDownBlock())), blank=True, null=True),
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-19 15:32
from __future__ import unicode_literals

from django.db import migrations
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_auto_20171018_1332'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landingpage',
            name='content',
            field=wagtail.core.fields.StreamField((), blank=True, null=True),
        ),
    ]

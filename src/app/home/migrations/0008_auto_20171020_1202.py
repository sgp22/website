# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-20 12:02
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_auto_20171019_1532'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='footer',
            name='related_page',
        ),
        migrations.DeleteModel(
            name='Footer',
        ),
    ]

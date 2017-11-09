# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-09 18:22
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0014_auto_20171107_2221'),
    ]

    operations = [
        migrations.AlterField(
            model_name='corecontentpage',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('html', wagtail.wagtailcore.blocks.RichTextBlock()), ('image', home.models.APIImageChooserBlock())), blank=True, null=True),
        ),
    ]

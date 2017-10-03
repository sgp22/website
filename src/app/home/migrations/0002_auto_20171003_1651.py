# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-03 16:51
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='elementspage',
            name='attributes',
        ),
        migrations.AlterField(
            model_name='elementspage',
            name='types',
            field=wagtail.wagtailcore.fields.StreamField((('list_block_types', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock((('names', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('details', wagtail.wagtailcore.blocks.CharBlock(required=True)))))),), blank=True, null=True),
        ),
    ]

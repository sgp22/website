# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-20 13:41
from __future__ import unicode_literals

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_auto_20171020_1202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elementspage',
            name='types',
            field=wagtail.core.fields.StreamField((('types', wagtail.core.blocks.StructBlock((('name', wagtail.core.blocks.CharBlock(required=True)), ('detail', wagtail.core.blocks.CharBlock(required=True))))),), blank=True, null=True),
        ),
    ]

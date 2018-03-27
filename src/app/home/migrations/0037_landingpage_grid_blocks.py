# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-03-27 22:00
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0036_landingpage_page_hero'),
    ]

    operations = [
        migrations.AddField(
            model_name='landingpage',
            name='grid_blocks',
            field=wagtail.wagtailcore.fields.StreamField((('grid_blocks', wagtail.wagtailcore.blocks.StructBlock((('image', home.models.APIImageChooserBlock(required=True)), ('title', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('text', wagtail.wagtailcore.blocks.CharBlock(required=True))))),), blank=True, null=True),
        ),
    ]

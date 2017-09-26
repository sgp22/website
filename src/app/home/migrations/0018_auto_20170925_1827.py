# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-25 18:27
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0017_auto_20170925_1825'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('ContentBanner', wagtail.wagtailcore.blocks.StructBlock((('image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), ('header', wagtail.wagtailcore.blocks.CharBlock()), ('copy', wagtail.wagtailcore.blocks.TextBlock()), ('button', wagtail.wagtailcore.blocks.StructBlock((('label', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('link', wagtail.wagtailcore.blocks.CharBlock(required=True)))))), label='Content Banner')), ('OneColumnBanner', wagtail.wagtailcore.blocks.StructBlock((('header', wagtail.wagtailcore.blocks.CharBlock()), ('intro', wagtail.wagtailcore.blocks.TextBlock()), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False))), label='One Column Banner')), ('test_list_block', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock((('name', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('description', wagtail.wagtailcore.blocks.CharBlock())))))), blank=True, null=True),
        ),
    ]

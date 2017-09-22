# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-21 15:05
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0019_auto_20170921_1501'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('ContentBanner', wagtail.wagtailcore.blocks.StructBlock((('image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), ('header', wagtail.wagtailcore.blocks.CharBlock()), ('copy', wagtail.wagtailcore.blocks.TextBlock()), ('button', wagtail.wagtailcore.blocks.StructBlock((('label', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('link', wagtail.wagtailcore.blocks.CharBlock(required=True)))))), label='Content Banner')), ('OneColumnBanner', wagtail.wagtailcore.blocks.StructBlock((('header', wagtail.wagtailcore.blocks.CharBlock()), ('intro', wagtail.wagtailcore.blocks.TextBlock()), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False))), label='One Column Banner')), ('carousel', wagtail.wagtailcore.blocks.StreamBlock((('item', wagtail.wagtailcore.blocks.StructBlock((('image', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), ('text', wagtail.wagtailcore.blocks.TextBlock()), ('author', wagtail.wagtailcore.blocks.CharBlock())))),), label='Carousel'))), blank=True, null=True),
        ),
    ]

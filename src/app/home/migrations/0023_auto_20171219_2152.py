# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2017-12-19 21:52
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0022_auto_20171215_1631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blockspage',
            name='types',
            field=wagtail.wagtailcore.fields.StreamField((('types', wagtail.wagtailcore.blocks.StructBlock((('name', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('detail', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('image', home.models.APIImageChooserBlock(required=False)), ('image_type', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('full-width', 'Full Width'), ('inline', 'Inline')], required=False))))),), blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='elementspage',
            name='types',
            field=wagtail.wagtailcore.fields.StreamField((('types', wagtail.wagtailcore.blocks.StructBlock((('name', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('detail', wagtail.wagtailcore.blocks.CharBlock(required=True)), ('image', home.models.APIImageChooserBlock(required=False)), ('image_type', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('full-width', 'Full Width'), ('inline', 'Inline')], required=False))))),), blank=True, null=True),
        ),
    ]

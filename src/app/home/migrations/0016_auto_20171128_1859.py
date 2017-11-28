# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-28 18:59
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_auto_20171109_1822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landingpage',
            name='content',
            field=wagtail.wagtailcore.fields.StreamField((('fullWidth', wagtail.wagtailcore.blocks.StructBlock((('title', wagtail.wagtailcore.blocks.CharBlock()), ('content', wagtail.wagtailcore.blocks.TextBlock()), ('cta_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta_link', wagtail.wagtailcore.blocks.CharBlock(help_text='enter slug or link', required=False)), ('hero_image', home.models.APIImageChooserBlock(required=False)), ('background_image', home.models.APIImageChooserBlock(required=False)), ('background_color', wagtail.wagtailcore.blocks.CharBlock(help_text='enter hex code', max_length=6, required=False)), ('invert_text_color', wagtail.wagtailcore.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('text_align', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False))))),), blank=True, null=True),
        ),
    ]

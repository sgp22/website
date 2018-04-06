# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-28 18:59
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_auto_20171109_1822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landingpage',
            name='content',
            field=wagtail.core.fields.StreamField((('fullWidth', wagtail.core.blocks.StructBlock((('title', wagtail.core.blocks.CharBlock()), ('content', wagtail.core.blocks.TextBlock()), ('cta_text', wagtail.core.blocks.CharBlock(required=False)), ('cta_link', wagtail.core.blocks.CharBlock(help_text='enter slug or link', required=False)), ('hero_image', home.models.APIImageChooserBlock(required=False)), ('background_image', home.models.APIImageChooserBlock(required=False)), ('background_color', wagtail.core.blocks.CharBlock(help_text='enter hex code', max_length=6, required=False)), ('invert_text_color', wagtail.core.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('text_align', wagtail.core.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False))))),), blank=True, null=True),
        ),
    ]

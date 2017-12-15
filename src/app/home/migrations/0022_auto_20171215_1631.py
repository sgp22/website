# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2017-12-15 16:31
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0021_auto_20171214_2022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='corecontentpage',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('richText', home.models.APIRichTextBlock()), ('image', home.models.APIImageChooserBlock()), ('markdown', home.models.APIMarkDownBlock())), blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='landingpage',
            name='content',
            field=wagtail.wagtailcore.fields.StreamField((('fullWidth', wagtail.wagtailcore.blocks.StructBlock((('title', wagtail.wagtailcore.blocks.CharBlock()), ('content', wagtail.wagtailcore.blocks.TextBlock()), ('cta_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta_link', wagtail.wagtailcore.blocks.CharBlock(help_text='enter slug or link', required=False)), ('hero_image', home.models.APIImageChooserBlock(required=False)), ('background_image', home.models.APIImageChooserBlock(required=False)), ('background_color', wagtail.wagtailcore.blocks.CharBlock(help_text='enter hex code', max_length=6, required=False)), ('invert_text_color', wagtail.wagtailcore.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('text_align', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False))))), ('twoColumn', wagtail.wagtailcore.blocks.StructBlock((('column_1_title', wagtail.wagtailcore.blocks.CharBlock()), ('column_1_content', wagtail.wagtailcore.blocks.TextBlock()), ('column_1_cta_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('column_1_cta_link', wagtail.wagtailcore.blocks.CharBlock(help_text='enter slug or link', required=False)), ('column_1_hero_image', home.models.APIImageChooserBlock(required=False)), ('column_1_background_image', home.models.APIImageChooserBlock(required=False)), ('column_1_background_color', wagtail.wagtailcore.blocks.CharBlock(help_text='enter 6 digit hex code without #', max_length=6, required=False)), ('column_1_invert_text_color', wagtail.wagtailcore.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('column_1_text_align', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False)), ('column_2_title', wagtail.wagtailcore.blocks.CharBlock()), ('column_2_content', wagtail.wagtailcore.blocks.TextBlock()), ('column_2_cta_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('column_2_cta_link', wagtail.wagtailcore.blocks.CharBlock(help_text='enter slug or link', required=False)), ('column_2_hero_image', home.models.APIImageChooserBlock(required=False)), ('column_2_background_image', home.models.APIImageChooserBlock(required=False)), ('column_2_background_color', wagtail.wagtailcore.blocks.CharBlock(help_text='enter 6 digit hex code without #', max_length=6, required=False)), ('column_2_invert_text_color', wagtail.wagtailcore.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('column_2_text_align', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False))))), ('twoColTextImage', wagtail.wagtailcore.blocks.StructBlock((('title', wagtail.wagtailcore.blocks.CharBlock()), ('content', wagtail.wagtailcore.blocks.TextBlock()), ('cta_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), ('cta_link', wagtail.wagtailcore.blocks.CharBlock(help_text='enter slug or link', required=False)), ('image', home.models.APIImageChooserBlock(required=False)), ('image_align', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('left', 'left'), ('right', 'right')], required=False)), ('background_image', home.models.APIImageChooserBlock(required=False)), ('background_color', wagtail.wagtailcore.blocks.CharBlock(help_text='enter hex code', max_length=6, required=False)), ('invert_text_color', wagtail.wagtailcore.blocks.BooleanBlock(help_text='check to invert text color', required=False))))), ('markdown', home.models.APIMarkDownBlock()), ('richText', home.models.APIRichTextBlock())), blank=True, null=True),
        ),
    ]

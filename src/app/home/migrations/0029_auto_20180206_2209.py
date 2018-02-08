# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-06 22:09
from __future__ import unicode_literals

from django.db import migrations
import home.models
import wagtail.contrib.table_block.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0028_auto_20180119_1939'),
    ]

    operations = [
        migrations.AlterField(
            model_name='corecontentpage',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('richText', home.models.APIRichTextBlock()), ('image', home.models.APIImageChooserBlock()), ('table', wagtail.contrib.table_block.blocks.TableBlock()), ('markdown', home.models.APIMarkDownBlock())), blank=True, null=True),
        ),
    ]
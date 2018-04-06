# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-01-03 22:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import home.models
import modelcluster.fields
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0024_auto_20171220_2023'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlocksPageElementDescriptorsRelationship',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='blockspage',
            name='states',
        ),
        migrations.AddField(
            model_name='blockspage',
            name='body',
            field=wagtail.core.fields.StreamField((('richText', home.models.APIRichTextBlock()), ('markdown', home.models.APIMarkDownBlock())), blank=True, null=True),
        ),
        migrations.AddField(
            model_name='blockspage',
            name='fka',
            field=models.CharField(blank=True, max_length=255, verbose_name='Formerly Known As'),
        ),
        migrations.AddField(
            model_name='blockspage',
            name='what_it_does',
            field=models.ForeignKey(blank=True, help_text='select a snippet from the what it does type', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='home.WhatItDoes', verbose_name='What it does'),
        ),
        migrations.AddField(
            model_name='blockspage',
            name='what_user_can_do',
            field=models.ForeignKey(blank=True, help_text='select a snippet from the what user can do type', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='home.WhatUserCanDo', verbose_name='What user can do'),
        ),
        migrations.AddField(
            model_name='blockspage',
            name='when_to_use_it',
            field=models.ForeignKey(blank=True, help_text='select a snippet from the when to use it type', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='home.WhenToUseIt', verbose_name='When to use it'),
        ),
        migrations.AddField(
            model_name='blockspageelementdescriptorsrelationship',
            name='blocks_page',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocks_page_element_descriptors_relationship', to='home.BlocksPage'),
        ),
        migrations.AddField(
            model_name='blockspageelementdescriptorsrelationship',
            name='element_descriptor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='home.ElementDescriptor'),
        ),
    ]

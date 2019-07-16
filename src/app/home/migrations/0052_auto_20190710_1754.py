# Generated by Django 2.1.9 on 2019-07-10 17:54

from django.db import migrations
import home.models
import wagtail.contrib.table_block.blocks
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0051_auto_20190710_1752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='corecontentpage',
            name='body',
            field=wagtail.core.fields.StreamField([('heading', wagtail.core.blocks.CharBlock(classname='full title')), ('image', home.models.APIImageChooserBlock()), ('image_gallery', wagtail.core.blocks.StreamBlock([('image_1_col', wagtail.core.blocks.StreamBlock([('image', wagtail.core.blocks.StructBlock([('image_file', home.models.APIImageChooserBlock()), ('image_label', wagtail.core.blocks.CharBlock(required=True))]))])), ('image_2_col', wagtail.core.blocks.StreamBlock([('image', home.models.APIImageChooserBlock())])), ('image_3_col', wagtail.core.blocks.StreamBlock([('image', home.models.APIImageChooserBlock())]))])), ('table', wagtail.contrib.table_block.blocks.TableBlock()), ('markdown', home.models.APIMarkDownBlock()), ('richText', home.models.APIRichTextBlock()), ('tokensCategory', wagtail.core.blocks.CharBlock()), ('iconType', wagtail.core.blocks.CharBlock(label='Icon Type'))], blank=True, null=True),
        ),
    ]

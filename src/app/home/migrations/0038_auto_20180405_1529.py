# Generated by Django 2.0.4 on 2018-04-05 15:29

from django.db import migrations
import home.models
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0037_landingpage_grid_blocks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landingpage',
            name='content',
            field=wagtail.core.fields.StreamField((('fullWidth', wagtail.core.blocks.StructBlock((('title', wagtail.core.blocks.CharBlock()), ('content', wagtail.core.blocks.TextBlock()), ('cta_text', wagtail.core.blocks.CharBlock(required=False)), ('cta_link', wagtail.core.blocks.CharBlock(help_text='enter slug or link', required=False)), ('hero_image', home.models.APIImageChooserBlock(required=False)), ('background_image', home.models.APIImageChooserBlock(required=False)), ('background_color', wagtail.core.blocks.CharBlock(help_text='enter hex code', max_length=6, required=False)), ('invert_text_color', wagtail.core.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('text_align', wagtail.core.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False))))), ('twoColumn', wagtail.core.blocks.StructBlock((('column_1_title', wagtail.core.blocks.CharBlock()), ('column_1_content', wagtail.core.blocks.TextBlock()), ('column_1_cta_text', wagtail.core.blocks.CharBlock(required=False)), ('column_1_cta_link', wagtail.core.blocks.CharBlock(help_text='enter slug or link', required=False)), ('column_1_hero_image', home.models.APIImageChooserBlock(required=False)), ('column_1_background_image', home.models.APIImageChooserBlock(required=False)), ('column_1_background_color', wagtail.core.blocks.CharBlock(help_text='enter 6 digit hex code without #', max_length=6, required=False)), ('column_1_invert_text_color', wagtail.core.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('column_1_text_align', wagtail.core.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False)), ('column_2_title', wagtail.core.blocks.CharBlock()), ('column_2_content', wagtail.core.blocks.TextBlock()), ('column_2_cta_text', wagtail.core.blocks.CharBlock(required=False)), ('column_2_cta_link', wagtail.core.blocks.CharBlock(help_text='enter slug or link', required=False)), ('column_2_hero_image', home.models.APIImageChooserBlock(required=False)), ('column_2_background_image', home.models.APIImageChooserBlock(required=False)), ('column_2_background_color', wagtail.core.blocks.CharBlock(help_text='enter 6 digit hex code without #', max_length=6, required=False)), ('column_2_invert_text_color', wagtail.core.blocks.BooleanBlock(help_text='check to invert text color', required=False)), ('column_2_text_align', wagtail.core.blocks.ChoiceBlock(choices=[('left', 'left'), ('center', 'center'), ('right', 'right')], required=False))))), ('twoColTextImage', wagtail.core.blocks.StructBlock((('title', wagtail.core.blocks.CharBlock()), ('content', wagtail.core.blocks.TextBlock()), ('cta_text', wagtail.core.blocks.CharBlock(required=False)), ('cta_link', wagtail.core.blocks.CharBlock(help_text='enter slug or link', required=False)), ('image', home.models.APIImageChooserBlock(required=False)), ('image_align', wagtail.core.blocks.ChoiceBlock(choices=[('left', 'left'), ('right', 'right')], required=False)), ('background_image', home.models.APIImageChooserBlock(required=False)), ('background_color', wagtail.core.blocks.CharBlock(help_text='enter hex code', max_length=6, required=False)), ('invert_text_color', wagtail.core.blocks.BooleanBlock(help_text='check to invert text color', required=False))))), ('markdown', home.models.APIMarkDownBlock()), ('rawHtml', wagtail.core.blocks.RawHTMLBlock()), ('richText', home.models.APIRichTextBlock())), blank=True, null=True),
        ),
    ]

import json
import os

from wagtailtinymce.rich_text import TinyMCERichTextArea

fn = os.path.join(os.path.dirname(__file__), 'tinymce.json')
with open(fn) as json_data:
    data = json.load(json_data)
    style_formats = data['style_formats']

class CustomTinyMCE(TinyMCERichTextArea):
    def __init__(self, attrs=None, **kwargs):
        super(CustomTinyMCE, self).__init__(attrs, **kwargs)
        buttons = self.kwargs['buttons']
        options = self.kwargs['options']
        options['style_formats'] = style_formats
        options['language'] = 'en'
        buttons[0].remove(['table'])
        buttons[0].remove(['bullist', 'numlist', 'outdent', 'indent'])
        buttons[0].remove(['wagtaildoclink', 'wagtailimage', 'wagtailembed'])
        buttons[0].remove(['pastetext', 'fullscreen'])
        buttons[0].append(['wagtaildoclink'])
        buttons[0].append(['code'])
        buttons[0].append(['removeformat'])

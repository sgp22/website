import json
from wagtailtinymce.rich_text import TinyMCERichTextArea

class CustomTinyMCE(TinyMCERichTextArea):
    def __init__(self, attrs=None, **kwargs):
        super(CustomTinyMCE, self).__init__(attrs, **kwargs)
        buttons = self.kwargs['buttons']
        buttons[0].remove(['table'])
        buttons[0].remove(['bullist', 'numlist', 'outdent', 'indent'])
        buttons[0].remove(['wagtaildoclink', 'wagtailimage', 'wagtailembed'])
        buttons[0].remove(['pastetext', 'fullscreen'])
        buttons[0].append(['wagtaildoclink'])
        buttons[0].append(['code'])
        buttons[0].append(['removeformat'])

from wagtail.wagtailcore import hooks
from django.utils.html import format_html, format_html_join
from django.conf import settings

@hooks.register('construct_main_menu')
def hide_snippets_menu_item(request, menu_items):
  menu_items[:] = [item for item in menu_items if item.name != 'snippets']

@hooks.register('insert_editor_js')
def editor_js():
  return format_html(
      '<script src="js/editor.js"></script>',
  )
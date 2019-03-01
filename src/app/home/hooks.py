from wagtail.core import hooks
from wagtail.core.whitelist import allow_without_attributes
from django.utils.html import format_html, format_html_join
from django.conf import settings
from draftjs_exporter.dom import DOM
import wagtail.admin.rich_text.editors.draftail.features as draftail_features
from wagtail.admin.rich_text.converters.html_to_contentstate import InlineStyleElementHandler
from wagtail.admin.rich_text.converters.html_to_contentstate import InlineEntityElementHandler
from wagtail.admin.rich_text.converters.html_to_contentstate import BlockElementHandler

@hooks.register('construct_whitelister_element_rules')
def whitelister_element_rules():
    return {
        'table': allow_without_attributes,
        'tr': allow_without_attributes,
        'td': allow_without_attributes
    }


@hooks.register('construct_main_menu')
def hide_snippets_menu_item(request, menu_items):
  menu_items[:] = [item for item in menu_items if item.name != 'snippets']


@hooks.register('insert_editor_js')
def editor_js():
  js_files = [
    'wagtailadmin/js/draftail.js',
    'js/draft-toc.js',
    'js/editor.js',
  ]
  js_includes = format_html_join('\n', '<script src="{0}{1}"></script>',
    ((settings.STATIC_URL, filename) for filename in js_files)
  )
  return js_includes


def toc_entity_decorator(props):
    """
    Draft.js ContentState to database HTML.
    Converts the TOCHEADING entities into a h2 tag.
    """
    return DOM.create_element('h2', {
        'id': props['toc'],
    }, props['children'])


class TocEntityElementHandler(InlineEntityElementHandler):
    """
    Database HTML to Draft.js ContentState.
    Converts the tag into a TOCHEADING entity, with the right data.
    """
    mutability = 'IMMUTABLE'

    def get_attribute_data(self, attrs):
        """
        Take the ``id`` value from the ``id`` HTML attribute.
        """
        return {
            'toc': attrs['id'],
        }


@hooks.register('register_rich_text_features')
def register_toc_feature(features):
    features.default_features.append('toc')
    """
    Registering the `toc` feature, which uses the `TOCHEADING` Draft.js entity type,
    and is stored as HTML with a `<h2 id>` tag.
    """
    feature_name = 'toc'
    type_ = 'TOCHEADING'

    control = {
        'type': type_,
        'label': '#',
        'description': 'TOC Heading',
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.EntityFeature(control)
    )

    features.register_converter_rule('contentstate', feature_name, {
        # Note here that the conversion is more complicated than for blocks and inline styles.
        'from_database_format': {'h2[id]': TocEntityElementHandler(type_)},
        'to_database_format': {'entity_decorators': {type_: toc_entity_decorator}},
    })

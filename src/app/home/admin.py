from home import hooks

from wagtail.contrib.modeladmin.options import (
    ModelAdmin,
    ModelAdminGroup,
    modeladmin_register
)

from home.snippets import WhatItDoes
from home.snippets import WhatUserCanDo
from home.snippets import WhenToUseIt
from home.snippets import Cornerstone


class WhatItDoesAdmin(ModelAdmin):
    model = WhatItDoes
    menu_label = 'What it does'
    menu_icon = 'snippet'
    list_display = ('name', 'description')

class WhatUserCanDoAdmin(ModelAdmin):
    model = WhatUserCanDo
    menu_label = 'What user can do'
    menu_icon = 'snippet'
    list_display = ('name', 'description')

class WhenToUseItAdmin(ModelAdmin):
    model = WhenToUseIt
    menu_label = 'When to use it'
    menu_icon = 'snippet'
    list_display = ('name', 'description')

class ElementDescriptorGroup(ModelAdminGroup):
    menu_label = 'Descriptors'
    menu_icon = 'snippet'
    items = (WhatItDoesAdmin, WhatUserCanDoAdmin, WhenToUseItAdmin)

modeladmin_register(ElementDescriptorGroup)

class CornerstoneAdmin(ModelAdmin):
    model = Cornerstone
    menu_label = 'Cornerstones'
    menu_icon = 'snippet'
    list_display = ('name', 'description')

modeladmin_register(CornerstoneAdmin)

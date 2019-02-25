<template>
  <div class="app-editor pure-form">

      <div class="app-editor-menus">
        <app-editor-main-menu class="app-editor-panel" />
        <app-editor-add-menu class="app-editor-panel" />
        <app-editor-save-menu class="app-editor-panel" />
        <app-editor-delete-menu class="app-editor-panel" />
      </div>

      <app-help :class="{ hidden: !this.$store.getters.showHelp }" />

      <div class="app-editor-section">
      </div>

      <div class="app-editor-section">
        <!-- EDITOR COLORS -->
        <div class="app-editor-panel"
          :class="{ blur: this.$store.getters.showHelp }"
        >

          <!-- <app-editor-slider-globalcolumns /> -->

          <template
            v-if="!this.$store.getters.isEditorModeDelete"
          >
            <div class="app-editor-menu"
              v-if="this.$store.getters.hasEditItem"
            >
              <app-editor-button icon="edit-delete" 
                class="pure-button-warning app-editor-button-delete-item"
                :label="'Delete ' + this.$store.getters.editItemKey('type', 'Item')"
                @click.native.stop="onDeleteItem"
              />
            </div>

            <app-editor-text-color-picker />
            <app-editor-item-color-picker />

          </template>
        </div>

        <!-- EDITOR OPTIONS PANEL -->
        <div class="app-editor-panel" 
          v-if="this.$store.getters.hasEditItem 
          && !this.$store.getters.isEditorBulkEdit 
          && !this.$store.getters.isEditorModeDelete"
          :class="{ blur: this.$store.getters.showHelp }"
        >

          <app-editor-slider-itemwidth />
          <app-editor-input-action />
          <app-editor-input-label />

          <div class="app-editor-sub-panel">
            <app-editor-input-toggle />
            <app-editor-select-labelpos />
          </div>

          <app-editor-item-desc />

        </div>

        <app-editor-bulkedit-menu />
      
      </div>

      <app-editor-icon-menu />
  </div>
</template>

<script>
import BaseEditorButton from '@/components/BaseEditorButton.vue'
import BaseEditorIconPicker from '@/components/BaseEditorIconPicker.vue'
import TheEditorTextColorPicker from '@/components/TheEditorTextColorPicker.vue'
import TheEditorItemColorPicker from '@/components/TheEditorItemColorPicker.vue'
import TheEditorMainMenu from '@/components/TheEditorMainMenu.vue'
import TheEditorAddMenu from '@/components/TheEditorAddMenu.vue'
import TheEditorDeleteMenu from '@/components/TheEditorDeleteMenu.vue'
import TheEditorSaveMenu from '@/components/TheEditorSaveMenu.vue'
import TheEditorIconMenu from '@/components/TheEditorIconMenu.vue'
import TheEditorInputAction from '@/components/TheEditorInputAction.vue'
import TheEditorInputToggle from '@/components/TheEditorInputToggle.vue'
import TheEditorInputLabel from '@/components/TheEditorInputLabel.vue'
import TheEditorSliderItemWidth from '@/components/TheEditorSliderItemWidth.vue'
import TheEditorSliderGlobalColumns from '@/components/TheEditorSliderGlobalColumns.vue'
import TheEditorSelectLabelPos from '@/components/TheEditorSelectLabelPos.vue'
import TheEditorItemDesc from '@/components/TheEditorItemDesc.vue'
import TheEditorSelectLabelPosVue from '@/components/TheEditorSelectLabelPos.vue'
import TheEditorBulkEditMenu from '@/components/TheEditorBulkEditMenu.vue'
import TheEditorHelp from '@/components/TheEditorHelp.vue'

export default {

  components: {
    'app-editor-item-color-picker': TheEditorItemColorPicker,
    'app-editor-text-color-picker': TheEditorTextColorPicker,
    'app-editor-icon-picker': BaseEditorIconPicker,
    'app-editor-main-menu': TheEditorMainMenu,
    'app-editor-add-menu': TheEditorAddMenu,
    'app-editor-delete-menu': TheEditorDeleteMenu,
    'app-editor-save-menu': TheEditorSaveMenu,
    'app-editor-icon-menu': TheEditorIconMenu,
    'app-editor-bulkedit-menu': TheEditorBulkEditMenu,
    'app-editor-input-action': TheEditorInputAction,
    'app-editor-input-label': TheEditorInputLabel,
    'app-editor-input-toggle': TheEditorInputToggle,
    'app-editor-slider-itemwidth': TheEditorSliderItemWidth,
    'app-editor-slider-globalcolumns': TheEditorSliderGlobalColumns,
    'app-editor-select-labelpos': TheEditorSelectLabelPos,
    'app-editor-item-desc': TheEditorItemDesc,
    'app-editor-button': BaseEditorButton,
    'app-help': TheEditorHelp
  },
  
  updated() {
    // dirty hack to fix editor label input value not always being updated 
    let label = this.$store.getters.editItemKey('label', '')
    let el = document.querySelector('#item-label')
    if(el && el.value !== label)
      el.value = label
  },

  mounted() {
    this.$store.commit('fadeOutLoader')
    document.title = "ReaperWRB / Editor"
  },

  methods: {
    onDeleteItem(event) {
      this.$store.dispatch('onDeleteItem')
    },
  }
}
</script>
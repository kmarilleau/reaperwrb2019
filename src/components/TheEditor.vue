<template>
  <div class="app-editor pure-form">
    <div class="app-editor__menu-container">
      <app-editor-main-menu class="app-editor__panel" />
      <app-editor-add-menu class="app-editor__panel" />
      <app-editor-save-menu class="app-editor__panel" />
      <app-editor-delete-menu class="app-editor__panel" />
    </div>

    <app-help :class="{ hidden: !showHelp }" />

    <div class="app-editor__section">
      <!-- EDITOR COLORS -->
      <div class="app-editor__panel"
        :class="{ blur: showHelp }"
      >

        <template
          v-if="!isEditorModeDelete"
        >
          <app-editor-text-color-picker />
          <app-editor-item-color-picker />
        </template>
      </div>

      <!-- EDITOR OPTIONS PANEL -->
      <div class="app-editor__panel" 
        v-if="hasEditItem && !isEditorBulkEdit && !isEditorModeDelete"
        :class="{ blur: showHelp }"
      >

        <app-editor-slider-itemwidth />
        <app-editor-input-action />
        <app-editor-input-label />

        <div class="app-editor__sub-panel">
          <app-editor-input-toggle />
          <app-editor-input-midi-toggle />
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
import { mapGetters, mapMutations } from 'vuex'

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
import TheEditorInputMidiToggle from '@/components/TheEditorInputMidiToggle.vue'
import TheEditorInputLabel from '@/components/TheEditorInputLabel.vue'
import TheEditorSliderItemWidth from '@/components/TheEditorSliderItemWidth.vue'
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
    'app-editor-input-midi-toggle': TheEditorInputMidiToggle,
    'app-editor-slider-itemwidth': TheEditorSliderItemWidth,
    'app-editor-select-labelpos': TheEditorSelectLabelPos,
    'app-editor-item-desc': TheEditorItemDesc,
    'app-editor-button': BaseEditorButton,
    'app-help': TheEditorHelp
  },
  
  updated() {
    // dirty hack to fix editor label input value not always being updated 
    let label = this.editItemKey('label', '')
    let el = document.querySelector('#item-label')
    if(el && el.value !== label)
      el.value = label
  },

  mounted() {
    this.fadeOutLoader()
    document.title = "ReaperWRB / Editor"
  },

  computed: {
    ...mapGetters([
      'editItemKey',
      'showHelp',
      'isEditorModeDelete',
      'hasEditItem',
      'isEditorBulkEdit'
    ])
  },

  methods: {
    ...mapMutations([
      'fadeOutLoader'
    ])
  }

}
</script>
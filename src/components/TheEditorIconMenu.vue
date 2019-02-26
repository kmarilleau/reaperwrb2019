<template>
  <div class="app-editor-icon-menu-container app-editor-section">
    <div class="app-editor-panel"
      :class="{ 
        hidden: !this.$store.getters.editItemType('action') || this.$store.getters.isEditorModeDelete,
        blur: this.$store.state.editor.help 
      }"
    >
      <div class="app-item-icon-preview-container">
        <div class="app-item-icon-preview">
          <label>Icon: {{itemIcon}}</label>
          <div class="app-item-icon-preview-menu">
            <div class="app-item-icon" 
              :style="{ 
                backgroundColor: itemBgcolor, 
                color: itemTextcolor 
              }">
              <svgicon :icon="itemIcon" width="40%" height="40%"></svgicon>
            </div>
            <button title="delete icons" class="pure-button app-item-icon pure-button-warning"
              @click.stop="onClearIcons()" 
            >
              <svgicon icon="edit-delete" /></svgicon>
            </button>
          </div>
          <app-editor-icon-picker :toggle="false" />
        </div>
      </div>
    </div>

    <div class="app-editor-panel"
      :class="{ 
        hidden : !this.$store.getters.editItemKey('toggle', false) || this.$store.getters.isEditorModeDelete,
        blur: this.$store.state.editor.help 
      }"
    >
      <div class="app-item-icon-preview-container">
        <div class="app-item-icon-preview">
          <label>Toggle Icon: {{itemToggleIcon}}</label>
          <div class="app-item-icon"
            v-if="this.$store.getters.editItemKey('toggle', false)" 
            :style="{ 
              backgroundColor: this.$store.getters.editItemKey('bgcolor', '#222222'), 
              color: itemTextcolor 
            }"
          >
            <svgicon :icon="itemToggleIcon" width="40%" height="40%"></svgicon>
          </div>
          <app-editor-icon-picker :toggle="true" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BaseEditorIconPicker from '@/components/BaseEditorIconPicker.vue'
export default {

  components: {
    'app-editor-icon-picker': BaseEditorIconPicker
  },

  computed: {

    itemTextcolor() {
      return this.$store.getters.editItemKey('textcolor', '#222222')
    },

    itemBgcolor() {
      return this.$store.getters.editItemKey('bgcolor', '#222222')
    },

    itemIcon: {
      get() {
        return this.$store.getters.editItemKey('icon', 'question-circle')
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'icon', val: value })
      }
    },

    itemToggleIcon: {
      get() {
        return this.$store.getters.editItemKey('toggleicon', this.itemIcon)
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'icon', val: value })
      }
    },
  },

  methods: {
    onClearIcons() {
      this.$store.commit('updateItem', { key: 'icon', val: false })
      this.$store.commit('updateItem', { key: 'toggleicon', val: false })
    },
    
    onKeyupEnter(event) {
      event.target.blur()
    }
  },

}
</script>
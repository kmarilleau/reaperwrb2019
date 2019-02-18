<template>
  <div class="app-editor pure-form">

      <div class="app-editor-menus">
        <app-main-menu class="app-editor-panel" />
        <app-add-menu class="app-editor-panel" />
        <app-save-menu class="app-editor-panel" />
        <app-delete-menu class="app-editor-panel" />
      </div>

      <div class="app-editor-section">
        <!-- EDITOR COLORS -->
        <div class="app-editor-panel"
          :class="{ blur: this.$store.state.editor.help } "
        >

          <template
            v-if="this.$store.getters.showEditorGlobalColumns"
          >
            <label>Global Grid Columns</label>
            <app-item-width-slider
              v-model="globalColumns"
              :min="4" 
              :max="10" 
              :width="400" :piecewise="true"
            />
          </template>

          <template
            v-if="!this.$store.getters.isEditorModeDelete"
          >

            <div class="app-editor-menu"
              v-if="this.$store.getters.hasEditItem"
            >

              <app-editor-button icon="edit-delete" class="pure-button-warning app-editor-button-delete-item"
                :label="'Delete ' + this.$store.getters.editItemKey('type', 'Item')"
                @click.native.stop="onDeleteItem"
              />

            </div>

            <app-text-color-picker 
              v-if="this.$store.getters.editItemHasKey('textcolor') || this.$store.getters.isEditorBulkEdit" 
              :color="itemTextcolor" 
            />

            <app-item-color-picker 
              v-if="this.$store.getters.editItemHasKey('bgcolor') || this.$store.getters.isEditorBulkEdit" 
              :color="itemBgcolor" 
            />

          </template>
        </div>

        <!-- EDITOR OPTIONS PANEL -->
        <div class="app-editor-panel" 
          v-if="this.$store.getters.hasEditItem && !this.$store.getters.isEditorBulkEdit && !this.$store.getters.isEditorModeDelete"
          :class="{ blur: this.$store.state.editor.help }"
        >

          <template
            v-if="!this.$store.getters.editItemType('tab')"
          >
            <label>Item Width</label>
            <app-item-width-slider
              v-model="itemWidth"
              :min="itemMinWidth" 
              :max="itemMaxWidth" 
              :width="400" :piecewise="true"
              />
          </template>

          <!-- ACTION -->
          <app-editor-input-action />

          <!-- LABEL -->
          <template 
            v-if="this.$store.getters.editItemHasKey('label')"
          >
            <label>Label</label>
            <input type="text" name="item-label" id="item-label" v-model="itemLabel" maxlength="30" autofocus @keyup.enter="onKeyupEnter($event)">
          </template>

          <!-- LABEL POS -->
          <div class="app-editor-sub-panel">
            
            <template 
              v-if="this.$store.getters.editItemHasKey('toggle')"
            >
              <div>
                <label>Toggle</label>
                <input type="checkbox" name="item-toggle" class="app-editor-checkbox" v-model="itemToggle">
              </div>
            </template>

            <template 
              v-if="this.$store.getters.editItemKey('icon', false) && this.$store.getters.editItemHasKey('labelpos')"
            >
              <div>
                <label>Label Position</label>
                <select v-model="itemLabelPos">
                  <option value="0">bottom</option>
                  <option value="1">top</option>
                </select>
              </div>
              
            </template>

          </div>

          <!-- DESCRIPTION -->
          <template 
            v-if="this.$store.getters.editItemHasKey('desc') && this.$store.getters.editItemKey('desc', false) !== false"
          >
            <label>Action Description</label>
            <div class="app-item-desc">
              <div>{{itemDesc}}</div>
            </div>
          </template>
          
        </div>

        <div class="app-editor-panel app-editor-menu app-editor-bulk-menu" 
          v-if="this.$store.getters.showEditorBulkEditButtons"
          :class="{ blur: this.$store.state.editor.help }"
        >

          <app-editor-button label="Clear Icon(s)" icon="minus-circle-filled" class="pure-button-secondary"
            @click.native="onBulkClearIcons"
          />

          <app-editor-button label="Delete Selected" icon="edit-delete" class="pure-button-warning"
            @click.native="onBulkDeleteItems"
          />

        </div>
      
      </div>

      <div class="app-editor-section">

        <!-- EDITOR ICON -->
        <div class="app-editor-panel"
          :class="{ 
            hidden: !this.$store.getters.editItemType('action') || this.$store.getters.isEditorModeDelete,
            blur: this.$store.state.editor.help 
          }"
        >
          <template>
            <div class="app-item-icon-preview-container">
              <div class="app-item-icon-preview">
                <label>Icon: {{itemIcon}}</label>
                <div class="app-item-icon-preview-menu">
                  <div class="app-item-icon" :style="{ backgroundColor: itemBgcolor, color: itemTextcolor }">
                    <svgicon :icon="itemIcon" width="50%" height="50%"></svgicon>
                  </div>
                  <button title="delete icons" class="pure-button app-item-icon pure-button-warning"
                    @click.stop="onClearIcons()" 
                  >
                    <svgicon icon="edit-delete" width="50%" height="50%"></svgicon>
                  </button>
                </div>
                <app-icon-picker :toggle="false" />
              </div>
            </div>
          </template>
        </div>

        <div class="app-editor-panel"
          :class="{ 
            hidden : !itemToggle || this.$store.getters.isEditorModeDelete,
            blur: this.$store.state.editor.help 
          }"
        >
          <template>
            <div class="app-item-icon-preview-container">
              <div class="app-item-icon-preview">
                <label>Toggle Icon: {{itemToggleIcon}}</label>
                <div class="app-item-icon"
                  v-if="itemToggle" 
                  :style="{ backgroundColor: itemBgcolor, color: itemTextcolor }"
                >
                  <svgicon :icon="itemToggleIcon" width="50%" height="50%"></svgicon>
                </div>
                <app-icon-picker :toggle="true" />
              </div>
            </div>
          </template>
        </div>
      </div>
  </div>
</template>

<script>
import BaseEditorItemColorPicker from '@/components/BaseEditorItemColorPicker.vue'
import BaseEditorButton from '@/components/BaseEditorButton.vue'
import TheEditorTextColorPicker from '@/components/TheEditorTextColorPicker.vue'
import BaseEditorIconPicker from '@/components/BaseEditorIconPicker.vue'
import TheMainMenu from '@/components/TheEditorMainMenu.vue'
import TheAddMenu from '@/components/TheEditorAddMenu.vue'
import TheDeleteMenu from '@/components/TheEditorDeleteMenu.vue'
import TheSaveMenu from '@/components/TheEditorSaveMenu.vue'
import VueSlider from 'vue-slider-component'
import TheEditorInputAction from '@/components/TheEditorInputAction.vue'

export default {
  props: ['item', 'editor', 'reaper'],

  components: {
    'app-item-color-picker': BaseEditorItemColorPicker,
    'app-text-color-picker': TheEditorTextColorPicker,
    'app-icon-picker': BaseEditorIconPicker,
    'app-main-menu': TheMainMenu,
    'app-add-menu': TheAddMenu,
    'app-delete-menu': TheDeleteMenu,
    'app-save-menu': TheSaveMenu,
    'app-item-width-slider': VueSlider,
    'app-editor-input-action': TheEditorInputAction,
    'app-editor-button': BaseEditorButton
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

  computed: {

    itemTextcolor() {
      return this.$store.getters.editItemKey('textcolor', '#222222')
    },

    itemBgcolor() {
      return this.$store.getters.editItemKey('bgcolor', '#222222')
    },

    itemWidth: {
      get() {
        return this.$store.getters.editItemKey('width', 1)
      },
      set(value) {
        if(this.$store.getters.editItemHasKey('width'))
          this.$store.commit('updateItem', { key: 'width', val: value })
      }
    },

    itemMinWidth() {
      return this.$store.getters.editItemKey('minwidth', 1)
    },

    itemMaxWidth() {
      return parseInt(this.$store.getters.globalColumns)
    },
    
    itemLabel: {
      get() {
        return this.$store.getters.editItemKey('label', '')
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'label', val: value })
      }
    },

    itemLabelPos: {
      get() {
        return this.$store.getters.editItemKey('labelpos', 0)
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'labelpos', val: value })
      }
    },

    itemDesc() {
      return this.$store.getters.editItemKey('desc', '')
    },

    itemToggle: {
      get() {
        return this.$store.getters.editItemKey('toggle', false)
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'toggle', val: value })
      }
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

    globalColumns: {
      get() {
        return this.$store.getters.globalColumns
      },
      set(value) {
        this.$store.commit('setGlobalColumns', value)
      }
    },

    execActions: {
      get() {
        return this.editor.exec_actions
      },
      set(value) {
        this.editor.exec_actions = value
        this.$store.commit('getCmdStates')
      }
    },
    
  },

  methods: {
    onClearIcons() {
      this.$store.commit('updateItem', { key: 'icon', val: false })
      this.$store.commit('updateItem', { key: 'toggleicon', val: false })
    },
    onBulkClearIcons(event) {
      this.$store.commit('updateItems', { key: 'icon', val: false })
      this.$store.commit('updateItems', { key: 'toggleicon', val: false })
    },
    onDeleteItem(event) {
      this.$store.dispatch('onDeleteItem')
    },
    onBulkDeleteItems(event) {
      this.$store.commit('showBulkDeleteDialog')
    },
    onKeyupEnter(event) {
      event.target.blur()
    }
  }
};
</script>

<style scoped>
</style>
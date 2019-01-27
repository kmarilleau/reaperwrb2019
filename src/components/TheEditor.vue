<template>
  <div class="app-editor pure-form">

      <app-main-menu class="app-editor-panel" />
      <app-add-menu class="app-editor-panel" />
      <app-save-menu class="app-editor-panel" />
      <app-delete-menu class="app-editor-panel" />

      <!-- EDITOR COLORS -->
      <div class="app-editor-panel">

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
            <button title="delete item" class="pure-button pure-button-warning app-editor-button app-editor-delete-item-button"
              @click.stop="onDeleteItem()"
            >
              <font-awesome-icon icon="trash" />
            </button>
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
        <template 
          v-if="this.$store.getters.editItemHasKey('action')"
        >
          <label>Action</label>
          <input type="text" name="item-action" v-model="itemAction">
        </template>

        <!-- LABEL -->
        <template 
          v-if="this.$store.getters.editItemHasKey('label')"
        >
          <label>Label</label>
          <input type="text" name="item-label" v-model="itemLabel" maxlength="30" autofocus>
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
          <input class="app-item-desc" name="item-desc" :value="itemDesc">
        </template>
        
      </div>

      <div class="app-editor-panel app-editor-menu app-editor-bulk-menu" 
        v-if="this.$store.getters.showEditorBulkEditButtons"
      >
        <button title="remove icons" class="pure-button pure-button-secondary app-editor-button"
          @click="onBulkClearIcons()" 
        >
          <font-awesome-icon icon="eraser" />
        </button>

        <button title="delete" class="pure-button pure-button-warning app-editor-button"
          @click="onBulkDeleteItems()" 
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>

      <!-- EDITOR ICON -->
      <div class="app-editor-panel"
        :class="{ 'hidden' : !this.$store.getters.editItemType('action') || this.$store.getters.isEditorModeDelete }"
        >
        <template>
          <div class="app-item-icon-preview-container">
            <div class="app-item-icon-preview">
              <label>Icon</label>
              <div class="app-item-icon-preview-menu">
                <div class="app-item-icon" :style="{ backgroundColor: itemBgcolor }">
                  <font-awesome-icon :style="{color: itemTextcolor }" :icon="itemIcon" size="4x" />
                </div>
                <button title="delete icons" class="pure-button app-item-icon pure-button-warning"
                  @click.stop="onClearIcons()" 
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
              <app-icon-picker :toggle="false" />
            </div>
          </div>
        </template>
      </div>

      <div class="app-editor-panel"
        :class="{ 'hidden' : !itemToggle || this.$store.getters.isEditorModeDelete }"
      >
        <template>
          <div class="app-item-icon-preview-container">
            <div class="app-item-icon-preview">
              <label>Toggle Icon</label>
              <div class="app-item-icon"
                v-if="itemToggle" 
                :style="{ backgroundColor: itemBgcolor }"
              >
                <font-awesome-icon :style="{color: itemTextcolor }" :icon="itemToggleIcon" size="4x" />
              </div>
              <app-icon-picker :toggle="true" />
            </div>
          </div>
        </template>
      </div>
  </div>
</template>

<script>
import BaseEditorItemColorPicker from '@/components/BaseEditorItemColorPicker.vue'
import TheEditorTextColorPicker from '@/components/TheEditorTextColorPicker.vue'
import BaseEditorIconPicker from '@/components/BaseEditorIconPicker.vue'
import TheMainMenu from '@/components/TheEditorMainMenu.vue'
import TheAddMenu from '@/components/TheEditorAddMenu.vue'
import TheDeleteMenu from '@/components/TheEditorDeleteMenu.vue'
import TheSaveMenu from '@/components/TheEditorSaveMenu.vue'
import BaseItemAction from '@/components/BaseItemAction.vue'
import VueSlider from 'vue-slider-component'

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
    'app-item-action': BaseItemAction,
    'app-item-width-slider': VueSlider
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

    itemAction: {
      get() {
        return this.$store.getters.editItemKey('action', '')
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'action', val: value })
      }
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
  }
};
</script>

<style scoped>
</style>
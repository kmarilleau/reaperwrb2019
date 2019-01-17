<template>
  <div class="app-editor pure-form">

    <!-- <div class="app-editor-panel app-reaper-status">
      <template v-if="!reaper.ready">
        <img src="/reaperwrb/icons/icon-reaper-offline-32x32.png" />
        <span>OFFLINE</span>
      </template>
      <template v-if="reaper.ready">
        <img src="/reaperwrb/icons/icon-reaper-online-32x32.png" />
        <span>ONLINE</span>
      </template>
    </div> -->

      <!-- EDITOR MAIN FUNCTIONS -->
        <!-- <label>
          <input type="checkbox" name="execActions" v-model="execActions">
          Execute Actions
        </label> -->

      <app-main-menu class="app-editor-panel" />
      <app-add-menu class="app-editor-panel" />
      <app-save-menu class="app-editor-panel" />
      <app-delete-menu class="app-editor-panel" />


      <!-- EDITOR COLORS -->
      <div class="app-editor-panel">

        <template
          v-if="this.$store.getters.hasTabs && this.$store.getters.isEditorModeMain"
        >
          <label>Global Grid Columns</label>
          <app-item-width-slider
            v-model="$store.state.webremote.columns"
            :min="4" 
            :max="10" 
            :width="400" :piecewise="true" />
        </template>

        <app-text-color-picker 
          v-if="typeof(item.textcolor) !== 'undefined' || this.$store.state.editor.bulk_edit" 
          :color="typeof(item.textcolor) !== 'undefined' ? item.textcolor : '#222222'" 
        />
        <app-item-color-picker 
          v-if="typeof(item.bgcolor) !== 'undefined' || this.$store.state.editor.bulk_edit" 
          :color="this.$store.state.editor.edit_item.bgcolor" 
        />
      </div>

      <!-- EDITOR OPTIONS PANEL -->
      <div class="app-editor-panel" v-if="showOptionsPanel && !editor.bulk_edit">

        <template
          v-if="item.type !== 'tab'"
        >
          <label>Item Width {{ item.width }}</label>
          <app-item-width-slider
            v-model="item.width"
            :min="item.minwidth === undefined ? 1 : item.minwidth" 
            :max="parseInt(this.$store.state.columns)" 
            :width="400" :piecewise="true"
            />
        </template>

        <template v-if="item.type === 'action'">
          <label>Action</label>
          <input type="text" name="item-action" v-model="item.action">
        </template>

        <template v-if="item.type === 'action' || item.type === 'tab'">
          <label>Label</label>
          <input type="text" name="item-label" v-model="item.label" maxlength="30" autofocus>
        </template>

        <template v-if="item.type === 'action'">
          <label>Label Position</label>
          <select v-model="item.labelpos">
            <option value="0">bottom</option>
            <option value="1">top</option>
          </select>
        </template>

        <template v-if="item.type === 'action'">
          <label>Action Description</label>
          <input class="app-item-desc" name="item-desc" :value="item.desc ? item.desc : 'none'">
        </template>

        <template v-if="item.type === 'action'">
          <input type="checkbox" name="item-toggle" class="app-editor-checkbox" v-model="item.toggle">
          Toggle
        </template>
        
      </div>

      <div class="app-editor-panel app-editor-menu" 
        v-if="this.$store.getters.showEditorBulkEditButtons"
      >
        <button @click="onBulkClearIcons()" class="pure-button pure-button-secondary"><font-awesome-icon icon="eraser" /> Clear Icons</button>
        <button @click="onBulkDeleteItems()" class="pure-button pure-button-warning"><font-awesome-icon icon="trash" /> Delete</button>
      </div>

      <!-- EDITOR ICON -->
      <div class="app-editor-panel"
        :class="{ 'hidden' : item.type !== 'action' }"
        >
        <template>
          <button @click.stop="onClearIcons(item)" class="pure-button app-editor-icon-delete">
            <font-awesome-icon icon="trash" />
          </button>
          <div class="app-item-icon-preview">
            <label>Icon</label>
            <div class="app-item-icon" :style="{ backgroundColor: item.bgcolor }">
              <font-awesome-icon :style="{color: item.textcolor }" :icon="item.icon ? item.icon : 'question'" size="4x" />
            </div>
            
            <app-icon-picker :toggle="false" />
          </div>
        </template>
      </div>

      <div class="app-editor-panel"
        :class="{ 'hidden' : item.toggle !== true }"
      >
        <template>
          <div class="app-item-icon-preview">
            <label>Toggle Icon</label>
            <div class="app-item-icon"
              v-if="item.toggle" 
              :style="{ backgroundColor: item.bgcolor }"
            >
              <font-awesome-icon :style="{color: item.textcolor }" :icon="item.toggleicon ? item.toggleicon : item.icon" size="4x" />
            </div>
            <app-icon-picker :toggle="true" />
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
  props: ['item', 'columns', 'editor', 'reaper'],

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
  },

  computed: {

    execActions: {
      get() {
        return this.editor.exec_actions
      },
      set(value) {
        this.editor.exec_actions = value
        this.$store.commit('getCmdStates')
      }
    },
    
    showOptionsPanel() {
      // FIXME custom getter
      if(this.$store.getters.hasTabs && ( 
        this.$store.state.editor.edit_item.label ||
        this.$store.state.editor.edit_item.desc ||
        this.$store.state.editor.edit_item.action ||
        this.$store.state.editor.edit_item.width
      )) {
          return true
        } else {
          return false
        }
    }
  },

  methods: {

    onClearIcons(event) {
      this.$store.commit('updateItem', { key: 'icon', val: false })
      this.$store.commit('updateItem', { key: 'toggleicon', val: false })
    },

    onBulkClearIcons(event) {
      this.$store.commit('updateItems', { key: 'icon', val: false })
      this.$store.commit('updateItems', { key: 'toggleicon', val: false })
    },

    onBulkDeleteItems(event) {
      this.$store.commit('showBulkDeleteDialog')
    },

    onSetColumns(event) {
      this.$store.commit('setColumns')
    },

    getIcon(event) {
      return this.item.icon
    },
 
  }
};
</script>

<style scoped>
</style>
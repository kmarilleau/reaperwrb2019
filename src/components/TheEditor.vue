<template>
  <div class="app-editor pure-form">

      <!-- EDITOR MAIN FUNCTIONS -->
      <div class="app-editor-panel">

        <label>ReaperWRB {{ this.$store.state.version }} 
          <span class="app-reaper-status">
            <template v-if="this.$store.state.reaper.ready === false">
              <font-awesome-icon class="app-reaper-not-ready" icon="exclamation-circle"/> Reaper Not Ready
            </template>
            <template v-if="this.$store.state.reaper.ready === true">
              <font-awesome-icon class="app-reaper-ready" icon="check-circle" /> Reaper Ready
            </template>
         </span>
        </label>

        <template>
          <template v-if="this.$store.state.tabs.length === 0">
            <button class="pure-button" @click="onNew">
              <font-awesome-icon icon="file" />
            </button>
            <button class="pure-button" @click="onLoadExample">
              <font-awesome-icon icon="folder-open" /> Example
            </button>
            <button class="pure-button" @click="onTriggerLoadHTML">
              <font-awesome-icon icon="folder-open" /> HTML
            </button>
            <input @change="onLoadFile($event, 'html')" type="file" id="app-file-input-html" name="files" class="hidden" accept=".html">
          </template>
          
          <button class="pure-button" @click="onTriggerLoadToolbar">
            <font-awesome-icon icon="folder-open" />Toolbar(s)
          </button>
          <input @change="onLoadFile($event, 'txt')" type="file" id="app-file-input-toolbar" name="files" class="hidden" accept=".txt" multiple>
        </template>
        
        <template v-if="this.$store.state.tabs.length > 0">
          <button class="pure-button" @click="onToggleBulkEdit($event)"
            :class="{ 'pure-button-secondary': this.$store.state.editor.bulk_edit }"
          >Bulk Edit</button>
          <button class="pure-button" @click="onClearEditor">Clear</button>
          <button class="pure-button pure-button-primary" @click="onSave">Save</button>
        </template>

      </div>

      <div class="app-editor-panel"
        v-if="this.$store.state.tabs.length > 0"
      >
        <label>Grid Columns</label>
        <app-item-width-slider
          v-model="$store.state.columns"
          :min="4" 
          :max="10" 
          :width="400" :piecewise="true" />
      </div>

      <!-- EDITOR COLORS -->
      <div class="app-editor-panel">
        <app-text-color-picker 
          v-if="typeof(item.type) !== 'undefined' || this.$store.state.editor.bulk_edit" 
          :color="typeof(item.textcolor) !== 'undefined' ? item.textcolor : '#222222'" 
        />
        <app-item-color-picker 
          v-if="typeof(item.type) !== 'undefined' || this.$store.state.editor.bulk_edit" 
          :color="typeof(item.bgcolor) !== 'undefined' ? item.bgcolor : '#ffff00'" 
        />
        <template v-if="this.$store.state.editor.bulk_edit">
          <button @click="onBulkClearIcons()" class="pure-button pure-button-secondary"><font-awesome-icon icon="eraser" /> Delete Icons</button>
          <button @click="onBulkDeleteItems()" class="pure-button pure-button-warning"><font-awesome-icon icon="trash" /> Delete</button>
        </template>
      </div>

      <!-- EDITOR OPTIONS PANEL -->
      <div class="app-editor-panel" v-if="showOptionsPanel && !editor.bulk_edit">

        <template v-if="item.type === 'action'">
          <label>Action</label>
          <input type="text" v-model="item.action">
        </template>

        <template v-if="item.type === 'action' || item.type === 'tab'">
          <label>Label</label>
          <input type="text" v-model="item.label" maxlength="30" autofocus>
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
          <input class="app-item-desc" :value="item.desc ? item.desc : 'none'">
        </template>

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
          <label>Toggle</label>
          <input type="checkbox" class="app-editor-checkbox" v-model="item.toggle">
        </template>
        
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
    <app-item-add-menu />
    <app-delete-dialog />
  </div>
</template>

<script>
import BaseEditorItemColorPicker from '@/components/BaseEditorItemColorPicker.vue'
import TheEditorTextColorPicker from '@/components/TheEditorTextColorPicker.vue'
import BaseEditorIconPicker from '@/components/BaseEditorIconPicker.vue'
import TheItemAddMenu from '@/components/TheItemAddMenu.vue'
import TheDeleteDialog from '@/components/TheDeleteDialog.vue'
import BaseItemAction from '@/components/BaseItemAction.vue'
import VueSlider from 'vue-slider-component'
import defaults from '@/defaults'
import fa4shims from '@/fa4shims'
import exampleJSON from '@/example'

export default {
  props: ['item', 'columns', 'editor'],

  components: {
    'app-item-color-picker': BaseEditorItemColorPicker,
    'app-text-color-picker': TheEditorTextColorPicker,
    'app-icon-picker': BaseEditorIconPicker,
    'app-item-add-menu': TheItemAddMenu,
    'app-delete-dialog': TheDeleteDialog,
    'app-item-action': BaseItemAction,
    'app-item-width-slider': VueSlider
  },

  computed: {
    
    showOptionsPanel() {
      if(this.$store.state.tabs.length > 0 && ( 
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

    onNew(event) {
      this.$store.commit('new')
    },

    onLoadExample(event) {
      // FIXME replace with new example
      this.$store.commit('import', this.fixJSON(exampleJSON))
    },

    onTriggerLoadToolbar(event) {
      document.getElementById('app-file-input-toolbar').click();
    },

    onTriggerLoadHTML(event) {
      document.getElementById('app-file-input-html').click();
    },

    async onLoadFile(event, type) {
      // FIXME handle failed files
      const filesFailed = []
      const files = event.target.files

      let tabs = []

      for (let i = 0; i < files.length; i++) {
        const text = await this.readFileAsText(files[i])
        let tab = []

        // load toolbar
        if (type === 'txt') {
          tab = this.parseToolbar(text, files[i].name)
          // FIXME handle failed files
          if (tab.rows.length > 0)
            tabs.push(tab)
          else 
            failedFiles.push(e.target.files[i])

          this.$store.commit('switchTab', this.$store.state.tabs.length)
          
        // load html file
        } else if (type === 'html' && i === 0) {
          tabs = this.parseHTML(text)
        }
      }
      this.$store.commit('import', tabs)
      event.target.value = ''
    },


    // FIXME pre load item defaults
    parseToolbar(text, filename) {
      const items = text
        .split("\n")
        .filter(line => line.startsWith('item'))
        .filter(line => !line.match('-1'))
        .map(line => {
          const r = line.split('=')[1].split(/ (.+)/)
          let item = defaults.action
          item.action = r[0]
          item.desc = r[1].replace(/ /g, ' ')
          item.label =
            item.desc.length > 20
              ? item.desc.substr(0, 20).replace(/_/g, ' ') + '[...]'
              : item.desc
          return item
        })

      const tab = defaults.tab
      tab.label = filename.replace(/\.ReaperMenu|\.txt/g, '')

      while (items.length) {
        tab.rows.push(items.splice(0, 6))
      }

      return tab
    },

    parseHTML(text) {
      let tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = text;
      const div = tmp.getElementById('reaperwrb-json');
      if (div) {
        const json = JSON.parse(div.innerHTML);
        if (typeof(json.version) !== 'undefined') {
          return json.tabs
        } else {
          return this.fixJSON(json.tabs)
        }
      } else {
        console.log("ERROR: Couldn't load HTML")
        return []
      }
    },

    readFileAsText(file) {
      const fileReader = new FileReader();

      return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
          fileReader.abort()
          reject(fileReader.error)
        };

        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.readAsText(file)
      })
    },

    onClearEditor(event) {
      this.$store.commit('clear')
    },

    onToggleBulkEdit(event) {
      this.$store.commit('clearEditHighlight')
      this.$store.commit('toggleBulkEdit')
    },

    onSave(event) {
      this.$store.commit('save')
    },

    onSetColumns(event) {
      this.$store.commit('setColumns')
    },

    getIcon(event) {
      return this.item.icon
    },

    fixJSON(tabs) {
      // fontawesome 4 shims
      
      return tabs.map((tab) => {
          // FIXME use defaults
          return {
            bgcolor: tab.bgcolor,
            textcolor: tab.textcolor,
            label: tab.label,
            type: 'tab',
            rows: tab.rows.map((row) => {
              return row.map((item) => {

                if(item.icon) {
                  const icon = ['fa', item.icon.replace('fa-', '')]
                  item.icon = icon

                  fa4shims.map((shim) => {
                    // does the icon name match a shim
                    if(icon[1] === shim[0]) {
                    // does it get a new name
                    if(shim[2] !== null)
                      item.icon[1] = shim[2]
                    // does it get a different prefix
                    if(shim[1] !== null)
                      item.icon[0] = shim[1]
                    } 
                  })
                }

                if(item.type === 'action') {
                  item.toggleicon = false
                  item.labelpos = 0
                  item.state = -1

                  if(item.wide)
                    item.width = 2
                }

                return item
              })
            })
          }
        })
    }
  }
};
</script>

<style scoped>
</style>
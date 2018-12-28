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
          <label>Item Width</label>
          <app-item-width-slider
            v-model="item.width"
            :min="item.minwidth === undefined ? 1 : item.minwidth" 
            :max="parseInt(this.$store.state.columns)" 
            :width="400" :piecewise="true" />
        </template>

        <template v-if="item.type === 'action'">
          <label>Toggle</label>
          <input type="checkbox" class="app-editor-checkbox" v-model="item.toggle">
        </template>
        
      </div>

      <!-- EDITOR ICON -->
      <div class="app-editor-panel"
        :class="classIconPicker()"
        >
        <template>
          <button @click.stop="onClearIcons(item)" class="pure-button app-editor-icon-delete">
            <font-awesome-icon icon="trash" />
          </button>
          <div class="app-item-icon-preview">
            <label>Icon</label>
            <div class="app-item-icon" :style="{ backgroundColor: item.bgcolor }">
              <font-awesome-icon :style="{color: item.textcolor }" :icon="item.icon" size="4x" />
            </div>
            
            <app-icon-picker :toggle="false" />
          </div>
        </template>
      </div>

      <div class="app-editor-panel"
        :class="classToggleIconPicker()"
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
    classIconPicker(event) {
      if (typeof(this.item.icon) === 'undefined' )
        return 'hidden'
    },

    classToggleIconPicker(event) {
      if (this.item.toggle !== true)
        return 'hidden'
    },

    onClearIcons(event) {
      this.$store.commit('updateItem', { key: 'icon', val: false })
      this.$store.commit('updateItem', { key: 'toggleicon', val: false })
    },

    onNew(event) {
      this.$store.commit('new')
    },

    onLoadExample(event) {
      // FIXME replace with new example
      const tabs = [
        {
          label: "Main",
          bgcolor: "#42a5f5",
          rows: [
            [
              {
                action: "40295",
                desc: "View: Zoom out project",
                label: "zoom out project",
                bgcolor: "#515151",
                icon: "fa-arrows-alt",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40340",
                desc: "Track: Unsolo all tracks",
                label: "unsolo all tracks",
                bgcolor: "#ffa000",
                icon: "fa-hard-of-hearing",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40339",
                desc: "Track: Unmute all tracks",
                label: "unmute all tracks",
                bgcolor: "#d81b60",
                icon: "fa-hard-of-hearing",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "40076",
                desc: "Record: Set record mode to time selection auto-punch",
                label: "auto-punch",
                bgcolor: "#e53935",
                icon: "fa-microphone",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40252",
                desc: "Record: Set record mode to normal",
                label: "normal",
                bgcolor: "#e53935",
                icon: "fa-microphone",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40491",
                desc: "Track: Unarm all tracks for recording",
                label: "unarm all tracks",
                bgcolor: "#e53935",
                icon: "fa-close",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "40364",
                desc: "Options: Toggle metronome",
                label: "toggle metronome",
                bgcolor: "#515151",
                icon: "fa-clock-o",
                type: "action",
                toggle: true,
                textcolor: "#ffffff"
              },
              {
                action: "41819",
                desc: "Preroll: toggle preroll on record",
                label: "toggle preroll on record",
                bgcolor: "#e53935",
                icon: "fa-random",
                type: "action",
                toggle: true,
                textcolor: "#ffffff"
              },
              {
                action: "41818",
                desc: "Preroll: toggle preroll on play",
                label: "toggle preroll on play",
                bgcolor: "#8bc34a",
                icon: "fa-random",
                type: "action",
                toggle: true,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "_S&M_WNTGL5",
                desc:
                  "SWS/S&M: Toggle show all floating FX for selected tracks",
                label: "show floating FX for tracks",
                bgcolor: "#2196f3",
                icon: "fa-window-restore",
                type: "action",
                toggle: true,
                textcolor: "#ffffff"
              },
              {
                action: "41882",
                desc: "View: Show monitoring FX chain",
                label: "monitoring FX chain",
                bgcolor: "#7cb342",
                icon: "fa-headphones",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "41885",
                desc: "Grid: Toggle framerate grid",
                label: "framerate grid",
                bgcolor: "#1e88e5",
                icon: "fa-film",
                type: "action",
                toggle: true,
                textcolor: "#ffffff"
              },
              {
                action: "40357",
                desc: "Track: Set to custom color...",
                label: "track color",
                bgcolor: "#424242",
                icon: "fa-paint-brush",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40704",
                desc: "Item: Set to custom color...",
                label: "item color",
                bgcolor: "#424242",
                icon: "fa-paint-brush",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ]
          ],
          type: "tab",
          index: 0,
          html: { 0: { jQuery1124003391947464681455: 1084 }, length: 1 },
          textcolor: "#ffffff"
        },
        {
          label: "Envelopes",
          bgcolor: "#7e57c2",
          sortIDs: [
            "#tab-1-sortable-0",
            "#tab-1-sortable-1",
            "#tab-1-sortable-2",
            "#tab-1-sortable-3"
          ],
          rows: [
            [
              {
                action: "41142",
                desc:
                  "FX: Show/hide track envelope for last touched FX parameter",
                label: "last touched FX parameter",
                bgcolor: "#7e57c2",
                icon: "fa-area-chart",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "41576",
                desc:
                  "Options: Envelope point selection follows time selection",
                label: "follow time selection",
                bgcolor: "#9575cd",
                icon: "fa-chain",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40648",
                desc: "Options: Add edge points when moving envelope points",
                label: "add edge points when moving",
                bgcolor: "#9575cd",
                icon: "fa-plus",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "40089",
                desc: "Envelope: Delete all points in time selection",
                label: "delete all points in time selection",
                bgcolor: "#c2185b",
                icon: "fa-trash-o",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40887",
                desc: "Envelope: Reduce number of points...",
                label: "reduce number of points",
                bgcolor: "#c2185b",
                icon: "fa-minus",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40065",
                desc: "Envelope: Clear envelope",
                label: "clear envelope",
                bgcolor: "#c2185b",
                icon: "fa-trash-o",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "40189",
                desc: "Envelope: Set shape of selected points to linear",
                label: "linear",
                bgcolor: "#8d6e63",
                icon: "fa-check",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40190",
                desc: "Envelope: Set shape of selected points to square",
                label: "square",
                bgcolor: "#8d6e63",
                icon: "fa-check",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40683",
                desc: "Envelope: Set shape of selected points to Bezier",
                label: "Bezier",
                bgcolor: "#8d6e63",
                icon: "fa-check",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "40428",
                desc: "Envelope: Set shape of selected points to fast start",
                label: "fast start",
                bgcolor: "#8d6e63",
                icon: "fa-check",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40429",
                desc: "Envelope: Set shape of selected points to fast end",
                label: "fast end",
                bgcolor: "#8d6e63",
                icon: "fa-check",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ]
          ],
          type: "tab",
          index: 3,
          html: { 0: { jQuery1124003391947464681455: 1083 }, length: 1 },
          textcolor: "#ffffff"
        },
        {
          label: "Automation",
          bgcolor: "#9ccc65",
          sortIDs: [
            "#tab-2-sortable-0",
            "#tab-2-sortable-1",
            "#tab-2-sortable-2"
          ],
          rows: [
            [
              {
                action: "42024",
                desc:
                  "Automation: Set all tracks automation mode to latch preview",
                label: "mode latch preview",
                bgcolor: "#8bc34a",
                icon: "fa-product-hunt",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40266",
                desc: "Automation: Set all tracks automation mode to latch",
                label: "mode latch",
                bgcolor: "#8bc34a",
                icon: "fa-mail-forward",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40090",
                desc: "Automation: Set all tracks automation mode to write",
                label: "mode write",
                bgcolor: "#8bc34a",
                icon: "fa-pencil",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "40086",
                desc: "Automation: Set all tracks automation mode to read",
                label: "automation mode read",
                bgcolor: "#8bc34a",
                icon: "fa-eye",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40087",
                desc: "Automation: Set all tracks automation mode to touch",
                label: "automation mode touch",
                bgcolor: "#8bc34a",
                icon: "fa-hand-pointer-o",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "40088",
                desc: "Automation: Set all tracks automation mode to trim/read",
                label: "automation mode trim/read",
                bgcolor: "#8bc34a",
                icon: "fa-sliders",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ],
            [
              {
                action: "42013",
                desc:
                  "Automation: Write current values for actively-writing envelopes to time selection",
                label: "write to time selection",
                bgcolor: "#e91e63",
                icon: "fa-save",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "42014",
                desc:
                  "Automation: Write current values for actively-writing envelopes from cursor to start of project",
                label: "write from cursor to start of project",
                bgcolor: "#e91e63",
                icon: "fa-arrow-left",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              },
              {
                action: "42015",
                desc:
                  "Automation: Write current values for actively-writing envelopes from cursor to end of project",
                label: "write from cursor to end of project",
                bgcolor: "#e91e63",
                icon: "fa-arrow-right",
                type: "action",
                toggle: false,
                textcolor: "#ffffff"
              }
            ]
          ],
          type: "tab",
          index: 2,
          html: { 0: { jQuery1124003391947464681455: 1081 }, length: 1 },
          textcolor: "#ffffff"
        }
      ];

      this.$store.commit('import', this.fixJSON(tabs))
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
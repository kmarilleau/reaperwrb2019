<template>
  <div class="app-editor">

      <!-- EDITOR MAIN FUNCTIONS -->
      <div class="app-editor-panel">

        <label>ReaperWRB {{ this.$store.state.version }} </label>

        <template v-if="this.$store.state.tabs.length === 0">
          <button @click="onNew">New</button>
          <button @click="onLoadExample">Load Example</button>
          <button @click="onTriggerLoadHTML">Load HTML</button>
          <input @change="onLoadFile($event, 'html')" type="file" id="app-file-input-html" name="files" class="hidden" accept=".html" />
        </template>

        <button @click="onTriggerLoadToolbar">Load Toolbar(s)</button>
        <input @change="onLoadFile($event, 'txt')" type="file" id="app-file-input-toolbar" name="files" class="hidden" accept=".txt" multiple />
        
        <template v-if="this.$store.state.tabs.length > 0">
          <button @click="onClearEditor">Clear Editor</button>
          <button @click="onSave">Save</button>
        </template>

        <template v-if="this.$store.state.tabs.length > 0 && this.$store.state.tabs[this.$store.state.active_tab].rows.length > 0">
          <button @click="onToggleBulkEdit">Bulk Edit</button>
        </template>

        <button class="app-reaper-status-offline" 
          v-if="this.$store.state.reaper.ready === false"
          @click="onDisableEditor()"
        >
          <font-awesome-icon icon="exclamation-circle" size="2x" />
        </button>

      </div>

      <div class="app-editor-panel">
        <label>Options</label>
        <select 
          v-model="options.columns.desktop"
        >
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        Columns (Desktop)

        <select v-model="options.columns.tablet">
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        Columns (Tablet)

        <select v-model="options.columns.mobile">
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        Columns (Mobile)
        
      </div>

      <!-- EDITOR COLORS -->
      <div class="app-editor-panel">
        <template>

          <template v-if="typeof(item.type) !== 'undefined'">
            <label>Text Color</label>
            <app-text-color-picker :color="item.textcolor" />
          </template>

          <template v-if="typeof(item.type) !== 'undefined'">
            <label>Background Color</label>
            <app-item-color-picker :color="item.bgcolor" />
          </template>

        </template>
      </div>
      <!-- EDITOR OPTIONS PANEL -->
      <div class="app-editor-panel"
        v-if="showOptionsPanel"
      >
        <template v-if="item.type === 'action'">
          <label>Action </label>
          <input type="text"
            @input="onEditAction"
            :value="item.action"
          >
        </template>

        <template v-if="item.type === 'action' || item.type === 'tab'">
          <label>Label</label>
          <input type="text"
            @input="onEditLabel" 
            :value="item.label"
          autofocus>
        </template>

        <template v-if="item.type === 'action' && item.desc !== ''">
          <label>Info</label>
          <div class="app-item-desc">
            {{item.desc}}
          </div>
        </template>

        <template>
          <label>Width</label>
          <app-item-width-slider v-model="item.width" :min="item.minwidth ? item.minwidth : 1" :max="this.$store.state.options.columns.desktop" :width="400" :piecewise="true" />
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
          <div class="app-item-action-preview">
            <label>Preview Icon</label>
            <button @click.stop="onClearIcons(item)" class="app-editor-icon-delete"><font-awesome-icon icon="trash" size="1x" /></button>
            <div class="app-item app-item-action" :style="{ backgroundColor: item.bgcolor }">
              <app-item-action :item="item" />
            </div>
            <app-icon-picker :toggle="false" />
          </div>
        </template>
      </div>

      <div class="app-editor-panel"
        :class="classToggleIconPicker()"
      >
        <template>
          <div class="app-item-action-preview">
            <label>Preview Toggle</label>
            <div class="app-item app-item-action" :style="{ backgroundColor: item.bgcolor }">
              <app-item-action-toggle :item="item" />
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
import BaseItemActionToggle from '@/components/BaseItemActionToggle.vue'
import VueSlider from 'vue-slider-component'

export default {
  props: ['item', 'options'],

  components: {
    'app-item-color-picker': BaseEditorItemColorPicker,
    'app-text-color-picker': TheEditorTextColorPicker,
    'app-icon-picker': BaseEditorIconPicker,
    'app-item-add-menu': TheItemAddMenu,
    'app-delete-dialog': TheDeleteDialog,
    'app-item-action': BaseItemAction,
    'app-item-action-toggle': BaseItemActionToggle,
    'app-item-width-slider': VueSlider
  },
  computed: {
    showOptionsPanel: function() {
      if(this.$store.state.tabs.length > 0 && ( 
        this.$store.state.edit_item.label ||
        this.$store.state.edit_item.desc ||
        this.$store.state.edit_item.action ||
        this.$store.state.edit_item.width
      )) {
          return true
        } else {
          return false
        }
    }
  },

  methods: {
    classIconPicker: function(event) {
      if (typeof(this.item.icon) === 'undefined' )
        return 'hidden'
    },

    classToggleIconPicker: function(event) {
      if (this.item.toggle !== true)
        return 'hidden'
    },
    
    onEditLabel: function(event) {
      this.$store.commit('update_item', { key: 'label', val: event.target.value })
    },

    onEditAction: function(event) {
      this.$store.commit('update_item', { key: 'action', val: event.target.value })
    },

    onEditWidth: function(event) {
      // console.log(event.target.value)
    },

    onEditToggle: function(event) {
      //this.$store.commit('update_item', { key: 'toggle', val: event.target.checked })
    },

    onClearIcons: function(event) {
      this.$store.commit('update_item', { key: 'icon', val: null })
      this.$store.commit('update_item', { key: 'toggleicon', val: null })
    },

    onNew: function(event) {
      this.$store.commit('new')
    },

    onLoadExample: function(event) {
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

    onDisableEditor: function(event) {
      this.$store.commit('enable_editor', false)
    },

    onTriggerLoadToolbar: function(event) {
      // FIXME ?
      document.getElementById('app-file-input-toolbar').click();
    },

    onTriggerLoadHTML: function(event) {
      // FIXME ?
      document.getElementById('app-file-input-html').click();
    },

    onLoadFile: async function(event, type) {
      // FIXME handle failed files
      const filesFailed = [];
      const files = event.target.files;

      let tabs = [];

      for (let i = 0; i < files.length; i++) {
        const text = await this.readFileAsText(files[i]);
        let tab = [];

        // load toolbar
        if (type === 'txt') {
          tab = this.parseToolbar(text, files[i].name);
          // FIXME handle failed files
          if (tab.rows.length > 0) tabs.push(tab);
          else failedFiles.push(e.target.files[i]);
          
        // load html file
        } else if (type === 'html' && i === 0) {
          tabs = this.parseHTML(text);
        }
      }
      this.$store.commit('import', tabs)
      event.target.value = '';
    },

    parseToolbar: function(text, filename) {
      const items = text
        .split("\n")
        .filter(line => line.startsWith('item'))
        .filter(line => !line.match('-1'))
        .map(line => {
          const r = line.split('=')[1].split(/ (.+)/)
          // FIXME use object?
          let item = {}
          item.type = 'action'
          item.action = r[0]
          item.desc = r[1].replace(/ /g, ' ')
          item.label =
            item.desc.length > 20
              ? item.desc.substr(0, 20) + '[...]'
              : item.desc;
          item.bgcolor = '#424242'
          item.textcolor = '#f0f0f0'
          item.toggle = false
          item.icon = false
          item.toggleicon = false
          return item
        })

      // FIXME use tab object?
      const tab = {
        label: filename.replace('.ReaperMenu', ''),
        bgcolor: '#424242',
        textcolor: '#f0f0f0',
        type: 'tab',
        rows: []
      };

      while (items.length) {
        tab.rows.push(items.splice(0, 6));
      }

      return tab;
    },

    parseHTML: function(text) {
      let tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = text;
      const div = tmp.getElementById('reaperwrb-json');
      if (div) {
        const json = JSON.parse(div.innerHTML);
        if (typeof json.tabs !== 'undefined') {
          return this.fixJSON(json.tabs)
        } else {
          // FIXME handle new format
          return json
        }
      } else {
        // FIXME handle error
        return [];
      }
    },

    readFileAsText: function(file) {
      const fileReader = new FileReader();

      return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
          fileReader.abort();
          reject(fileReader.error);
        };

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.readAsText(file);
      });
    },

    onClearEditor: function(event) {
      this.$store.commit('clear')
    },

    onToggleBulkEdit: function(event) {
      this.$store.commit('toggle_bulk_edit')
    },

    onSave: function(event) {
      this.$store.commit('save_html')
    },

    onSetColumns: function(event) {
      console.log(event)
      this.$store.commit('set_columns')
    },

    fixJSON: function(tabs) {
      // fontawesome 4 shims
      const fa4shims =[["glass",null,"glass-martini"],["meetup","fab",null],["star-o","far","star"],["remove",null,"times"],["close",null,"times"],["gear",null,"cog"],["trash-o","far","trash-alt"],["file-o","far","file"],["clock-o","far","clock"],["arrow-circle-o-down","far","arrow-alt-circle-down"],["arrow-circle-o-up","far","arrow-alt-circle-up"],["play-circle-o","far","play-circle"],["repeat",null,"redo"],["rotate-right",null,"redo"],["refresh",null,"sync"],["list-alt","far",null],["dedent",null,"outdent"],["video-camera",null,"video"],["picture-o","far","image"],["photo","far","image"],["image","far","image"],["pencil",null,"pencil-alt"],["map-marker",null,"map-marker-alt"],["pencil-square-o","far","edit"],["share-square-o","far","share-square"],["check-square-o","far","check-square"],["arrows",null,"arrows-alt"],["times-circle-o","far","times-circle"],["check-circle-o","far","check-circle"],["mail-forward",null,"share"],["eye","far",null],["eye-slash","far",null],["warning",null,"exclamation-triangle"],["calendar",null,"calendar-alt"],["arrows-v",null,"arrows-alt-v"],["arrows-h",null,"arrows-alt-h"],["bar-chart","far","chart-bar"],["bar-chart-o","far","chart-bar"],["twitter-square","fab",null],["facebook-square","fab",null],["gears",null,"cogs"],["thumbs-o-up","far","thumbs-up"],["thumbs-o-down","far","thumbs-down"],["heart-o","far","heart"],["sign-out",null,"sign-out-alt"],["linkedin-square","fab","linkedin"],["thumb-tack",null,"thumbtack"],["external-link",null,"external-link-alt"],["sign-in",null,"sign-in-alt"],["github-square","fab",null],["lemon-o","far","lemon"],["square-o","far","square"],["bookmark-o","far","bookmark"],["twitter","fab",null],["facebook","fab","facebook-f"],["facebook-f","fab","facebook-f"],["github","fab",null],["credit-card","far",null],["feed",null,"rss"],["hdd-o","far","hdd"],["hand-o-right","far","hand-point-right"],["hand-o-left","far","hand-point-left"],["hand-o-up","far","hand-point-up"],["hand-o-down","far","hand-point-down"],["arrows-alt",null,"expand-arrows-alt"],["group",null,"users"],["chain",null,"link"],["scissors",null,"cut"],["files-o","far","copy"],["floppy-o","far","save"],["navicon",null,"bars"],["reorder",null,"bars"],["pinterest","fab",null],["pinterest-square","fab",null],["google-plus-square","fab",null],["google-plus","fab","google-plus-g"],["money","far","money-bill-alt"],["unsorted",null,"sort"],["sort-desc",null,"sort-down"],["sort-asc",null,"sort-up"],["linkedin","fab","linkedin-in"],["rotate-left",null,"undo"],["legal",null,"gavel"],["tachometer",null,"tachometer-alt"],["dashboard",null,"tachometer-alt"],["comment-o","far","comment"],["comments-o","far","comments"],["flash",null,"bolt"],["clipboard","far",null],["paste","far","clipboard"],["lightbulb-o","far","lightbulb"],["exchange",null,"exchange-alt"],["cloud-download",null,"cloud-download-alt"],["cloud-upload",null,"cloud-upload-alt"],["bell-o","far","bell"],["cutlery",null,"utensils"],["file-text-o","far","file-alt"],["building-o","far","building"],["hospital-o","far","hospital"],["tablet",null,"tablet-alt"],["mobile",null,"mobile-alt"],["mobile-phone",null,"mobile-alt"],["circle-o","far","circle"],["mail-reply",null,"reply"],["github-alt","fab",null],["folder-o","far","folder"],["folder-open-o","far","folder-open"],["smile-o","far","smile"],["frown-o","far","frown"],["meh-o","far","meh"],["keyboard-o","far","keyboard"],["flag-o","far","flag"],["mail-reply-all",null,"reply-all"],["star-half-o","far","star-half"],["star-half-empty","far","star-half"],["star-half-full","far","star-half"],["code-fork",null,"code-branch"],["chain-broken",null,"unlink"],["shield",null,"shield-alt"],["calendar-o","far","calendar"],["maxcdn","fab",null],["html5","fab",null],["css3","fab",null],["ticket",null,"ticket-alt"],["minus-square-o","far","minus-square"],["level-up",null,"level-up-alt"],["level-down",null,"level-down-alt"],["pencil-square",null,"pen-square"],["external-link-square",null,"external-link-square-alt"],["compass","far",null],["caret-square-o-down","far","caret-square-down"],["toggle-down","far","caret-square-down"],["caret-square-o-up","far","caret-square-up"],["toggle-up","far","caret-square-up"],["caret-square-o-right","far","caret-square-right"],["toggle-right","far","caret-square-right"],["eur",null,"euro-sign"],["euro",null,"euro-sign"],["gbp",null,"pound-sign"],["usd",null,"dollar-sign"],["dollar",null,"dollar-sign"],["inr",null,"rupee-sign"],["rupee",null,"rupee-sign"],["jpy",null,"yen-sign"],["cny",null,"yen-sign"],["rmb",null,"yen-sign"],["yen",null,"yen-sign"],["rub",null,"ruble-sign"],["ruble",null,"ruble-sign"],["rouble",null,"ruble-sign"],["krw",null,"won-sign"],["won",null,"won-sign"],["btc","fab",null],["bitcoin","fab","btc"],["file-text",null,"file-alt"],["sort-alpha-asc",null,"sort-alpha-down"],["sort-alpha-desc",null,"sort-alpha-up"],["sort-amount-asc",null,"sort-amount-down"],["sort-amount-desc",null,"sort-amount-up"],["sort-numeric-asc",null,"sort-numeric-down"],["sort-numeric-desc",null,"sort-numeric-up"],["youtube-square","fab",null],["youtube","fab",null],["xing","fab",null],["xing-square","fab",null],["youtube-play","fab","youtube"],["dropbox","fab",null],["stack-overflow","fab",null],["instagram","fab",null],["flickr","fab",null],["adn","fab",null],["bitbucket","fab",null],["bitbucket-square","fab","bitbucket"],["tumblr","fab",null],["tumblr-square","fab",null],["long-arrow-down",null,"long-arrow-alt-down"],["long-arrow-up",null,"long-arrow-alt-up"],["long-arrow-left",null,"long-arrow-alt-left"],["long-arrow-right",null,"long-arrow-alt-right"],["apple","fab",null],["windows","fab",null],["android","fab",null],["linux","fab",null],["dribbble","fab",null],["skype","fab",null],["foursquare","fab",null],["trello","fab",null],["gratipay","fab",null],["gittip","fab","gratipay"],["sun-o","far","sun"],["moon-o","far","moon"],["vk","fab",null],["weibo","fab",null],["renren","fab",null],["pagelines","fab",null],["stack-exchange","fab",null],["arrow-circle-o-right","far","arrow-alt-circle-right"],["arrow-circle-o-left","far","arrow-alt-circle-left"],["caret-square-o-left","far","caret-square-left"],["toggle-left","far","caret-square-left"],["dot-circle-o","far","dot-circle"],["vimeo-square","fab",null],["try",null,"lira-sign"],["turkish-lira",null,"lira-sign"],["plus-square-o","far","plus-square"],["slack","fab",null],["wordpress","fab",null],["openid","fab",null],["institution",null,"university"],["bank",null,"university"],["mortar-board",null,"graduation-cap"],["yahoo","fab",null],["google","fab",null],["reddit","fab",null],["reddit-square","fab",null],["stumbleupon-circle","fab",null],["stumbleupon","fab",null],["delicious","fab",null],["digg","fab",null],["pied-piper-pp","fab",null],["pied-piper-alt","fab",null],["drupal","fab",null],["joomla","fab",null],["spoon",null,"utensil-spoon"],["behance","fab",null],["behance-square","fab",null],["steam","fab",null],["steam-square","fab",null],["automobile",null,"car"],["cab",null,"taxi"],["envelope-o","far","envelope"],["deviantart","fab",null],["soundcloud","fab",null],["file-pdf-o","far","file-pdf"],["file-word-o","far","file-word"],["file-excel-o","far","file-excel"],["file-powerpoint-o","far","file-powerpoint"],["file-image-o","far","file-image"],["file-photo-o","far","file-image"],["file-picture-o","far","file-image"],["file-archive-o","far","file-archive"],["file-zip-o","far","file-archive"],["file-audio-o","far","file-audio"],["file-sound-o","far","file-audio"],["file-video-o","far","file-video"],["file-movie-o","far","file-video"],["file-code-o","far","file-code"],["vine","fab",null],["codepen","fab",null],["jsfiddle","fab",null],["life-ring","far",null],["life-bouy","far","life-ring"],["life-buoy","far","life-ring"],["life-saver","far","life-ring"],["support","far","life-ring"],["circle-o-notch",null,"circle-notch"],["rebel","fab",null],["ra","fab","rebel"],["resistance","fab","rebel"],["empire","fab",null],["ge","fab","empire"],["git-square","fab",null],["git","fab",null],["hacker-news","fab",null],["y-combinator-square","fab","hacker-news"],["yc-square","fab","hacker-news"],["tencent-weibo","fab",null],["qq","fab",null],["weixin","fab",null],["wechat","fab","weixin"],["send",null,"paper-plane"],["paper-plane-o","far","paper-plane"],["send-o","far","paper-plane"],["circle-thin","far","circle"],["header",null,"heading"],["sliders",null,"sliders-h"],["futbol-o","far","futbol"],["soccer-ball-o","far","futbol"],["slideshare","fab",null],["twitch","fab",null],["yelp","fab",null],["newspaper-o","far","newspaper"],["paypal","fab",null],["google-wallet","fab",null],["cc-visa","fab",null],["cc-mastercard","fab",null],["cc-discover","fab",null],["cc-amex","fab",null],["cc-paypal","fab",null],["cc-stripe","fab",null],["bell-slash-o","far","bell-slash"],["trash",null,"trash-alt"],["copyright","far",null],["eyedropper",null,"eye-dropper"],["area-chart",null,"chart-area"],["pie-chart",null,"chart-pie"],["line-chart",null,"chart-line"],["lastfm","fab",null],["lastfm-square","fab",null],["ioxhost","fab",null],["angellist","fab",null],["cc","far","closed-captioning"],["ils",null,"shekel-sign"],["shekel",null,"shekel-sign"],["sheqel",null,"shekel-sign"],["meanpath","fab","font-awesome"],["buysellads","fab",null],["connectdevelop","fab",null],["dashcube","fab",null],["forumbee","fab",null],["leanpub","fab",null],["sellsy","fab",null],["shirtsinbulk","fab",null],["simplybuilt","fab",null],["skyatlas","fab",null],["diamond","far","gem"],["intersex",null,"transgender"],["facebook-official","fab","facebook"],["pinterest-p","fab",null],["whatsapp","fab",null],["hotel",null,"bed"],["viacoin","fab",null],["medium","fab",null],["y-combinator","fab",null],["yc","fab","y-combinator"],["optin-monster","fab",null],["opencart","fab",null],["expeditedssl","fab",null],["battery-4",null,"battery-full"],["battery",null,"battery-full"],["battery-3",null,"battery-three-quarters"],["battery-2",null,"battery-half"],["battery-1",null,"battery-quarter"],["battery-0",null,"battery-empty"],["object-group","far",null],["object-ungroup","far",null],["sticky-note-o","far","sticky-note"],["cc-jcb","fab",null],["cc-diners-club","fab",null],["clone","far",null],["hourglass-o","far","hourglass"],["hourglass-1",null,"hourglass-start"],["hourglass-2",null,"hourglass-half"],["hourglass-3",null,"hourglass-end"],["hand-rock-o","far","hand-rock"],["hand-grab-o","far","hand-rock"],["hand-paper-o","far","hand-paper"],["hand-stop-o","far","hand-paper"],["hand-scissors-o","far","hand-scissors"],["hand-lizard-o","far","hand-lizard"],["hand-spock-o","far","hand-spock"],["hand-pointer-o","far","hand-pointer"],["hand-peace-o","far","hand-peace"],["registered","far",null],["creative-commons","fab",null],["gg","fab",null],["gg-circle","fab",null],["tripadvisor","fab",null],["odnoklassniki","fab",null],["odnoklassniki-square","fab",null],["get-pocket","fab",null],["wikipedia-w","fab",null],["safari","fab",null],["chrome","fab",null],["firefox","fab",null],["opera","fab",null],["internet-explorer","fab",null],["television",null,"tv"],["contao","fab",null],["500px","fab",null],["amazon","fab",null],["calendar-plus-o","far","calendar-plus"],["calendar-minus-o","far","calendar-minus"],["calendar-times-o","far","calendar-times"],["calendar-check-o","far","calendar-check"],["map-o","far","map"],["commenting","far","comment-dots"],["commenting-o","far","comment-dots"],["houzz","fab",null],["vimeo","fab","vimeo-v"],["black-tie","fab",null],["fonticons","fab",null],["reddit-alien","fab",null],["edge","fab",null],["credit-card-alt",null,"credit-card"],["codiepie","fab",null],["modx","fab",null],["fort-awesome","fab",null],["usb","fab",null],["product-hunt","fab",null],["mixcloud","fab",null],["scribd","fab",null],["pause-circle-o","far","pause-circle"],["stop-circle-o","far","stop-circle"],["bluetooth","fab",null],["bluetooth-b","fab",null],["gitlab","fab",null],["wpbeginner","fab",null],["wpforms","fab",null],["envira","fab",null],["wheelchair-alt","fab","accessible-icon"],["question-circle-o","far","question-circle"],["volume-control-phone",null,"phone-volume"],["asl-interpreting",null,"american-sign-language-interpreting"],["deafness",null,"deaf"],["hard-of-hearing",null,"deaf"],["glide","fab",null],["glide-g","fab",null],["signing",null,"sign-language"],["viadeo","fab",null],["viadeo-square","fab",null],["snapchat","fab",null],["snapchat-ghost","fab",null],["snapchat-square","fab",null],["pied-piper","fab",null],["first-order","fab",null],["yoast","fab",null],["themeisle","fab",null],["google-plus-official","fab","google-plus"],["google-plus-circle","fab","google-plus"],["font-awesome","fab",null],["fa","fab","font-awesome"],["handshake-o","far","handshake"],["envelope-open-o","far","envelope-open"],["linode","fab",null],["address-book-o","far","address-book"],["vcard",null,"address-card"],["address-card-o","far","address-card"],["vcard-o","far","address-card"],["user-circle-o","far","user-circle"],["user-o","far","user"],["id-badge","far",null],["drivers-license",null,"id-card"],["id-card-o","far","id-card"],["drivers-license-o","far","id-card"],["quora","fab",null],["free-code-camp","fab",null],["telegram","fab",null],["thermometer-4",null,"thermometer-full"],["thermometer",null,"thermometer-full"],["thermometer-3",null,"thermometer-three-quarters"],["thermometer-2",null,"thermometer-half"],["thermometer-1",null,"thermometer-quarter"],["thermometer-0",null,"thermometer-empty"],["bathtub",null,"bath"],["s15",null,"bath"],["window-maximize","far",null],["window-restore","far",null],["times-rectangle",null,"window-close"],["window-close-o","far","window-close"],["times-rectangle-o","far","window-close"],["bandcamp","fab",null],["grav","fab",null],["etsy","fab",null],["imdb","fab",null],["ravelry","fab",null],["eercast","fab","sellcast"],["snowflake-o","far","snowflake"],["superpowers","fab",null],["wpexplorer","fab",null],["spotify","fab",null]]
      
      return tabs.map((tab) => {
          return {
            bgcolor: tab.bgcolor,
            textcolor: tab.textcolor,
            label: tab.label,
            type: 'tab',
            rows: tab.rows.map((row) => {
              return row.map((item) => {

                if(item.icon) {
                  // Attempt to fix icon names
                  let icon = item.icon.replace('fa-', '')
                  let shimmed = false

                  fa4shims.map((shim) => {
                    if(icon === shim[0]) {
                      if(shim[1] !== null) {
                        shimmed = true
                        item.icon = [shim[1], shim[2]]
                      } else {
                        item.icon = ['fas', shim[2]]
                        shimmed = true
                      }
                    }
                  })

                  if(!shimmed) {
                    item.icon = ['fas', icon]
                  }
                }

                if(item.type === 'action') {
                  item.toggleicon = false
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
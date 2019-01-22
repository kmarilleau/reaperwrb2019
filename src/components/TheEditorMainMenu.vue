<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeMain"
  >
    <div class="app-editor-menu-home-button font-2x">
      <button title="home" class="pure-button pure-button-primary" 
        @click="onHome()">
        <font-awesome-icon icon="home" />
      </button>
      <template v-if="!this.$store.getters.reaperReady">
        <div class="pure-button app-reaper-status app-reaper-status-offline">
          <font-awesome-icon icon="exclamation-circle" />
        </div>
      </template>
      <template v-if="this.$store.getters.reaperReady">
        <div class="pure-button app-reaper-status app-reaper-status-online">
          <font-awesome-icon icon="thumbs-up" />
        </div>
      </template>
    </div>

    <template v-if="this.$store.getters.hasNoTabs">
      <button title="new" class="pure-button app-editor-button app-editor-button-new" 
        @click="onNew"
      >
        <font-awesome-icon icon="file" />
      </button>

      <button title="load example" class="pure-button app-editor-button" 
        @click="onLoadExample"
      >
        <font-awesome-icon icon="file-alt" />
      </button>

      <button title="load html" class="pure-button app-editor-button app-editor-button-html"
        @click="onTriggerLoadHTML"
      >
        <font-awesome-icon icon="code" />
      </button>

      <input type="file" id="app-file-input-html" name="files" class="hidden" accept=".html"
        @change="onLoadFile($event, 'html')" 
      > 
    </template>
    
    <button title="open toolbar(s)" class="pure-button app-editor-button" 
      :class="{ 'app-editor-button-toolbar': this.$store.getters.hasNotTabs }"
      @click="onTriggerLoadToolbar"
    >
      <font-awesome-icon icon="folder-open" />
    </button>
    <input type="file" id="app-file-input-toolbar" name="files" class="hidden" accept=".txt"
      @change="onLoadFile($event, 'txt')" 
    multiple>
  
    <template v-if="this.$store.getters.hasTabs">

      <button title="send commands to Reaper" class="pure-button app-editor-button"
        v-if="this.$store.getters.reaperStatus"
        @click="onToggleExecActions($event)"
        :class="{ 'pure-button-secondary' : this.$store.state.editor.exec_actions }"
      >
        <font-awesome-icon icon="plug" />
      </button>

      <button title="toggle bulk edit" class="pure-button app-editor-button" 
        @click="onToggleBulkEdit($event)"
        :class="{ 'pure-button-secondary': this.$store.state.editor.bulk_edit }"
      >
        <font-awesome-icon icon="clone" />
      </button>

      <button title="clear editor" class="pure-button app-editor-button" 
        @click="onClearEditor"
      >
        <font-awesome-icon icon="sync-alt" />
      </button>

      <button class="pure-button pure-button-primary app-editor-button" 
        @click="onSave"
      >
        <font-awesome-icon icon="save" />
      </button>

    </template>

    <span></span>
  </div>
  
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import example from '@/example'
import fa4shims from '@/fa4shims'
import { defaults } from '@/reaperwrb'

export default {
  methods: {
    onHome(event) {
      this.$store.commit('unload')
      this.$store.commit('clear')
      this.$store.commit('setModeStartup')
    },

    onNew(event) {
      this.$store.commit('new')
    },

    onClearEditor(event) {
      this.$store.commit('clear')
    },

    onLoadExample(event) {
      const webremote = cloneDeep(example)
      this.$store.commit('import', webremote)
    },

    onToggleExecActions(event) {
      this.$store.commit('toggleExecActions')
    },

    onToggleBulkEdit(event) {
      this.$store.commit('clearEditHighlight')
      this.$store.commit('toggleBulkEdit')
    },

    onSave(event) {
      this.$store.commit('clearEditHighlight')
      this.$store.commit('clearEditItem')
      
      if(this.$store.state.editor.bulk_edit)
        this.$store.commit('toggleBulkEdit')

      this.$store.commit('setEditorModeSave')
    },

    onTriggerLoadToolbar(event) {
      this.$store.commit('clearEditHighlight')
      document.querySelector('#app-file-input-toolbar').click();
    },

    onTriggerLoadHTML(event) {
      document.querySelector('#app-file-input-html').click();
    },

    async onLoadFile(event, type) {
      // FIXME handle failed files
      const filesFailed = []
      const files = event.target.files

      console.log(files);

      let tabs = []

      for (let i = 0; i < files.length; i++) {
        const text = await this.readFileAsText(files[i])
        let tab = []

        // load toolbar
        if (type === 'txt') {
          tab = this.parseToolbar(text, files[i].name)
          // FIXME handle failed files
          if (tab)
            tabs.push(tab)
          else 
            filesFailed.push(files[i].name)

          //this.$store.commit('switchTab', this.$store.state.webremote.tabs.length)
          
        // load html file
        } else if (type === 'html' && i === 0) {
          tabs = this.parseHTML(text)
        }
      }
      this.$store.commit('import', tabs)
      event.target.value = ''
      // FIXME display failed files?
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

    // FIXME pre load item defaults
    parseToolbar(text, filename) {
      const items = text
        .split("\n")
        .filter(line => line.startsWith('item'))
        .filter(line => !line.match('-1'))
        .map(line => {
          const r = line.split('=')[1].split(/ (.+)/)
          let item = JSON.parse(JSON.stringify(defaults.action))
          item.action = r[0]
          item.desc = r[1].replace(/ /g, ' ')
          item.label =
            item.desc.length > 20
              ? item.desc.substr(0, 20).replace(/_/g, ' ') + '[...]'
              : item.desc
          return item
        })

      const tab = JSON.parse(JSON.stringify(defaults.tab))
      tab.label = filename.replace(/\.ReaperMenu|\.txt/g, '')

      if(items.length > 0) {
        while (items.length) {
          tab.rows.push(items.splice(0, 6))
        }
        return tab
      } else {
        console.log("REAPERWRB ERROR: File \"%s\" didn't contain any items!", filename)
        return false
      }
    },

    fixJSON(tabs) {
      console.log("FIX JSON")

      // import tabs
      let result = tabs.map(tab => {
        const newTab = cloneDeep(defaults.tab)
        Object.keys(tab).forEach(key => {
          if(key in newTab)
            newTab[key] = tab[key]
        })
        return newTab
      })

      // fix items
      result = tabs.map(tab => {
        tab.rows = tab.rows.map(row => {
          return row.map(item => {
            
            const newItem = cloneDeep(defaults[item.type])
            
            // import existing keys
            Object.keys(item).forEach(key => {
              // convert old wide items
              if(key === 'wide' && item[key]) {
                newItem.width = 2

              // fix icons
              } else if (key === 'icon') {
                if(item.icon && typeof(item.icon) === 'string') {
                  const icon = ['fa', item.icon.replace('fa-', '')]
                  item.icon = icon

                  // fontawesome 4 shims
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
                newItem.icon = item.icon
              
              // import other existing keys
              } else if (key in newItem) {
                newItem[key] = item[key]
              } 
            })

            return newItem
          })
        })
        return tab
      })

      return result

      // tabs.map((tab) => {
      //     // FIXME use defaults
      //     const newTab = cloneDeep(defaults.tab)
      //     console.log(tab)
      //     for(key in tab) {
      //       console.log(tab)
      //     }

      //     console.log(newTab.rows)

      //     return false
      //     return {
      //       bgcolor: tab.bgcolor,
      //       textcolor: tab.textcolor,
      //       label: tab.label,
      //       type: 'tab',
      //       rows: tab.rows.map((row) => {
      //         return row.map((item) => {

      //           if(item.icon) {
      //             const icon = ['fa', item.icon.replace('fa-', '')]
      //             item.icon = icon

      //             // fontawesome 4 shims
      //             fa4shims.map((shim) => {
      //               // does the icon name match a shim
      //               if(icon[1] === shim[0]) {
      //               // does it get a new name
      //               if(shim[2] !== null)
      //                 item.icon[1] = shim[2]
      //               // does it get a different prefix
      //               if(shim[1] !== null)
      //                 item.icon[0] = shim[1]
      //               } 
      //             })
      //           }

      //           if(item.type === 'action') {
      //             item.toggleicon = false
      //             item.labelpos = 0
      //             item.state = -1

      //             if(item.wide)
      //               item.width = 2
      //           }

      //           return item
      //         })
      //       })
      //     }
      //   })
    }
  }
}
</script>

<style>
</style>
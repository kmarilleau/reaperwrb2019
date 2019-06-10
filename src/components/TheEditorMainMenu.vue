<template>
  <div class="app-editor-menu"
    v-if="isEditorModeMain"
  >

    <app-editor-button label="Home" icon="home" @click.native="onHome" class="pure-button-primary" />

    <template v-if="hasNoTabs">

      <app-editor-button label="Blank" icon="file-empty" @click.native="onNew" />
      <app-editor-button label="Template" icon="file-text" @click.native="onLoadExample" />
      <app-editor-button label="HTML" icon="code" @click.native="onTriggerLoadHTML" />

      <input type="file" id="app-file-input-html" name="files" class="hidden" accept=".html"
        @change="onLoadFile($event, 'html')" 
      > 
    </template>
    
    <app-editor-button label="Toolbar" icon="folder-open" @click.native="onTriggerLoadToolbar" />
    <input type="file" id="app-file-input-toolbar" name="files" class="hidden" accept=".txt, .reaperMenu, .ReaperMenu"
      @change="onLoadFile($event, 'txt')" 
      multiple
    >
  
    <template v-if="hasTabs">

      <app-editor-button label="Connect" icon="power-cord"
        v-if="reaperReady"
        @click.native="onToggleExecActions($event)"
        :class="{ 'pure-button-secondary' : isEditorExecActions }"
      />

      <app-editor-button label="Bulk" icon="stack" @click.native="onToggleBulkEdit"
        :class="{ 'pure-button-secondary': isEditorBulkEdit }"
      />

      <app-editor-button label="Clear" icon="file-empty" @click.native="onClear" />
      <app-editor-button label="Save" icon="edit-save" class="pure-button-primary" @click.native="onSave" />

    </template>

    <app-editor-button label="Help" icon="question" @click.native="onHelp" 
      :class="{ 'pure-button-secondary': showHelp }"
    />

    <template
      v-if="hasEditItem"
    >
      <app-editor-button icon="edit-delete" 
        class="pure-button-warning"
        :label="'Delete ' + editItemKey('type', 'Item')"
        @click.native.stop="onItemDelete"
      />
    </template>
    

  </div>
  
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import example from '@/example'
import { defaults } from '@/reaperwrb'
import BaseEditorButton from '@/components/BaseEditorButton.vue'

export default {

  components: {
    'app-editor-button': BaseEditorButton
  },

  computed: {
    ...mapGetters([
      'isEditorModeMain',
      'hasNoTabs',
      'hasTabs',
      'reaperReady',
      'isEditorBulkEdit',
      'isEditorExecActions',
      'showHelp',
      'hasEditItem',
      'editItemKey'
    ])
  },

  methods: {

    ...mapMutations([
      'toggleHelp',
      'toggleExecActions'
    ]),

    ...mapActions([
      'onEditorHome',
      'onEditorNew',
      'onEditorClear',
      'onEditorLoadExample',
      'onEditorToggleBulkEdit',
      'onEditorItemDelete',
      'onEditorSave',
      'hideHelp',
      'clearEditHighlight'
    ]),

    onHome(event)   { this.onEditorHome() },
    onNew(event)    { this.onEditorNew() },
    onClear(event)  { this.onEditorClear() },
    onHelp(event)   { this.toggleHelp() },
    onSave(event)   { this.onEditorSave() },

    onLoadExample(event)        { this.onEditorLoadExample() },
    onToggleExecActions(event)  { this.toggleExecActions() },
    onToggleBulkEdit(event)     { this.onEditorToggleBulkEdit() },
    onItemDelete(event)         { this.onEditorItemDelete() },


    onTriggerLoadToolbar(event) {
      this.hideHelp()
      this.clearEditHighlight()
      document.querySelector('#app-file-input-toolbar').click();
    },

    onTriggerLoadHTML(event) {
      this.hideHelp()
      document.querySelector('#app-file-input-html').click();
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
        console.error("ERROR: Couldn't load HTML")
        return []
      }
    },

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
        console.error("REAPERWRB ERROR: File \"%s\" didn't contain any items!", filename)
        return false
      }
    },

    fixJSON(tabs) {
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
                  if(/^fa-/.test(item.icon))
                    newItem.icon = 'question'
                  else
                    newItem.icon = item.icon
                } else {
                  newItem.icon = 'question'
                }
              
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
    }
  }
}
</script>
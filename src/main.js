'use strict'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { saveAs } from 'file-saver/FileSaver'
import { stat } from 'fs'
import htmlTemplate from '@/htmlTemplate'
import { modes, editorModes, defaults } from '@/reaperwrb'
import example from '@/example'

import VueSVGIcon from 'vue-svgicon'
Vue.use(VueSVGIcon, {
  defaultWidth: '1vw',
  defaultHeight: '1vw'
})
import './icons/'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '2.0',
    mode: modes.STARTUP,
    reaper: {}, 
    editor: {},
    webremote: {},
    storage: {
      local_support: false,
      local: false,
      json: false
    }
  },

  getters: {
    reaperReady: (state, getters) => state.reaper.ready,
    version: (state, getters) => state.version,

    browser: (state, getters) => state.editor.browser,

    showLocalStorage: (state, getters) => state.storage.local_support && typeof(state.storage.local.webremotes) !== 'undefined',
    hasLocalStorage: (state, getters) => state.storage.local_support,
    getLocalStorageWebremotes: (state, getters) => state.storage.local.webremotes,
    getLocalStorageWebremoteByIndex: (state, getters) => (index) => state.storage.local.webremotes[index],
    
    getJSONStorageWebremotes: (state, getters) => state.storage.json.webremotes,
    getJSONStorageWebremoteByIndex: (state, getters) => (index) => state.storage.json.webremotes[index],

    isModeStartup: (state, getters) => state.mode === modes.STARTUP,
    isModeRemote: (state, getters) => state.mode === modes.REMOTE,
    isModeEditor: (state, getters) => state.mode === modes.EDITOR,

    isEditorEnabled: (state, getters) => state.editor.enabled,

    isEditorModeMain: (state, getters) => state.editor.mode === editorModes.MAIN,
    isEditorModeAdd: (state, getters) => state.editor.mode === editorModes.ADD,
    isEditorModeSave: (state, getters) => state.editor.mode === editorModes.SAVE,
    isEditorModeDelete: (state, getters) => state.editor.mode === editorModes.DELETE,
    isEditorBulkEdit: (state, getters) => state.editor.bulk_edit,
    isEditorExecActions: (state, getters) => state.editor.execAction,

    itemHeight: (state, getters) => state.webremote.itemHeight,
    itemWidth: (state, getters) => state.webremote.itemWidth,
    iconSize: (state, getters) => (getters.itemHeight / 3).toString(),

    showHelp: (state, getters) =>  state.editor.help,

    showEditorBulkEditButtons: (state, getters) => {
      return state.editor.bulk_edit 
        && state.editor.mode !== editorModes.DELETE
        && state.editor.data.bulk.length > 0
    },

    showEditorEditButtons: (state, getters) => getters.isModeEditor && !getters.isEditorModeSave && !getters.isEditorModeDelete,
    showEditorDeleteRowButton: (state, getters) => state.webremote.tabs[getters.activeTab].rows.length > 1,
    showEditorGlobalColumns: (state, getters) => getters.hasTabs && getters.isEditorModeMain,

    webremoteTitle: (state, getters) => state.webremote.title,

    isActiveTab: (state, getters) => (tab) => state.webremote.active_tab === tab,
    isTabEdit: (state, getters) => (tab) => { 
      return state.editor.data.item.obj.type === 'tab'
        && state.webremote.active_tab === tab
    },
    
    globalColumns: (state, getters) => state.webremote.columns,
    activeTab: (state, getters) => state.webremote.active_tab,
    activeRow: (state, getters) => state.editor.active_row,
    isActiveRow: (state, getters) => (row) => state.editor.active_row === row,
    tabs: (state, getters) => state.webremote.tabs,
    rows: (state, getters) => state.webremote.tabs[state.webremote.active_tab].rows,
    hasTabs: (state, getters) => state.webremote.tabs.length > 0,
    hasNoTabs: (state, getters) => state.webremote.tabs.length === 0,
    isLastTab: (state, getters) => (item) => item.type === 'tab' && state.webremote.tabs.length === 1,

    hasRows: (state, getters) => state.webremote.tabs[state.webremote.active_tab].rows.length > 0,
    
    hasMarkers: (state, getters) => state.reaper.markers.length > 0,
    getMarkers: (state, getters) => state.reaper.markers,
    
    hasRegions: (state, getters) => state.reaper.regions.length > 0,
    getRegions: (state, getters) => state.reaper.regions,
    
    transportOnline: (state, getters) => state.reaper.transport.online,
    transportPosString: (state, getters) => state.reaper.transport.position_string,
    transportPosBeats: (state, getters) => state.reaper.transport.position_string_beats,
    transportPosSec: (state, getters) => state.reaper.transport.position_seconds,
    
    hasMoveItem: (state, getters) => state.editor.data.move,
    hasEditItem: (state, getters) => state.editor.data.item.obj,
    isEditItem: (state, getters) => (payload) => {
      if(state.editor.data.item.row === payload.row
      && state.webremote.tabs[state.webremote.active_tab].rows[payload.row].length - 1 === payload.index) {
        let isItem = true
        Object.keys(payload.item).forEach(key => {
          if(payload.item[key] !== state.editor.data.item.obj[key])
            isItem = false
        })
        if(isItem)
          return true
      }
    },

    isEditTab: (state, getters) => (payload) => getters.editItemType('tab') && getters.activeTab === payload.index,

    editItemType: (state, getters) => (type) => state.editor.data.item.obj.type === type,
    editItemRow: (state, getters) => state.editor.data.item.row,
    editItemHasKey: (state, getters) => (key) => { 
      if(getters.hasEditItem)
        return key in state.editor.data.item.obj
      else
        return false
    },

    editItemKey: (state, getters) => (key, defaultValue) => {
      if(getters.editItemHasKey(key) && state.editor.data.item.obj[key])
        return state.editor.data.item.obj[key]
      else {
        return defaultValue
      }
    },

    deleteItemType: (state, getters) => state.editor.data.bin.obj.type,
    deleteCanKeepItems: (state, getters) => {
      
      switch(getters.deleteItemType) {
        case 'tab':
          return state.webremote.tabs.length > 1 ? true : false
          break
        case 'row':
          return state.webremote.tabs[getters.activeTab].rows[getters.activeRow].length > 0 ? true : false
          break
        default:
          return false
          break
      }
    },

    draggableClass: (state, getters) => {
      if(getters.isModeEditor && !getters.isEditorBulkEdit)
        return '.app-item'
      else
        return false
    },

    disableSort: (state, getters) => {
      if(getters.isModeEditor)
        return getters.isEditorBulkEdit ? true : false
      else
        return true
    },
  },

  actions: {
    
    onSwitchTab({ commit, state }, tab) {
      commit('clearEditHighlight')
      commit('switchTab', tab)
      commit('getCmdStates')
    },

    onItemAdd({ commit, state }, type) {
      commit('clearEditHighlight')
      commit('addItem', type)
    },

    onItemEdit({ commit, state }, payload) {
      commit('clearEditHighlight')
      commit('edit', payload)
    },

    onDeleteItem({ commit, state }) {
      commit('clearEditHighlight')
      commit('showDeleteDialog')
    },

    onDeleteRow({ commit, state }, payload) {
      commit('clearEditHighlight')
      if(state.webremote.tabs[state.webremote.active_tab].rows[payload.index].length === 0) {
        state.editor.data.bin = payload
        commit('delete')
      } else {
        commit('showRowDeleteDialog', payload)
      }
    },

    onDraggableStart({ commit, state }) {
      commit('clearEditHighlight')
      commit('clearEditItem')
    },

    onShowItemAddMenu({ commit, state }, row) {
      commit('clearEditHighlight')
      commit('clearEditItem')
      commit('switchRow', row)
      commit('setEditorModeAdd')
    },

    onLoadWebremotePreset: ( { commit, state }, payload ) => {
      let success = false
      state.storage[payload.type].webremotes.forEach((webremote, index) => {
        if(payload.title === webremote.title
        && payload.timestamp === webremote.timestamp) {
          commit('import', state.storage[payload.type].webremotes[index])
          commit('getCmdStates')
          commit('setModeRemote')
          success = true
        }
        commit('onWindowResize')
      })
      if(!success)
        console.log("REAPERWRB ERROR: Could not load %s storage.", payload.type)
    },
    
    onEditWebremotePreset: ({ commit, state }, payload ) => {
      let success = false
      state.storage[payload.type].webremotes.forEach((webremote, index) => {
        if(payload.title === webremote.title
          && payload.timestamp === webremote.timestamp) {
          commit('import', state.storage[payload.type].webremotes[index])
          commit('fadeInLoader')
          commit('getCmdStates')
          commit('setModeEditor')
          success = true
        }
      })
      if(!success)
        console.log("REAPERWRB ERROR: Could not load %s storage.", payload.type)
    },

  },

  mutations: {
    init: (state) => {
      
      state.reaper = cloneDeep(defaults.reaper)
      state.editor = cloneDeep(defaults.editor)
      state.webremote = cloneDeep(defaults.webremote)

      // Firefox 1.0+
      if(typeof InstallTrigger !== 'undefined')
        state.editor.browser = 'firefox'

      // Safari 3.0+ "[object HTMLElementConstructor]" 
      if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)))
        state.editor.browser = 'safari'

      // Internet Explorer 6-11
      if(/*@cc_on!@*/false || !!document.documentMode)
        state.editor.browser = 'internet-explorer'

      // Edge 20+
      if(typeof(isIE) !== 'undefined' && !isIE && !!window.StyleMedia)
        state.editor.browser = 'edge'

      // Chrome 1 - 71
      if(!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime))
        state.editor.browser = 'chrome'

      // check JSON storage
      if(typeof(jsonStorage) !== 'undefined') {
        console.log("REAPERWRB: Loading json storage.")
        state.storage.json = cloneDeep(jsonStorage)
      }

      // check local storage support
      if(typeof(Storage) !== 'undefined') {
        state.storage.local_support = true
        state.storage.local = cloneDeep(defaults.storage)
        console.log('REAPERWRB: Local storage support enabled.')
        if(localStorage.getItem('REAPERWRB')) {
          console.log('REAPERWRB: Loading local storage.')
          state.storage.local = JSON.parse(localStorage.getItem('REAPERWRB'))
        }
      } else {
        state.storage.local_support = false
        console.log('REAPERWRB ERROR: Browser does not support Local Storage. Please use a modern Browser!')
      }
    },

    setModeStartup: (state) => state.mode = modes.STARTUP,
    setModeRemote: (state) => state.mode = modes.REMOTE,
    setModeEditor: (state) => state.mode = modes.EDITOR,

    setEditorModeMain: (state) => state.editor.mode = editorModes.MAIN,
    setEditorModeAdd: (state) => state.editor.mode = editorModes.ADD,
    setEditorModeDelete: (state) => state.editor.mode = editorModes.DELETE,
    setEditorModeSave: (state) => state.editor.mode = editorModes.SAVE,

    onWindowResize: (state) => {

      console.log("ReaperWRB: Window Resize")

      if(screen.width < 1024)
        state.editor.enabled = false
      else
        state.editor.enabled = true

      if(state.mode === modes.EDITOR) {
        let editorView = document.querySelector('.app-view')
        Vue.set(state.webremote, 'columns', 8)
        Vue.set(state.webremote, 'itemWidth', editorView.clientWidth / 8)
        Vue.set(state.webremote, 'itemHeight', 120)
      } else {
        let view = document.querySelector('#app')
        if(view.clientWidth < 415) {
          Vue.set(state.webremote, 'columns', 4)
          Vue.set(state.webremote, 'itemWidth', view.clientWidth / 4)
        } else if (view.clientWidth > 415 && view.clientWidth < 813) {
          Vue.set(state.webremote, 'columns', 6)
          Vue.set(state.webremote, 'itemWidth', view.clientWidth / 6)
        } else if(view.clientWidth > 813 && view.clientWidth < 1440) {
          Vue.set(state.webremote, 'columns', 8)
          Vue.set(state.webremote, 'itemWidth', view.clientWidth / 8)
        } else {
          Vue.set(state.webremote, 'columns', 12)
          Vue.set(state.webremote, 'itemWidth', view.clientWidth / 12)
        }

        Vue.set(state.webremote, 'itemHeight', state.webremote.itemWidth)
      }
    },

    showHelp: (state) => state.editor.help = true,
    hideHelp: (state) => state.editor.help = false,
    toggleHelp: (state) => state.editor.help = state.editor.help ? false : true,

    clearEditHighlight: (state) => {
      if(state.mode === modes.EDITOR) {
        //FIXME use el in edit_item reference
        const el = document.querySelectorAll('.app-highlight-edit')
        for(let i = 0; i < el.length; i++) {
          el[i].classList.remove('app-highlight-edit')
        }
        const row = document.querySelector('.app-active-row')
        if(row)
          row.classList.remove('app-active-row')

      }
    },

    clearDropHighlight: (state) => {
      const el = document.querySelectorAll('.app-item-drop')
      if(el.length > 0) {
        for(let i = 0; i < el.length; i++)
          el[i].classList.remove('app-item-drop')
      }
    },

    setGlobalColumns: (state, columns) => {
      state.webremote.columns = columns
    },

    setWebremoteTitle: (state, title) => state.webremote.title = title,

    clearEditItem: (state) => state.editor.data.item = cloneDeep(defaults.editor.data.item),

    clearEditItems: (state) => state.editor.data.bulk = [],

    setReaperReady: (state, ready) => state.reaper.ready = ready,

    new: (state) => {
      const newWebremote = cloneDeep(defaults.webremote)
      const newTab = cloneDeep(defaults.tab)
      newTab.rows.push([])
      newWebremote.tabs.push(newTab)
      state.webremote = newWebremote
      state.editor.data.item.index = 0
      state.editor.data.item.obj = state.webremote.tabs[0]
      state.editor.help = false
    },

    unload: (state) => {
      console.log('REAPERWRB: Unloading webremote.')
      state.webremote = cloneDeep(defaults.webremote)
    },

    showSaveDialog: (state) => {
      state.editor.save_dialog = true
    },

    saveHTML: (state) => {
      console.log('REAPERWRB: Saving to HTML.')
      const webremote = cloneDeep(state.webremote)
      webremote.active_tab = 0
      const d = new Date()
      webremote.timestamp = d.getTime();
      const html = htmlTemplate.html(JSON.stringify(webremote)).replace(/\n|/g, '').replace(/>\s+</g, '><')
      const blob = new Blob([html], { type: "text/html;charset=utf-8" })
      saveAs(blob, webremote.title + '.html')
    },

    saveJSON: (state) => {
      console.log('REAPERWRB: Saving to JSON.')
      const webremote = cloneDeep(state.webremote)
      webremote.active_tab = 0
      const d = new Date()

      if(!state.storage.json)
        state.storage.json = cloneDeep(defaults.storage)

      if(typeof(webremote.timestamp) === 'undefined') {
        webremote.timestamp = d.getTime()
        state.storage.json.webremotes.push(webremote)
        console.log('REAPERWRB: Adding new JSON entry.')
      } else {
        
        let saved = false
        state.storage.json.webremotes.map((storageWebremote, index) => {
          if(storageWebremote.timestamp === webremote.timestamp) {
            console.log('REAPERWRB: Updating JSON entry.')
            state.storage.json.webremotes[index] = webremote
            saved = true
          }
        })
        
        // if we still haven't saved we're probably moving a existing webremote to json
        if(!saved) {
          console.log('REAPERWRB: Adding new JSON entry.')
          webremote.timestamp = d.getTime()
          state.storage.json.webremotes.push(webremote)
        }
      }
      const json = `const jsonStorage = ${JSON.stringify(state.storage.json)};`
      const blob = new Blob([json], { type: "application/json" })
      saveAs(blob, "webremote.js")
    },

    saveLocalStorage: (state) => {
      const d = new Date()
      if(state.storage.local_support) {
        console.log('REAPERWRB: Saving to local storage.')
        const webremote = cloneDeep(state.webremote)
        webremote.active_tab = 0

        if(typeof(webremote.timestamp) === 'undefined') {
          console.log('REAPERWRB: Adding new local entry.')
          webremote.timestamp = d.getTime()
          state.storage.local.webremotes.push(webremote)

        } else {

          let saved = false
          state.storage.local.webremotes.map((storageWebremote, index) => {
            if(storageWebremote.timestamp === webremote.timestamp) {
              console.log('REAPERWRB: Updateing local entry.')
              state.storage.local.webremotes[index] = webremote
              saved = true
            }
          })

          // if we still haven't saved we're probably saving html/json webremote to local storage
          if(!saved) {
            console.log('REAPERWRB: Adding new local entry.')
            webremote.timestamp = d.getTime()
            state.storage.local.webremotes.push(webremote)
          }
        }

        localStorage.setItem('REAPERWRB', JSON.stringify(state.storage.local))
      }
    },

    syncStorage: (state, payload) => {
      console.log('REAPERWRB: Syncing storage.')
      if(payload.type === 'local') {
        if(state.storage.local_support)
          localStorage.setItem('REAPERWRB', JSON.stringify(state.storage.local))
      }

      if(payload.type === 'json') {
        const json = `const jsonStorage = ${JSON.stringify(state.storage.json)};`
        const blob = new Blob([json], { type: "text/plain;charset=utf-8" })
        saveAs(blob, "webremote.js")
      }
    },

    deleteLocalStorage: (state) => {
      console.log("REAPERWRB: Deleting local storage!")
      localStorage.removeItem('REAPERWRB')
    },

    deleteWebremotePreset: (state, payload) => {
      state.storage[payload.type].webremotes.forEach((webremote, index) => {
        if(payload.title === webremote.title
        && payload.timestamp === webremote.timestamp) {
          console.log(`REAPERWRB: Deleting preset from ${payload.type} storage.`)
          state.storage[payload.type].webremotes.splice(index, 1)
        }
      })
    },

    fadeInLoader: (state) => {
      const loader = document.querySelector('#loader')
      loader.classList.remove('fadeOut')
      loader.classList.remove('hidden')
      loader.classList.add('fadeIn')
    },

    fadeOutLoader: (state) => {
      const loader = document.querySelector('#loader')
      loader.classList.remove('fadeIn')
      loader.classList.add('fadeOut')
      setTimeout(function() {
        document.querySelector('#loader').classList.add('hidden')
      }, 1000)
    },

    logTabs: (state) => {
      const tabs = cloneDeep(state.webremote.tabs)
      console.log(JSON.stringify(cloneDeep(tabs)))
    },
    
    // FIXME unsafe
    import: (state, payload) => {
      console.log("REAPERWRB: Importing data.")
      state.editor.help = false
      if(typeof(payload.tabs) !== 'undefined') {
        state.webremote = cloneDeep(payload)
        state.startup = false
      } else {
        payload.forEach(tab => state.webremote.tabs.push(tab))
        state.webremote.active_tab = state.webremote.tabs.length - 1
      } 
    },

    switchTab: (state, tab) => {
      // console.log(tab)
      state.editor.data.item = cloneDeep(defaults.editor.data.item)
      state.webremote.active_tab = tab
    },

    switchRow: (state, row) => state.editor.active_row = row,

    toggleBulkEdit: (state) => {
      state.editor.data.item = cloneDeep(defaults.editor.data.item)
      state.editor.data.bulk = []
      state.editor.bulk_edit = state.editor.bulk_edit ? false : true
    },

    toggleExecActions: (state) => state.editor.exec_actions = state.editor.exec_actions ? false : true,

    bulkEditAddRemove: (state, payload) => {
      let removedItem = false
      state.editor.data.bulk = state.editor.data.bulk.filter((item) => {
        if(item.index == payload.index && item.row == payload.row) {
          payload.el.classList.remove('app-highlight-edit')
          removedItem = true
          return false
        } else {
          return true
        }
      })

      if(!removedItem) {
        payload.el.classList.add('app-highlight-edit')
        payload.obj = state.webremote
                      .tabs[state.webremote.active_tab]
                      .rows[payload.row][payload.index] 
        state.editor.data.bulk.push(payload)
      }
    },

    bulkEditAdd: (state, payload) => {
      payload.el.classList.add('app-highlight-edit')
      payload.obj = state.webremote
                    .tabs[state.webremote.active_tab]
                    .rows[payload.row][payload.index] 
      state.editor.data.bulk.push(payload)
    },

    bulkEditRemove: (state, payload) => {
      payload.el.classList.remove('app-highlight-edit')
      let removeditem = false
      state.editor.data.bulk = state.editor.data.bulk.filter((item) => {
        if(item.index == payload.index && item.row == payload.row) {
          removedItem = true
          return false
        } else {
          return true
        }
      })
    },

    clear: state => {
      state.webremote.tabs = []
      state.webremote.active_tab = 0
      state.editor.data = cloneDeep(defaults.editor.data)
      state.editor.bulk_edit = false
      state.editor.help = true
    },

    addItem: (state, type) => {
      const item = cloneDeep(defaults[type])
      const row = state.webremote.tabs[state.webremote.active_tab].rows[state.editor.active_row]
      row.push(item)
      state.editor.data.item.type = type
      state.editor.data.item.row = state.editor.active_row
      state.editor.data.item.obj = row[row.length - 1]
      state.editor.mode = editorModes.MAIN
    },

    cancelAddItem: (state) => {
      state.editor.menu = false
    },

    setItemMoveCopy: (state, payload) => {
      if(payload) {
        state.editor.data.move = payload
        state.editor.data.move.obj = state.webremote.tabs[state.webremote.active_tab].rows[payload.row][payload.index]
      } else {
        state.editor.data.move = false
      }
    },

    clearItemMoveCopy: (state) => state.editor.data.move = false,

    moveItem: (state) => {
      if(state.webremote.active_tab !== state.editor.data.move.target 
        && state.editor.data.move) {
        const tab = state.editor.data.move.target
        const row = state.webremote.tabs[tab].rows.length - 1
        state.webremote.tabs[tab].rows[row].push(state.editor.data.move.obj)
        state.webremote.tabs[state.webremote.active_tab].rows[state.editor.data.move.row].splice(state.editor.data.move.index, 1)
        state.webremote.active_tab = tab
        state.editor.data.move = false
      }
    },

    edit: (state, payload) => {

      state.editor.data.item = payload
      payload.el.classList.add('app-highlight-edit')

      if(payload.type === 'tab') {
        state.editor.data.item.obj = state.webremote.tabs[payload.index]
        state.webremote.active_tab = payload.index
      } else {
        state.editor.active_row = payload.row
        state.editor.data.item.obj = state.webremote
                                    .tabs[state.webremote.active_tab]
                                    .rows[payload.row][payload.index] 
      }
    },

    showDeleteDialog: (state) => {
      state.editor.mode = editorModes.DELETE
      state.editor.data.bin = cloneDeep(state.editor.data.item)
      
      state.editor.data.bin.el.classList.add('app-highlight-delete')

      if(state.editor.data.bin.obj.type === 'tab') {
        const el = document.querySelectorAll('.app-item')
        for(let i = 0; i < el.length; i++) {
          el[i].classList.add('app-highlight-delete')
        }
      }
    },

    showRowDeleteDialog: (state, payload) => {
      state.editor.mode = editorModes.DELETE
      state.editor.data.bin = payload
      state.editor.data.bin.el.classList.add('app-highlight-delete')
    },

    showBulkDeleteDialog: (state) => {
      state.editor.mode = editorModes.DELETE
      state.editor.data.bulk.forEach(item => item.el.classList.add('app-highlight-delete'))
    },

    cancelDelete: (state) => {
      state.editor.data.bin.el.classList.remove('app-highlight-delete')
      state.editor.data.bin.el.classList.add('app-highlight-edit')
      const el = document.querySelectorAll('.app-item')
      for(let i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-delete')
      }
      state.editor.data.bin = false
      state.editor.mode = editorModes.MAIN
    },
    
    cancelBulkDelete: (state) => {
      state.editor.data.bulk.forEach(item => {
        item.el.classList.remove('app-highlight-delete')
      })
      state.editor.mode = editorModes.MAIN
    },

    bulkDelete: (state) => {
      state.editor.data.bulk.forEach(bulk => {
        bulk.el.classList.remove('app-highlight-delete')
        state.webremote.tabs[state.webremote.active_tab].rows[bulk.row].forEach((del, index) => {
          // compare items if all keys match remove
          if(bulk.type === del.type) {
            let remove = true
            for(const key in del) {
              if(del[key] !== bulk.obj[key])
                remove = false
            }
            if(remove)
              state.webremote.tabs[state.webremote.active_tab].rows[bulk.row].splice(index, 1)
          }
        })
      })

      state.editor.data.bulk = []
      state.editor.mode = editorModes.MAIN
    },

    delete: (state, keepItems) => {

      state.editor.data.bin.el.classList.remove('app-highlight-delete')

      switch(state.editor.data.bin.obj.type) {
        
        case 'tab':
          let el = document.querySelectorAll('.app-item')
          for(let i = 0; i < el.length; i++) {
            el[i].classList.remove('app-highlight-delete')
          }

          let rows
          let tab = state.editor.data.bin.index

          if(keepItems) {
            rows = state.webremote.tabs[tab].rows
            const targetTab = tab >= 1 ? tab - 1 : state.webremote.tabs.length - 1
            rows.forEach(row => { state.webremote.tabs[targetTab].rows.push(row)})
          }

          // delete the tab
          state.webremote.tabs.splice(state.editor.data.bin.index, 1)
          
          // switch to correct tab
          if(keepItems) {
            if(tab === 0)
              state.webremote.active_tab = state.webremote.tabs.length - 1
            else
              state.webremote.active_tab = tab - 1
          } else {
            if(tab > 0 && tab < state.webremote.tabs.length)
              state.webremote.active_tab = tab
            else if(tab >= state.webremote.tabs.length)
              state.webremote.active_tab = state.webremote.tabs.length -1
            else
              state.webremote.active_tab = 0
          }

          break

        case 'row':

          let items = false
          if(keepItems)
            items = state.webremote.tabs[state.webremote.active_tab].rows[state.editor.data.bin.index]

          state.webremote.tabs[state.webremote.active_tab].rows.splice(state.editor.data.bin.index, 1)
          
          if(state.webremote.tabs[state.webremote.active_tab].rows.length === 0)
            state.webremote.tabs[state.webremote.active_tab].rows.push([])
          
          if(items)
            items.forEach(item => { state.webremote.tabs[state.webremote.active_tab].rows[0].push(item) })
          
          break

        default:
          state.webremote.tabs[state.webremote.active_tab].rows[state.editor.data.bin.row].splice(state.editor.data.bin.index, 1)
          break
        }

        state.editor.data.item = cloneDeep(defaults.editor.data.item)
        state.editor.data.bin = false
        state.editor.mode = editorModes.MAIN
      },

    addRow: (state, row) => {
      state.webremote.tabs[state.webremote.active_tab].rows.splice(row + 1, 0, [])
    },

    addTab: (state, tab) => {
      const newTab = cloneDeep(defaults.tab)
      newTab.rows.push([])
      state.webremote.tabs.push(newTab)
      state.webremote.active_tab = state.webremote.tabs.length - 1
      state.editor.data.item.index = state.webremote.active_tab
      state.editor.data.item.obj = state.webremote.tabs[state.webremote.active_tab]
    },

    updateItem: (state, payload) => state.editor.data.item.obj[payload.key] = payload.val,

    updateItems: (state, payload) => {
      state.editor.data.bulk.forEach(item => {
        item.obj[payload.key] = payload.val
      })
    },

    updateRow: (state, payload) => {
      Vue.set(state.webremote.tabs[state.webremote.active_tab].rows, payload.row, payload.value)
    },

    updateTabs: (state, payload) => Vue.set(state.webremote, 'tabs', payload),

    execAction: (state, payload) => {

      if(state.mode === modes.EDITOR 
        && !state.editor.exec_actions 
        && typeof(payload.recur) === 'undefined')
        return

      if(state.reaper.ready) {
        if(payload.recur)
          wwr_req_recur(payload.action, payload.recur)
        else
          wwr_req(payload.action)
        // update toggle state
        if(payload.toggle)
          wwr_req('GET/' + payload.action)
      }
    },

    cancelAction: (state, payload) => {
      if(state.reaper.ready)
        wwr_req_recur_cancel(payload.action)
    },

    getCmdStates: (state) => {

      if(state.reaper.ready && state.webremote.tabs[state.webremote.active_tab] !== undefined) {
        console.log('REAPERWRB: Updating command states!')
        state.webremote.tabs[state.webremote.active_tab].rows.forEach((row) => {
          row.forEach((item) => {
            if(item.type === 'action')
              wwr_req('GET/' + item.action)
          })
        })
      }
    },

    // FIXME create functions to import
    onReply: (state, result) => {
      //console.log(result)

      if(result.match('EXTSTATE')) {
        const data = result.trim().split("\n")
                      .filter(line => !line.match('TRANSPORT'))[0]
                      .split("\t")

        if(data[1] === 'REAPERWRB_TRANSFER') {
          if(data[2] === 'INFO') {

            let info = JSON.parse(data[3])
            let c = -1
            let r = function() {
              c++
              if(c < info.items) {
                wwr_req('GET/EXTSTATE/REAPERWRB_TRANSFER/ITEM_' + c)
                setTimeout(r, state.transfer.timeout)
              } else {
                state.transfer.okay = true
              }
            }
            r()
          } else if (data[2].match('ITEM')) {
            //console.log(JSON.parse(data[3]))
            state.transfer.data.push(JSON.parse(data[3]))
          }
        }
      }

      if(result.match('TRANSPORT')) {
        const data = result.trim().split("\n")[0].split("\t")
        data.splice(0,1)
        state.reaper.transport = {
          online: true,
          playstate: parseInt(data[0]), // 
          repeat: parseInt(data[2]),
          position_seconds: parseFloat(data[1]).toFixed(2),
          position_string: data[3],
          position_string_beats: data[4]
        }
      }

      // FIXME?
      if(result.match('MARKER_LIST')) {
        const data = result.trim().split("\n")
        state.reaper.markers = data
          .filter((item) => {
            return !item.match('MARKER_LIST') && !item.match('MARKER_LIST_END') && item.match('MARKER')
          })
          .map((item) => {
            let data = item.split('\t')
            // check data length
            return {
              name: data[1],
              id: data[2],
              pos: data[3],
              color: data[4]
            }
          })
      }

      // FIXME?
      if(result.match('REGION_LIST')) {
        const data = result.trim().split("\n")
        state.reaper.regions = data
          .filter((item) => {
            return !item.match('REGION_LIST') && !item.match('REGION_LIST_END') && item.match('REGION')
          })
          .map((item) => {
            let data = item.split('\t')
            return {
              name: data[1],
              id: data[2],
              pos: data[3],
              color: data[4]
            }
          })
      }

      if(result.match('CMDSTATE')) {
        const data = result.trim().split("\n")
        const actionStates = data.map((cmd) => {
          let data = cmd.split('\t')
          return {
            action: data[1],
            state: data[2]
          }
        })

        // check state of all actions of the current tab if they are toggles
        state.webremote.tabs[state.webremote.active_tab].rows.forEach((row) => {
          row.forEach((item) => {
            if(item.type === 'action' && item.toggle) {
              actionStates.forEach((action) => {

                if(action.action === item.action)
                  item.state = action.state

              })
            }
          })
        })

      }
    },
  }
})

const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  created() {
    this.$store.commit('init')
    this.$store.commit('onWindowResize')

    window.addEventListener('resize', () => {
      this.$store.commit('onWindowResize')
    })

    const reaperReady = typeof(wwr_start) === 'function' ? true : false
    if(reaperReady) {
      console.log('REAPERWRB: REAPER API ready.')
      wwr_start()
      window.wwr_onreply = (result) => this.$store.commit('onReply', result)
      this.$store.commit('setReaperReady', reaperReady)
    } else {
      console.log('ReaperWRB ERROR: REAPER API not ready!')
    }
    
  }
})
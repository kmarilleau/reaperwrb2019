'use strict'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import cloneDeep from 'lodash/cloneDeep'
//import isMobile from 'ismobilejs'
import merge from 'lodash/merge'
import { saveAs } from 'file-saver/FileSaver'
import defaults from '@/defaults'
import htmlTemplate from '@/htmlTemplate'
import example from '@/example'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { stat } from 'fs';
library.add(fas, far, fab)
dom.watch()
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuex)

const modes = {
  STARTUP: 0,
  REMOTE: 1,
  EDITOR: 2,
}

const editorModes = {
  MAIN: 0,
  ADD: 1,
  DELETE: 2,
  SAVE: 3,
}

const store = new Vuex.Store({
  state: {
    version: '2019.1',
    mode: modes.STARTUP,
    reaper: {
      ready: false,
      transport: {
        online: false,
        playstate: 0,
        position_seconds: 0,
        repeat: 0,
        position_string: '',
        position_string_beats: ''
      },
      markers: [],
      regions: [],
    }, 
    editor: {
      mode: editorModes.MAIN,
      exec_actions: false,
      bulk_edit: false,
      move_item: false,
      active_row: 0,
      data: {
        item: {
          type: false,
          row: false,
          obj: false,
          el: false
        },
        bulk: [],
        bin: {},
      }
    },
    webremote: {},
    has_local_storage: false,
    storage: {
      local: false,
      json: false
    }
  },

  getters: {
    reaperReady: (state, getters) => state.reaper.ready,
    version: (state, getters) => state.version,

    showLocalStorage: (state, getters) => state.has_local_storage && typeof(state.storage.local.webremotes) !== 'undefined',
    hasLocalStorage: (state, getters) => state.has_local_storage,
    getLocalStorageWebremotes: (state, getters) => state.storage.local.webremotes,
    getLocalStorageWebremoteByIndex: (state, getters) => (index) => state.storage.local.webremotes[index],
    
    getJSONStorageWebremotes: (state, getters) => state.storage.json.webremotes,
    getJSONStorageWebremoteByIndex: (state, getters) => (index) => state.storage.json.webremotes[index],

    isModeStartup: (state, getters) => state.mode === modes.STARTUP,
    isModeRemote: (state, getters) => state.mode === modes.REMOTE,
    isModeEditor: (state, getters) => state.mode === modes.EDITOR,

    isEditorModeMain: (state, getters) => state.editor.mode === editorModes.MAIN,
    isEditorModeAdd: (state, getters) => state.editor.mode === editorModes.ADD,
    isEditorModeSave: (state, getters) => state.editor.mode === editorModes.SAVE,
    isEditorModeDelete: (state, getters) => state.editor.mode === editorModes.DELETE,
    isEditorBulkEdit: (state, getters) => state.editor.bulk_edit,
    isEditorExecActions: (state, getters) => state.editor.execAction,

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
    
    hasEditItem: (state, getters) => state.editor.data.item.obj,
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
  },

  mutations: {
    init: (state) => {
      
      state.webremote = cloneDeep(defaults.webremote)

      // check JSON storage
      if(typeof(jsonStorage) !== 'undefined') {
        console.log("REAPERWRB: Loading json storage.")
        state.storage.json = cloneDeep(jsonStorage)
      }

      // check local storage support
      if(typeof(Storage) !== 'undefined') {
        state.has_local_storage = true
        state.storage.local = cloneDeep(defaults.storage)
        console.log('REAPERWRB: Local storage support enabled.')
        if(localStorage.getItem('REAPERWRB')) {
          console.log('REAPERWRB: Loading local storage.')
          state.storage.local = JSON.parse(localStorage.getItem('REAPERWRB'))
        }
      } else {
        state.has_local_storage = false
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

    clearEditHighlight: (state) => {
      // FIXME use el in edit_item reference
      const el = document.querySelectorAll('.app-highlight-edit')
      for(let i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-edit')
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

    clearEditItem: (state) => state.editor.data.item = {
      type: false,
      row: false,
      obj: false,
      el: false
    },

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
      webremote.timestamp = d.getTime()
      
      if(!state.storage.json)
        state.storage.json = cloneDeep(defaults.storage)

      state.storage.json.webremotes.push(webremote)
      const json = `const jsonStorage = ${JSON.stringify(state.storage.json)};`
      const blob = new Blob([json], { type: "text/plain;charset=utf-8" })
      saveAs(blob, "json.js")
      setTimeout(function() { window.addEventListener('focus', function() { location.reload() }) }, 500)
    },

    saveLocalStorage: (state) => {
      if(state.has_local_storage) {
        console.log('REAPERWRB: Saving to local storage.')
        const webremote = cloneDeep(state.webremote)
        webremote.active_tab = 0
        const d = new Date()
        webremote.timestamp = d.getTime()
        state.storage.local.webremotes.push(webremote)
        localStorage.setItem('REAPERWRB', JSON.stringify(state.storage.local))
      }
    },

    deleteLocalStorage: (state, label) => {
      localStorage.removeItem('REAPERWRB')
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
      setTimeout(function(){ document.querySelector('#loader').classList.add('hidden') }, 1000)
    },

    logTabs: (state) => {
      const tabs = cloneDeep(state.webremote.tabs)
      console.log(JSON.stringify(cloneDeep(tabs)))
    },
    
    // FIXME unsaafe
    import: (state, data) => {
      console.log("REAPERWRB: Importing data.")
      if(typeof(data.tabs) !== 'undefined') {
        state.webremote = cloneDeep(data)
        state.startup = false
      } else {
        data.forEach(tab => state.webremote.tabs.push(tab))
        state.webremote.active_tab = state.webremote.tabs.length - 1
      } 
    },

    switchTab: (state, tab) => {
      state.editor.data.item = {
        type: false,
        row: false,
        obj: false,
        el: false
      }

      state.webremote.active_tab = tab
    },

    switchRow: (state, row) => state.editor.active_row = row,

    toggleBulkEdit: (state) => {
      state.editor.data.item = {
        type: false,
        row: false,
        obj: false
      },
      state.editor.data.bulk = []
      state.editor.bulk_edit = state.editor.bulk_edit ? false : true;
    },

    toggleExecActions: (state) => state.editor.exec_actions = state.editor.exec_actions ? false : true,

    bulkEditAdd: (state, payload) => {
      payload.el.classList.add('app-highlight-edit')
      payload.obj = state.webremote
                    .tabs[state.webremote.active_tab]
                    .rows[payload.row][payload.index] 
      state.editor.data.bulk.push(payload)
    },

    bulkEditRemove: (state, payload) => {
      payload.el.classList.remove('app-highlight-edit')
      state.editor.data.bulk = state.editor.data.bulk.filter((item) => {
        return item.index == payload.index && item.row == payload.row ? false : true
      })
    },

    clear: state => {
      state.webremote.tabs = []
      state.webremote.active_tab = 0
      state.editor.edit_item = false
      state.editor.edit_items = []
      state.editor.bulk_edit = false
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

    setItemMoveCopy: (state, data) => {
      if(data) {
        state.editor.move_item = {
          row: data.row,
          index: data.index,
          target_tab: data.target_tab,
          item: state.webremote.tabs[state.webremote.active_tab].rows[data.row][data.index]
        }
        state.editor.item_move_target_tab = data.target_tab
      } else {
        state.editor.move_item = false
      }
    },

    moveItem: (state) => {
      if(state.webremote.active_tab !== state.editor.move_item.target_tab && state.editor.move_item) {
        const tab = state.editor.move_item.target_tab
        const row = state.webremote.tabs[tab].rows.length - 1
        state.webremote.tabs[tab].rows[row].push(state.editor.move_item.item)
        state.webremote.tabs[state.webremote.active_tab].rows[state.editor.move_item.row].splice(state.editor.move_item.index, 1)
        state.webremote.active_tab = tab
        state.editor.move_item = false
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
      state.editor.edit_items.forEach(item => item.el.classList.add('app-highlight-delete'))
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
      state.editor.data.bulk.forEach(edit_item => {
        edit_item.el.classList.remove('app-highlight-delete')
        state.webremote.tabs[state.webremote.active_tab].rows[edit_item.row].forEach((del, index) => {
          // compare items if all keys match remove
          if(edit_item.item.type === del.type) {
            let remove = true
            for(const key in del) {
              if(del[key] !== edit_item.item[key])
                remove = false
            }
            if(remove)
              state.webremote.tabs[state.webremote.active_tab].rows[edit_item.row].splice(index, 1)
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

          console.log(state.editor.data.bin)

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

        state.editor.data.item = {
          type: false,
          row: false,
          obj: false,
          el: false
        }
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

    updateItem: (state, data) => state.editor.data.item.obj[data.key] = data.val,

    updateItems: (state, data) => {
      state.editor.data.bulk.forEach(item => {
        item.obj[data.key] = data.val
      })
    },

    updateRow: (state, data) => {
      Vue.set(state.webremote.tabs[state.webremote.active_tab].rows, data.row, data.value)
    },

    updateTabs: (state, data) => {
      Vue.set(state.webremote, 'tabs', data)
    },

    execAction: (state, data) => {

      if(state.mode === modes.EDITOR 
        && !state.editor.exec_actions 
        && typeof(data.recur) === 'undefined')
        return

      if(state.reaper.ready) {
        if(data.recur)
          wwr_req_recur(data.action, data.recur)
        else
          wwr_req(data.action)
        // update toggle state
        if(data.toggle)
          wwr_req('GET/' + data.action)
      }
    },

    cancelAction: (state, data) => {
      if(state.reaper.ready)
        wwr_req_recur_cancel(data.action)
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

    // saveExtState: (state) => {
    //   let items = []
    //   state.webremote.tabs.forEach((tab, tabindex) => {

    //     let t = {}
    //     Object.keys(tab).forEach(key => {
    //       if(key !== 'rows')
    //         t[key] = tab[key]
    //     })

    //     items.push(encodeURIComponent(JSON.stringify(t)))

    //     tab.rows.forEach((row, rowindex) => {
    //       row.forEach((item, itemindex) => {
    //         item.row = rowindex
    //         item.tab = tabindex
    //         items.push(encodeURIComponent(JSON.stringify(item)))
    //       })
    //     })
    //   })

    //   wwr_req('SET/EXTSTATE/REAPERWRB_TRANSFER/INFO/' + encodeURIComponent(JSON.stringify({
    //     items: items.length
    //   })))

    //   let c = -1
    //   let f = function() {
    //     c++
    //     if(c < items.length) {
    //       wwr_req('SET/EXTSTATE/REAPERWRB_TRANSFER/ITEM_' + c + '/' + items[c])
    //       setTimeout(f, state.transfer.timeout)
    //     }
    //   }
    //   f()
    // },

    // readExtState: (state, key) => {
    //   state.transfer.okay = false
    //   state.transfer.data = []

    //   wwr_req('GET/EXTSTATE/REAPERWRB_TRANSFER/INFO')

    //   let f = function() {
    //     if(!state.transfer.okay) {
    //       setTimeout(f, state.transfer.timeout)
    //     } else {
    //       console.log("REAPERWRB: TRANSFER FINISHED IMPORTING DATA")
    //       state.transfer.data.forEach(item => {
    //         console.log(item)
    //       })
    //     }
    //   }
    //   f()
    // },

    onReply: (state, result) => {
      //console.log(result)

      if(result.match('EXTSTATE')) {
        const data = result.trim().split("\n")
                      .filter(line => !line.match('TRANSPORT'))[0]
                      .split("\t")
        console.log(data)

        if(data[1] === 'REAPERWRB_TRANSFER') {
          if(data[2] === 'INFO') {

            let info = JSON.parse(data[3])
            console.log(info)
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
    // check reaper read state
    const reaperReady = typeof(wwr_start) === 'function' ? true : false
    if(reaperReady) {
      console.log('ReaperWRB: REAPER API ready.')
      wwr_start()
      window.wwr_onreply = (result) => this.$store.commit('onReply', result)
      this.$store.commit('setReaperReady', reaperReady)
    } else {
      console.log('ReaperWRB ERROR: REAPER API not ready!')
    }
  }
})
'use strict'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import cloneDeep from 'lodash/cloneDeep'
import { saveAs } from 'file-saver/FileSaver'
import htmlTemplate from '@/htmlTemplate'
import { appModes, editorModes, defaults } from '@/reaperwrb'
import example from '@/example'

import VueSVGIcon from 'vue-svgicon'
Vue.use(VueSVGIcon, {
  defaultWidth: '16px',
  defaultHeight: '16px'
})
import './icons/'

// Logging helpers
const DEBUG_LOG = true
const LOG_LEVEL = {
  INFO: 0,
  WARN: 1,
  ERROR: 2
}

const log = (msg, lvl = LOG_LEVEL.INFO) => {

  switch (lvl) {
    case LOG_LEVEL.INFO:
      if(DEBUG_LOG) 
        console.log(`ReaperWRB ${msg}`)
      break;
    case LOG_LEVEL.WARN:
      if(DEBUG_LOG)
        console.warn(`ReaperWRB: ${msg}`)
      break;
    case LOG_LEVEL.ERROR:
      console.error(`ReaperWRB ERROR: ${msg}`)
      break;
  }
}

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '2.1.1',
    mode: appModes.STARTUP,
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
    reaperReady:  (state, getters) => state.reaper.ready,
    browser:      (state, getters) => state.editor.browser,

    showLocalStorage: (state, getters) => state.storage.local_support && typeof(state.storage.local.webremotes) !== 'undefined',
    hasLocalStorage:  (state, getters) => state.storage.local_support,

    getLocalStorageWebremotes:        (state, getters) => state.storage.local.webremotes,
    getLocalStorageWebremoteByIndex:  (state, getters) => (index) => state.storage.local.webremotes[index],

    getJSONStorageWebremotes:       (state, getters) => state.storage.json.webremotes,
    getJSONStorageWebremoteByIndex: (state, getters) => (index) => state.storage.json.webremotes[index],

    isEditorEnabled: (state, getters) => state.editor.enabled,

    isAppModeStartup: (state, getters) => state.mode === appModes.STARTUP,
    isAppModeRemote:  (state, getters) => state.mode === appModes.REMOTE,
    isAppModeEditor:  (state, getters) => state.mode === appModes.EDITOR,

    isEditorModeMain:     (state, getters) => state.editor.mode === editorModes.MAIN,
    isEditorModeAdd:      (state, getters) => state.editor.mode === editorModes.ADD,
    isEditorModeSave:     (state, getters) => state.editor.mode === editorModes.SAVE,
    isEditorModeDelete:   (state, getters) => state.editor.mode === editorModes.DELETE,
    isEditorBulkEdit:     (state, getters) => state.editor.bulk_edit,
    isEditorExecActions:  (state, getters) => state.editor.exec_actions,

    itemHeight: (state, getters) => state.webremote.itemHeight,
    itemWidth:  (state, getters) => state.webremote.itemWidth,
    iconSize:   (state, getters) => (getters.itemHeight / 3).toString(),
    iconSizePX: (state, getters) => getters.iconSize + 'px',

    showHelp: (state, getters) =>  state.editor.help,

    showEditorBulkEditButtons: (state, getters) => {
      return state.editor.bulk_edit
        && state.editor.mode !== editorModes.DELETE
        && state.editor.data.bulk.length > 0
    },

    showEditorEditButtons:      (state, getters) => {
      return getters.isAppModeEditor
        && !getters.isEditorModeSave
        && !getters.isEditorModeDelete
    },

    showEditorDeleteRowButton:  (state, getters) => getters.tabs[getters.activeTab].rows.length > 1,
    showEditorGlobalColumns:    (state, getters) => getters.hasTabs && getters.isEditorModeMain,

    webremoteTitle: (state, getters) => state.webremote.title,

    isActiveTab: (state, getters) => (tab) => getters.activeTab === tab,
    isTabEdit: (state, getters) => (tab) => {
      return state.editor.data.item.obj.type === 'tab'
        && state.webremote.active_tab === tab
    },

    globalColumns: (state, getters) => state.webremote.columns,

    activeTab:    (state, getters) => state.webremote.active_tab,
    activeRow:    (state, getters) => state.editor.active_row,
    isActiveRow:  (state, getters) => (row) => getters.activeRow === row,

    tabs: (state, getters) => state.webremote.tabs,
    rows: (state, getters) => state.webremote.tabs[getters.activeTab].rows,

    rowItems: (state, getters) => (row) => getters.tabs[getters.activeTab].rows[row],

    hasTabs: (state, getters) => state.webremote.tabs.length > 0,
    hasNoTabs: (state, getters) => state.webremote.tabs.length === 0,
    isLastTab: (state, getters) => (item) => item.type === 'tab' && state.webremote.tabs.length === 1,

    hasRows: (state, getters) => state.webremote.tabs[getters.activeTab].rows.length > 0,

    hasMarkers: (state, getters) => state.reaper.markers.length > 0,
    getMarkers: (state, getters) => state.reaper.markers,
    getMarkerIdx: (state, getters) => state.reaper.marker_idx,
    getMarkerId: (state, getters) => getters.hasMarkers ? state.reaper.markers[state.reaper.marker_idx].id : '',
    getMarkerName: (state, getters) => getters.hasMarkers ? state.reaper.markers[state.reaper.marker_idx].name : '',
    getMarkerLastId: (state, getters) => getters.hasMarkers ? state.reaper.markers[state.reaper.markers.length - 1].id : '',

    hasRegions: (state, getters) => state.reaper.regions.length > 0,
    getRegions: (state, getters) => state.reaper.regions,
    getRegionIdx: (state, getters) => state.reaper.region_idx,
    getRegionId: (state, getters) => getters.hasRegions ? state.reaper.regions[state.reaper.region_idx].id : '',
    getRegionName: (state, getters) => getters.hasRegions ? state.reaper.regions[state.reaper.region_idx].name : '',
    getRegionLastId: (state, getters) => getters.hasRegions ? state.reaper.regions[state.reaper.regions.length - 1].id : '',

    hasTracks: (state, getters) => state.reaper.tracks.length > 0,
    getTracks: (state, getters) => state.reaper.tracks,
    getTracksSelected: (state, getters) => state.reaper.tracks.filter(track => track.flags === 2),
    hasTracksSelected: (state, getters) => getters.getTracksSelected.length > 0,
    getTracksLastSelectedName: (state, getters) => getters.getTracksSelected[getters.getTracksSelected.length - 1].name,

    transportOnline:    (state, getters) => state.reaper.transport.online,
    transportPosString: (state, getters) => state.reaper.transport.position_string,
    transportPosBeats:  (state, getters) => state.reaper.transport.position_string_beats,
    transportPosSec:    (state, getters) => state.reaper.transport.position_seconds,
    transportRepeat:    (state, getters) => parseInt(state.reaper.transport.repeat),

    transportPlaystate:       (state, getters) => parseInt(state.reaper.transport.playstate),
    transportPlaystatePlay:   (state, getters) => parseInt(getters.transportPlaystate) === 1,
    transportPlaystatePause:  (state, getters) => parseInt(getters.transportPlaystate) === 2,
    transportPlaystateRecord: (state, getters) => parseInt(getters.transportPlaystate) === 5,

    hasMoveItem: (state, getters) => state.editor.data.move,
    hasEditItem: (state, getters) => state.editor.data.item.obj,

    isEditItem: (state, getters) => (payload) => {
      if(getters.editItemRow === payload.row
      && getters.tabs[getters.activeTab].rows[payload.row].length - 1 === payload.index) {
        let isItem = true
        Object.keys(payload.item).forEach(key => {
          if(payload.item[key] !== state.editor.data.item.obj[key])
            isItem = false
        })
        if(isItem)
          return true
      }
    },

    isEditTab: (state, getters) => (payload) => {
      return getters.editItemType('tab')
        && getters.activeTab === payload.index
    },

    editItemType: (state, getters) => (type) => state.editor.data.item.obj.type === type,
    editItemRow:  (state, getters) => state.editor.data.item.row,

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
      if(getters.isAppModeEditor && !getters.isEditorBulkEdit)
        return '.app-item'
      else
        return false
    },

    disableSort: (state, getters) => {
      if(getters.isAppModeEditor)
        return getters.isEditorBulkEdit ? true : false
      else
        return true
    },
  },

  actions: {

    // FIXME needs testing
    onLaunchFromHTML({ commit, state }, webremote) {
      commit('import', webremote)
      commit('getCmdStates')
      commit('setModeRemote')
    },

    onTabSwitch({ commit, state }, tab) {
      commit('clearEditHighlight')
      commit('switchTab', tab)
      commit('getCmdStates')
    },

    onEditorHome({ commit, state }) {
      commit('unload')
      commit('clear')
      commit('setModeStartup')
    },

    onEditorLaunch({ commit, state }) {
      commit('fadeInLoader')
      commit('setModeEditor')
      commit('showHelp')
    },

    onEditorNew({ commit, state }) {
      commit('hideHelp')
      commit('new')
      commit('onWindowResize')
    },

    onEditorClear({ commit, state }) {
      commit('hideHelp')
      commit('clear')
    },

    onEditorLoadExample({ commit, state }) {
      commit('import', cloneDeep(example))
      commit('hideHelp')
      commit('getCmdStates')
      commit('onWindowResize')
    },

    onEditorToggleBulkEdit({ commit, state }) {
      commit('hideHelp')
      commit('clearEditHighlight')
      commit('toggleBulkEdit')
    },

    onEditorItemAdd({ commit, state }, type) {
      commit('clearEditHighlight')
      commit('addItem', type)
    },

    onEditorTabAdd({ commit, state }) {
      commit('hideHelp')
      commit('clearEditHighlight')
      commit('addTab')
    },

    onEditorItemEdit({ commit, state }, payload) {
      commit('clearEditHighlight')
      commit('edit', payload)
    },

    onEditorItemDelete({ commit, state }) {
      commit('clearEditHighlight')
      commit('showDeleteDialog')
    },

    onEditorSave({ commit, state }) {
      commit('hideHelp')
      commit('clearEditHighlight')
      commit('clearEditItem')

      if(state.editor.bulk_edit)
        commit('toggleBulkEdit')

      commit('setEditorModeSave')
    },

    onEditorRowDelete({ commit, state }, payload) {
      commit('clearEditHighlight')
      if(state.webremote.tabs[state.webremote.active_tab].rows[payload.index].length === 0) {
        state.editor.data.bin = payload
        commit('delete')
      } else {
        commit('showRowDeleteDialog', payload)
      }
    },

    onEditorDraggableStart({ commit, state }) {
      commit('clearEditHighlight')
      commit('clearEditItem')
    },

    onEditorItemAddMenu({ commit, state }, row) {
      commit('hideHelp')
      commit('clearEditHighlight')
      commit('clearEditItem')
      commit('switchRow', row)
      commit('setEditorModeAdd')
    },

    onLoadDefault({ commit, state }, webremote) {
      commit('import', cloneDeep(example))
      commit('onWindowResize')
      commit('getCmdStates')
      commit('setModeRemote')
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
        console.error("REAPERWRB ERROR: Could not load %s storage.", payload.type)
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
        console.error("REAPERWRB ERROR: Could not load %s storage.", payload.type)
    },
  },

  mutations: {
    init: (state) => {

      state.reaper    = cloneDeep(defaults.reaper)
      state.editor    = cloneDeep(defaults.editor)
      state.webremote = cloneDeep(defaults.webremote)

      // FIXME move browser detection to function
      // Firefox 1.0+
      if(typeof InstallTrigger !== 'undefined')
        state.editor.browser = 'firefox'

      if(/constructor/i.test(window.HTMLElement) 
      || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] 
      || (typeof safari !== 'undefined' && safari.pushNotification)))
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

      log(`Detected browser = ${state.editor.browser}`)

      const request = new XMLHttpRequest()
      request.open('GET', window.location.origin + '/reaperwrb.json')
      request.responseType = 'json'
      request.send()

      let hasJSON = false

      request.onload = () => {
        log("Loading reaperwrb.json")
        if(request.response !== null) {
          hasJSON = true
          state.storage.json = request.response
        } else {
          if(typeof(jsonStorage) !== 'undefined') {
            
            if(jsonStorage.webremotes.length > 0 && !hasJSON) {
              log("Migrating old json storage")
              alert("ReaperWRB needs to migrate webremote.js.\nPlease save the following file to your 'reaper_www_root' folder!\nAfterwards reload ReaperWRB!")
              const json = JSON.stringify(jsonStorage)
              const blob = new Blob([json], { type: "application/json" })
              saveAs(blob, "reaperwrb.json")
            }

          } else {
            log("REAPERWRB: Creating json storage")
            alert("ReaperWRB needs to create it's db file.\nPlease save the following file to your 'reaper_www_root' folder!\nAfterwards reload ReaperWRB!")
            const json = JSON.stringify({"webremotes": []})
            const blob = new Blob([json], { type: "application/json" })
            saveAs(blob, "reaperwrb.json")
          }
        }
      }

      // check local storage support
      if(typeof(Storage) !== 'undefined') {
        state.storage.local_support = true
        state.storage.local = cloneDeep(defaults.storage)
        log('Local storage support enabled.')
        if(localStorage.getItem('REAPERWRB')) {
          log('Loading local storage.')
          state.storage.local = JSON.parse(localStorage.getItem('REAPERWRB'))
        }
      } else {
        state.storage.local_support = false
        log('REAPERWRB ERROR: Browser does not support Local Storage. Please use a modern Browser!', LOG_LEVEL.ERROR)
      }
    },

    setModeStartup: state => state.mode = appModes.STARTUP,
    setModeRemote:  state => state.mode = appModes.REMOTE,
    setModeEditor:  state => state.mode = appModes.EDITOR,

    setEditorModeMain:    state => state.editor.mode = editorModes.MAIN,
    setEditorModeAdd:     state => state.editor.mode = editorModes.ADD,
    setEditorModeDelete:  state => state.editor.mode = editorModes.DELETE,
    setEditorModeSave:    state => state.editor.mode = editorModes.SAVE,

    onWindowResize: state => {

      log("Window Resize")

      if(screen.width < 1024)
        state.editor.enabled = false
      else
        state.editor.enabled = true

      if(state.mode === appModes.EDITOR) {
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

    showHelp:   state => state.editor.help = true,
    hideHelp:   state => state.editor.help = false,
    toggleHelp: state => state.editor.help = state.editor.help ? false : true,

    editHighlight: (state, el) => {
      el.classList.add('app-highlight-edit')
      state.editor.data.item.el = el
    },

    clearEditHighlight: state => {
      if(state.mode === appModes.EDITOR) {
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

    clearDropHighlight: state => {
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

    clearEditItem:  state => state.editor.data.item = cloneDeep(defaults.editor.data.item),
    clearEditItems: state => state.editor.data.bulk = [],

    setReaperReady: (state, ready) => state.reaper.ready = ready,

    new: state => {
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
      log('Unloading webremote.')
      state.webremote = cloneDeep(defaults.webremote)
    },

    showSaveDialog: state => {
      state.editor.save_dialog = true
    },

    saveHTML: state => {
      log('Saving to HTML.')
      const webremote = cloneDeep(state.webremote)
      webremote.active_tab = 0
      const d = new Date()
      webremote.timestamp = d.getTime();
      // FIXME url encoding for S&WS actions
      const html = htmlTemplate.html(JSON.stringify(webremote)).replace(/\n|/g, '').replace(/>\s+</g, '><')
      const blob = new Blob([html], { type: "text/html;charset=utf-8" })
      saveAs(blob, webremote.title + '.html')
    },

    saveJSON: state => {
      log('Saving to JSON.')
      const webremote = cloneDeep(state.webremote)
      webremote.active_tab = 0
      const d = new Date()

      if(!state.storage.json)
        state.storage.json = cloneDeep(defaults.storage)

      if(typeof(webremote.timestamp) === 'undefined') {
        webremote.timestamp = d.getTime()
        state.storage.json.webremotes.push(webremote)
        log('Adding new JSON entry.')
      } else {

        let saved = false
        state.storage.json.webremotes.map((storageWebremote, index) => {
          if(storageWebremote.timestamp === webremote.timestamp) {
            log('Updating JSON entry.')
            state.storage.json.webremotes[index] = webremote
            saved = true
          }
        })

        // if we still haven't saved we're probably moving a existing webremote to json
        if(!saved) {
          log('Adding new JSON entry.')
          webremote.timestamp = d.getTime()
          state.storage.json.webremotes.push(webremote)
        }
      }
      const json = JSON.stringify(state.storage.json)
      const blob = new Blob([json], { type: "application/json" })
      saveAs(blob, "reaperwrb.json")
    },

    saveLocalStorage: state => {
      const d = new Date()
      if(state.storage.local_support) {
        log('Saving to local storage.')
        const webremote = cloneDeep(state.webremote)
        webremote.active_tab = 0

        if(typeof(webremote.timestamp) === 'undefined') {
          log('Adding new local entry.')
          webremote.timestamp = d.getTime()
          state.storage.local.webremotes.push(webremote)

        } else {

          let saved = false
          state.storage.local.webremotes.map((storageWebremote, index) => {
            if(storageWebremote.timestamp === webremote.timestamp) {
              log('Updateing local entry.')
              state.storage.local.webremotes[index] = webremote
              saved = true
            }
          })

          // if we still haven't saved we're probably saving html/json webremote to local storage
          if(!saved) {
            log('Adding new local entry.')
            webremote.timestamp = d.getTime()
            state.storage.local.webremotes.push(webremote)
          }
        }

        localStorage.setItem('REAPERWRB', JSON.stringify(state.storage.local))
      }
    },

    syncStorage: (state, payload) => {
      log('Syncing storage.')
      if(payload.type === 'local') {
        if(state.storage.local_support)
          localStorage.setItem('REAPERWRB', JSON.stringify(state.storage.local))
      }

      if(payload.type === 'json') {
        const json = JSON.stringify(state.storage.json)
        const blob = new Blob([json], { type: "text/plain;charset=utf-8" })
        saveAs(blob, "reaperwrb.json")
      }
    },

    deleteLocalStorage: state => {
      log("Deleting local storage!")
      localStorage.removeItem('REAPERWRB')
    },

    deleteWebremotePreset: (state, payload) => {
      state.storage[payload.type].webremotes.forEach((webremote, index) => {
        if(payload.title === webremote.title
        && payload.timestamp === webremote.timestamp) {
          log(`Deleting preset from ${payload.type} storage.`)
          state.storage[payload.type].webremotes.splice(index, 1)
        }
      })
    },

    fadeInLoader: state => {
      const loader = document.querySelector('#loader')
      loader.classList.remove('fadeOut')
      loader.classList.remove('hidden')
      loader.classList.add('fadeIn')
      document.body.style.overflow = 'hidden'

    },

    fadeOutLoader: state => {
      const loader = document.querySelector('#loader')
      loader.classList.remove('fadeIn')
      loader.classList.add('fadeOut')
      setTimeout(function() {
        document.querySelector('#loader').classList.add('hidden')
        document.body.style.overflow = 'auto'
      }, 1000)
    },

    logTabs: state => {
      const tabs = cloneDeep(state.webremote.tabs)
    },

    import: (state, payload) => {
      log("Importing data.")
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
      state.editor.data.item = cloneDeep(defaults.editor.data.item)
      state.webremote.active_tab = tab
    },

    switchRow: (state, row) => state.editor.active_row = row,

    toggleBulkEdit: state => {
      state.editor.data.item = cloneDeep(defaults.editor.data.item)
      state.editor.data.bulk = []
      state.editor.bulk_edit = state.editor.bulk_edit ? false : true
    },

    toggleExecActions: state => state.editor.exec_actions = state.editor.exec_actions ? false : true,

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

    cancelAddItem: state => {
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

    clearItemMoveCopy: state => state.editor.data.move = false,

    moveItem: state => {
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

    showDeleteDialog: state => {
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

    showBulkDeleteDialog: state => {
      state.editor.mode = editorModes.DELETE
      state.editor.data.bulk.forEach(item => item.el.classList.add('app-highlight-delete'))
    },

    cancelDelete: state => {
      state.editor.data.bin.el.classList.remove('app-highlight-delete')
      state.editor.data.bin.el.classList.add('app-highlight-edit')
      const el = document.querySelectorAll('.app-item')
      for(let i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-delete')
      }
      state.editor.data.bin = false
      state.editor.mode = editorModes.MAIN
    },

    cancelBulkDelete: state => {
      state.editor.data.bulk.forEach(item => {
        item.el.classList.remove('app-highlight-delete')
      })
      state.editor.mode = editorModes.MAIN
    },

    bulkDelete: state => {
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

    rowAdd: (state, row) => {
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

    execAction: (state, payload = { action: false, recur: false, midi_editor: false }) => {

      if(state.mode === appModes.EDITOR
        && !state.editor.exec_actions
        && typeof(payload.recur) === 'undefined')
        return

      if(state.reaper.ready) {
        if(payload.recur) {
          wwr_req_recur(payload.action, payload.recur)
        } else {
          if(!payload.midi_editor) {
            log("Executing action: ", payload.action)
            wwr_req(payload.action)
          } else {
            wwr_req('SET/EXTSTATE/reaperwrb/midi_editor/' + payload.action)
            wwr_req('_RSb693de04f86c744c19faefe7549e7f126a072b42')
          }
        }
        // update toggle state
        if(payload.toggle)
          wwr_req('GET/' + payload.action)
      }
    },

    cancelAction: (state, payload) => {
      if(state.reaper.ready)
        wwr_req_recur_cancel(payload.action)
    },

    getCmdStates: state => {

      if(state.reaper.ready && state.webremote.tabs[state.webremote.active_tab] !== undefined) {
        log('Updating command states!')
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

      if(state.mode === appModes.STARTUP) return

      const active_tab  = state.webremote.active_tab
      const tabs = state.webremote.tabs
      const rows = tabs[active_tab].rows

      const lines = result.trim().split("\n")

      lines.forEach(line => {

        if(line.match(/^TRANSPORT/)) {
          const data = line.split("\t").splice(1)
          state.reaper.transport = {
            online: true,
            playstate: parseInt(data[0]),
            repeat: parseInt(data[2]),
            position_seconds: parseFloat(data[1]).toFixed(2),
            position_string: data[3],
            position_string_beats: data[4]
          }
        }

        if(line.match(/^CMDSTATE/)) {
          const data = line.split("\t").splice(1)
          const [ action, state ] = data
          // FIXME async?
          rows.forEach(row => {
            row.forEach(item => {
              if(item.type === 'action' && item.toggle) {
                if(item.action === action)
                  item.state = state
              }
            })
          })

        }

        if(line.match(/^MARKER_LIST/) && !line.match(/^MARKER_LIST_END/))
          state.reaper.markers = []

        if(line.match(/^MARKER/) && !line.match(/^MARKER_LIST/)) {
          const data = line.split("\t").splice(1)
          const [ name, id, pos, color ] = data
          const marker = { name, id, pos, color }
          state.reaper.markers.push(marker)
        }

        if(line.match(/^MARKER_LIST_END/)) {
          if(state.reaper.transport.online) {

            let pos = Number(state.reaper.transport.position_seconds)
            let prevMarkerPos = 0
            
            state.reaper.marker_idx = 0

            state.reaper.markers.forEach((marker, index) => {
              let markerPos = Number(marker.pos)
              if(markerPos <= pos && markerPos > prevMarkerPos) {
                prevMarkerPos = markerPos
                state.reaper.marker_idx = index
              }
            })

            // log("Updated Marker List", LOG_LEVEL.INFO)
          }
        }

        if(line.match(/^REGION_LIST/) && !line.match(/^REGION_LIST_END/))
          state.reaper.regions = []

        if(line.match(/^REGION/) && !line.match(/^REGION_LIST/)) {
          const data = line.split("\t").splice(1)
          const [ name, id, pos, color ] = data
          const region = { name, id, pos, color }
          state.reaper.regions.push(region)
        }

        if(line.match(/^REGION_LIST_END/)) {
          if(state.reaper.transport.online) {

            let pos = Number(state.reaper.transport.position_seconds)
            let prevRegionPos = 0

            state.reaper.region_idx = 0
            state.reaper.regions.forEach((region, index) => {
              let regionPos = Number(region.pos)
              if(regionPos <= pos && regionPos > prevRegionPos) {
                prevRegionPos = regionPos
                state.reaper.region_idx = index
              }
            })

            // log("Updated Region List", LOG_LEVEL.INFO)
          }
        }

        if(line.match(/^TRACK/)) {
          const data = line.split("\t").splice(1)
          const [ 
            number, name, flags, vol, pan, 
            last_meter_peak, last_meter_pos, 
            width, panmode, 
            sendcnt, recvcnt, hwoutcnt,
            color
          ] = data

          const track = {
            name,
            number: parseInt(number),
            vol: parseFloat(vol),
            pan: parseFloat(pan),
            last_meter_peak: parseFloat(last_meter_peak),
            last_meter_pos: parseFloat(last_meter_pos),
            width: parseInt(width),
            panmode: parseInt(panmode),
            sendcnt: parseInt(sendcnt),
            recvcnt: parseInt(recvcnt),
            hwoutcnt: parseInt(hwoutcnt),
            color: parseInt(color),
            folder: parseInt(flags) & 1,
            selected: parseInt(flags) & 2,
            has_fx: parseInt(flags) & 4,
            muted: parseInt(flags) & 8,
            soloed: parseInt(flags) & 16,
            rec_armed: parseInt(flags) & 64,
            rec_mon_on: parseInt(flags) & 128,
            rec_mon_auto: parseInt(flags) & 256,
          }

          // clear track list before adding master track
          if(track.number === 0)
            state.reaper.tracks = []

          state.reaper.tracks.push(track)
        }

      }) // end foreach

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
      log('Web Remote API ready.')
      wwr_start()
      window.wwr_onreply = (result) => this.$store.commit('onReply', result)
      this.$store.commit('setReaperReady', reaperReady)

      // start update timer
      setInterval(() => this.$store.commit('getCmdStates'), this.$store.state.reaper.sync_interval)

    } else {
      log('REAPER API not ready!', LOG_LEVEL.ERROR)
    }

  },
})
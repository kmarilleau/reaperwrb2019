// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab, faBlogger } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { saveAs } from 'file-saver/FileSaver'

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '2018.1',
    reaper: {
      ready: false,
      transport: {
          playstate: 0,
          position_seconds: 0,
          repeat: 0,
          position_string: '0.0',
          position_string_beats: 0
      },
      markers: [],
      marker: 0,
      regions: [],
      region: 0,
    }, 
    editor: {
      enabled: true,
      menu: false,
      delete_dialog: false,
      bulk_edit: false,
      move_item: false,
      edit_item: false,
      edit_items: [],
      delete_item: false,
    },
    columns: 8,
    active_tab: 0,
    active_row: 0,
    tabs: [],
  },

  getters: {

  },

  mutations: {

    clearEditHighlight: (state) => {
      let el = document.getElementsByClassName('app-highlight-edit')
      for(var i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-edit')
      }
    },

    setReaperReady: (state, ready) => state.reaper.ready = ready,

    new: (state) => {
      state.tabs.push({
        type: 'tab',
        label: 'new',
        bgcolor: '#525252',
        textcolor: '#f0f0f0',
        rows: [[]]
      })
    },

    save: (state) => {
      console.log("SAVING WEB REMOTE ")
      const saveState = cloneDeep(state)
      saveState.editor.enabled = false
      const json = JSON.stringify(saveState)
      let html = `<!DOCTYPE html><html><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><title>ReaperWRB</title><meta name=viewport content="width=device-width,initial-scale=1"><script src=main.js></script><link href=/reaperwrb/css/app.css rel=stylesheet></head><body><div id=reaperwrb-json>${ json }</div><div id=app></div><script type=text/javascript src=/reaperwrb/js/manifest.js></script><script type=text/javascript src=/reaperwrb/js/vendor.js></script><script type=text/javascript src=/reaperwrb/js/app.js></script></body></html>`
      let blob = new Blob([html], { type: "text/html;charset=utf-8" })
      saveAs(blob, "mywebremote.html")
    },
    
    import: (state, data) => {
      if(state.tabs.length <= 0)
        state.tabs = data
      else
        data.forEach(tab => state.tabs.push(tab))
    },

    switchTab: (state, tab) => {
      state.editor.edit_item = false

      if(state.editor.delete_dialog)
        store.commit('cancel_delete')

      let el = document.getElementsByClassName('app-highlight-edit')
      for(var i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-edit')
      }
      state.active_tab = tab
    },

    switchRow: (state, row) => state.active_row = row,
    showEditor: (state) => state.editor.toggle = true, 
    enableEditor: (state, enabled) => state.editor.enabled = enabled,

    toggleBulkEdit: (state) => {
      state.editor.edit_item = false
      state.editor.edit_items = []
      state.editor.bulk_edit = state.editor.bulk_edit ? false : true;
    },

    bulkEditAdd: (state, data) => {
      state.editor.edit_items.push(data)
    },

    bulkEditRemove: (state, data) => {
      state.editor.edit_items = state.editor.edit_items.filter((item) => {
        return item.index == data.index && item.row == data.row ? false : true
      })
    },

    showItemMenu: (state) => {
      state.editor.menu = true
    },

    // FIXME
    setColumns: (state, columns) => {
      state.columns.desktop = columns
    },
    
    clear: state => {
      state.tabs = []
      state.active_tab = 0
      // FIXME
      state.editor.edit_item = { bgcolor: '', textcolor: ''}
      state.editor.edit_items = []
      state.editor.bulk_edit = false
    },

    addItem: (state, type) => {
      let item = {}

      switch(type) {

        // FIXME load from defaults file
        case 'action':
          item = {
            type: 'action',
            label: 'label',
            labelpos: 0,
            action: 0,
            textcolor: '#f0f0f0',
            bgcolor: '#424242',
            toggle: false,
            toggled: false,
            icon: null,
            toggleicon: null,
            desc: '',
            width: 1
          }
          break

        case 'spacer':
          item = {
            type: 'spacer',
            bgcolor: '#424242',
            width: 1,
          }
          break

        case 'transport':
          item = {
            type: 'transport',
            bgcolor: 'rgb(22, 165, 165)',
            textcolor: '#f0f0f0',
            width: 4,
            minwidth: 4,
          }
          break

        case 'position':
          item = {
            type: 'position',
            bgcolor: 'rgb(22, 165, 165)',
            textcolor: '#f0f0f0',
            width: 4,
            minwidth: 4,
          }
          break

        case 'markers':
          item = {
            type: 'markers',
            bgcolor: '#424242',
            textcolor: '#f0f0f0',
            width: 4,
            minwidth: 4,
          }
          break

        case 'regions':
          item = {
            type: 'regions',
            bgcolor: '#424242',
            textcolor: '#f0f0f0',
            width: 4,
            minwidth: 4,
          }
          break
      }
      
      const row = state.tabs[state.active_tab].rows[state.active_row]
      row.push(item)
      state.editor.edit_item = row[row.length - 1  ]
      state.editor.menu = false
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
          item: state.tabs[state.active_tab].rows[data.row][data.index]
        }
        state.editor.item_move_target_tab = data.target_tab
      } else {
        state.editor.move_item = false
      }
    },

    moveItem: (state) => {
      if(state.active_tab !== state.editor.move_item.target_tab && state.editor.move_item) {
        const tab = state.editor.move_item.target_tab
        const row = state.tabs[tab].rows.length - 1
        state.tabs[tab].rows[row].push(state.editor.move_item.item)
        state.tabs[state.active_tab].rows[state.editor.move_item.row].splice(state.editor.move_item.index, 1)
        state.active_tab = tab
        state.editor.move_item = false
      }
    },

    edit: (state, data) => {
      data.el.classList.add('app-highlight-edit')
      if(data.item.type === 'tab') {
        state.editor.edit_item = state.tabs[data.index]
        state.active_tab = data.index
      } else {
        state.editor.edit_item = state.tabs[state.active_tab].rows[data.row][data.index]
      }
    },

    showDeleteDialog: (state, item) => {
      state.editor.delete_dialog = true
      state.editor.delete_item = item
      state.editor.delete_item.el.classList.add('app-highlight-delete')
      if(item.data.type === 'tab') {
        let el = document.getElementsByClassName('app-item')
        for(var i = 0; i < el.length; i++) {
          el[i].classList.add('app-highlight-delete')
        }
      }
    },

    cancelDelete: (state) => {
      // FIXME clean-up
      state.editor.delete_item.el.classList.remove('app-highlight-delete')
      let el = document.getElementsByClassName('app-item')
      for(var i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-delete')
      }
      state.editor.delete_item = false,
      state.editor.delete_dialog = false
    },

    delete: (state, keepItems) => {

      state.editor.delete_item.el.classList.remove('app-highlight-delete')

      switch(state.editor.delete_item.data.type) {
        
        case 'tab':
          let el = document.getElementsByClassName('app-item')
          for(var i = 0; i < el.length; i++) {
            el[i].classList.remove('app-highlight-delete')
          }

          let rows
          let tab = state.editor.delete_item.index

          if(keepItems) {
            rows = state.tabs[tab].rows
            const targetTab = tab >= 1 ? tab - 1 : state.tabs.length - 1
            rows.forEach(row => { state.tabs[targetTab].rows.push(row)})
          }

          // delete the tab
          state.tabs.splice(state.editor.delete_item.index, 1)
          
          // switch to correct tab
          if(keepItems) {
            if(tab === 0)
              state.active_tab = state.tabs.length - 1
            else
              state.active_tab = tab - 1
          } else {
            if(tab > 0 && tab < state.tabs.length)
              state.active_tab = tab
            else if(tab >= state.tabs.length)
              state.active_tab = state.tabs.length -1
            else
              state.active_tab = 0
          }

          break

        case 'row':

          let items = false
          if(keepItems)
            items = state.tabs[state.active_tab].rows[state.editor.delete_item.row]

          state.tabs[state.active_tab].rows.splice(state.editor.delete_item.row, 1)
          if(state.tabs[state.active_tab].rows.length === 0)
            state.tabs[state.active_tab].rows.push([])
          
          if(items)
            items.forEach(item => { state.tabs[state.active_tab].rows[0].push(item)})
          
          break

        default:
          state.tabs[state.active_tab].rows[state.editor.delete_item.row].splice(state.editor.delete_item.index, 1)
          break
        }

        state.editor.edit_item = false
        state.editor.delete_dialog = false
      },

    addRow: (state, row) => {
      state.tabs[state.active_tab].rows.splice(row + 1, 0, [])
    },

    addTab: (state, tab) => {
      state.tabs.push({
        type: 'tab',
        label: 'new',
        bgcolor: '#424242',
        textcolor: '#f0f0f0f',
        rows: [[]]  
      })

      state.active_tab = state.tabs.length - 1
      state.editor.edit_item = state.tabs[state.active_tab]
    },

    updateItem: (state, data) => state.editor.edit_item[data.key] = data.val,

    updateItems: (state, data) => {
      state.editor.edit_items.forEach(item => item.item[data.key] = data.val)
    },

    updateRow: (state, data) => {
      Vue.set(state.tabs[state.active_tab].rows, data.row, data.value)
    },

    updateTabs: (state, data) => {
      Vue.set(state, 'tabs', data)
    },

    onReply: (state, result) => {
      console.log(result)

      if(result.match('TRANSPORT')) {
        const data = result.trim().split("\n")[0].split("\t")
        data.splice(0,1)
        state.reaper.transport = {
          playstate: parseInt(data[0]), // 
          position_seconds: data[1],
          repeat: parseInt(data[2]),
          position_string: data[3],
          position_string_beats: data[4]
        }
      }

      if(result.match('MARKER_LIST')) {
        const data = result.trim().split("\n")
        state.reaper.markers = data
          .filter(function (item) {
            return !item.match('MARKER_LIST') && !item.match('MARKER_LIST_END')
          })
          .map(function (item) {
            let data = item.split('\t')
            return {
              name: data[1],
              id: data[2],
              pos: data[3],
              color: data[4]
            }
          })
      }

      if(result.match('REGION_LIST')) {
        const data = result.trim().split("\n")
        state.reaper.regions = data
          .filter(function (item) {
            return !item.match('REGION_LIST') && !item.match('REGION_LIST_END')
          })
          .map(function (item) {
            let data = item.split('\t')
            return {
              name: data[1],
              id: data[2],
              pos: data[3],
              color: data[4]
            }
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
  created: function() {
    const reaperReady = typeof(wwr_start) === 'function' ? true : false
    if(reaperReady) {
      console.log("ReaperWRB: REAPER API READY")
      wwr_start()
      window.wwr_onreply = (result) => this.$store.commit('onReply', result)
      this.$store.commit('setReaperReady', reaperReady)
    } else {
      console.log('ReaperWRB ERROR: REAPER API NOT READY')
    }

    let json = document.getElementById('reaperwrb-json')
    if(typeof(div) !== 'undefined') {
      // FIXME load stored data
      let data = JSON.parse(document.getElementById('reaperwrb-json').innerHTML)
      this.$store.commit('import', data.tabs)
      this.$store.commit('enable_editor', false)
    }
  }
})
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { saveAs } from 'file-saver/FileSaver'
import defaults from '@/defaults'
import webremote from '@/webremote'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
dom.watch()
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '2019.1',
    startup: true,
    has_local_storage: false,
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
      region: 0,
    }, 
    editor: {
      enabled: false,
      exec_actions: false,
      menu: false,
      delete_dialog: false,
      save_dialog: false,
      bulk_edit: false,
      move_item: false,
      edit_item: false,
      edit_items: [],
      delete_item: false,
      active_row: 0,
    },
    transfer: {
      okay: false,
      timeout: 100,
      data: []
    },
    webremote: {
      columns: 8,
      active_tab: 0,
      tabs: []
    },
    local_storage: {}
  },

  getters: {},

  mutations: {

    clearEditHighlight: (state) => {
      // FIXME use el in edit_item reference
      let el = document.querySelectorAll('.app-highlight-edit')
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

    clearEditItem: (state) => state.editor.edit_item = false,
    clearEditItems: (state) => state.editor.edit_items = [],

    setReaperReady: (state, ready) => state.reaper.ready = ready,

    launchEditor: (state) => {
      state.startup = false
      state.editor.enabled = true
    },

    new: (state) => {
      const newWebremote = cloneDeep(defaults.webremote)
      const newTab = cloneDeep(defaults.tab)
      newTab.rows.push([])
      newWebremote.tabs.push(newTab)
      state.webremote = newWebremote
      state.editor.edit_item = state.webremote.tabs[0]
    },

    showSaveDialog: (state) => {
      state.editor.save_dialog = true
    },

    cancelSave: (state) => {
      state.editor.save_dialog = false
    },

    skipStartup: (state) => {
      state.startup = false
    },

    saveHTML: (state) => {
      // FIXME ugly
      console.log('REAPERWRB: SAVING WEB REMOTE!')
      const saveState = cloneDeep(state)
      saveState.editor.enabled = false
      saveState.editor.edit_item = false
      saveState.editor.edit_items = []
      savestate.webremote.active_tab = 0
      const json = JSON.stringify(saveState)
      const html = webremote.html(json).replace(/\n|/g, '').replace(/>\s+</g, '><')
      let blob = new Blob([html], { type: "text/html;charset=utf-8" })
      saveAs(blob, "mywebremote.html")
    },

    saveJSON: (state) => {
      // check if we already have a JSON file
      // check if webremote with same name exists already
      // add data
    },

    checkLocalStorageSupport: (state) => {
      if(typeof(Storage) !== 'undefined') {
        state.has_local_storage = true
        console.log('REAPERWRB: Local storage support enabled.')
        if(!localStorage.getItem('REAPERWRB')) {
          console.log('REAPERWRB: No Local Storage Instance. Creating new.')
          const storage = cloneDeep(defaults.storage)
          localStorage.setItem('REAPERWRB', JSON.stringify(storage))
        } else {
          console.log('REAPERWRB: Loading Local Storage.')
          state.local_storage = JSON.parse(localStorage.getItem('REAPERWRB'))
        }
      } else {
        state.has_local_storage = false
        console.log('REAPERWRB ERROR: Browser does not support Local Storage. Please use a modern Browser!')
      }
    },

    saveLocalStorage: (state) => {
      // check if we have a local storage already
      // check if a webremote with the same name exists
      // add data
      if(state.has_local_storage) {
        console.log('REAPERWRB: Saving to Local Storage.')
        //const local = JSON.parse(localStorage.getItem('REAPERWRB'))
        //console.log(local)
        const webremote = cloneDeep(state.webremote)
        // FIXME check if a webremote with the same name already exists
        //const labels = state.local_storage.webremotes.map(webremote => webremote.label)
        //console.log(labels)

        const d = new Date()
        webremote.time_created = d.getTime()
        state.local_storage.webremotes.push(webremote)
        localStorage.setItem('REAPERWRB', JSON.stringify(state.local_storage))
      }
    },

    deleteLocalStorage: (state, label) => {
      localStorage.removeItem('REAPERWRB')
    },

    logTabs: (state) => {
      const tabs = cloneDeep(state.webremote.tabs)
      console.log(JSON.stringify(cloneDeep(tabs)))
    },
    
    // FIXME
    import: (state, data) => {
      console.log("REAPERWRB: Importing data.")
      if(state.webremote.tabs.length === 0)
        state.webremote = data
      else
        data.tabs.forEach(tab => state.webremote.tabs.push(tab))
    },

    switchTab: (state, tab) => {
      state.editor.edit_item = false

      if(state.editor.delete_dialog)
        store.commit('cancel_delete')

      state.webremote.active_tab = tab
    },

    switchRow: (state, row) => state.editor.active_row = row,
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
      state.editor.edit_item = row[row.length - 1]
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

    edit: (state, data) => {
      data.el.classList.add('app-highlight-edit')
      if(data.item.type === 'tab') {
        state.editor.edit_item = state.webremote.tabs[data.index]
        state.webremote.active_tab = data.index
      } else {
        state.editor.active_row = data.row
        state.editor.edit_item = state.webremote.tabs[state.webremote.active_tab].rows[data.row][data.index]
      }
    },

    showDeleteDialog: (state, item) => {
      state.editor.delete_dialog = true
      state.editor.delete_item = item
      state.editor.delete_item.el.classList.add('app-highlight-delete')

      if(item.data.type === 'tab') {
        let el = document.querySelectorAll('.app-item')
        for(let i = 0; i < el.length; i++) {
          el[i].classList.add('app-highlight-delete')
        }
      }
    },

    showBulkDeleteDialog: (state) => {
      state.editor.delete_dialog = true
      state.editor.edit_items.forEach(item => item.el.classList.add('app-highlight-delete'))
    },

    cancelDelete: (state) => {
      state.editor.delete_item.el.classList.remove('app-highlight-delete')
      let el = document.querySelectorAll('.app-item')
      for(let i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-delete')
      }
      state.editor.delete_item = false,
      state.editor.delete_dialog = false
    },

    cancelBulkDelete: (state) => {
      state.editor.edit_items.forEach(item => item.el.classList.remove('app-highlight-delete'))
      state.editor.delete_dialog = false
    },

    bulkDelete: (state) => {
      state.editor.edit_items.forEach(edit_item => {
        edit_item.el.classList.remove('app-highlight-delete')
        edit_item.el.querySelector('.app-editor-checkbox').checked = false

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

      state.editor.edit_items = []
      state.editor.delete_dialog = false
    },

    delete: (state, keepItems) => {

      state.editor.delete_item.el.classList.remove('app-highlight-delete')

      switch(state.editor.delete_item.data.type) {
        
        case 'tab':
          let el = document.querySelectorAll('.app-item')
          for(let i = 0; i < el.length; i++) {
            el[i].classList.remove('app-highlight-delete')
          }

          let rows
          let tab = state.editor.delete_item.index

          if(keepItems) {
            rows = state.webremote.tabs[tab].rows
            const targetTab = tab >= 1 ? tab - 1 : state.webremote.tabs.length - 1
            rows.forEach(row => { state.webremote.tabs[targetTab].rows.push(row)})
          }

          // delete the tab
          state.webremote.tabs.splice(state.editor.delete_item.index, 1)
          
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
            items = state.webremote.tabs[state.webremote.active_tab].rows[state.editor.delete_item.row]

          state.webremote.tabs[state.webremote.active_tab].rows.splice(state.editor.delete_item.row, 1)
          if(state.webremote.tabs[state.webremote.active_tab].rows.length === 0)
            state.webremote.tabs[state.webremote.active_tab].rows.push([])
          
          if(items)
            items.forEach(item => { state.webremote.tabs[state.webremote.active_tab].rows[0].push(item) })
          
          break

        default:
          state.webremote.tabs[state.webremote.active_tab].rows[state.editor.delete_item.row].splice(state.editor.delete_item.index, 1)
          break
        }

        state.editor.edit_item = false
        state.editor.delete_dialog = false
      },

    addRow: (state, row) => {
      state.webremote.tabs[state.webremote.active_tab].rows.splice(row + 1, 0, [])
    },

    addTab: (state, tab) => {
      const newTab = cloneDeep(defaults.tab)
      newTab.rows.push([])
      state.webremote.tabs.push(newTab)
      state.webremote.active_tab = state.webremote.tabs.length - 1
      state.editor.edit_item = state.webremote.tabs[state.webremote.active_tab]
    },

    updateItem: (state, data) => state.editor.edit_item[data.key] = data.val,

    updateItems: (state, data) => {
      state.editor.edit_items.forEach(item => item.item[data.key] = data.val)
    },

    updateRow: (state, data) => {
      Vue.set(state.webremote.tabs[state.webremote.active_tab].rows, data.row, data.value)
    },

    updateTabs: (state, data) => {
      Vue.set(state, 'tabs', data)
    },

    execAction: (state, data) => {

      if(state.editor.enabled && !state.editor.exec_actions && !data.recur)
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
        console.log('REAPERWRB: UPDATING COMMAND STATES!')
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
  created: function() {

    this.$store.commit('checkLocalStorageSupport')

    const reaperReady = typeof(wwr_start) === 'function' ? true : false
    if(reaperReady) {
      console.log('ReaperWRB: REAPER API READY')
      wwr_start()
      window.wwr_onreply = (result) => this.$store.commit('onReply', result)
      this.$store.commit('setReaperReady', reaperReady)
    } else {
      console.log('ReaperWRB ERROR: REAPER API NOT READY')
    }
  }
})
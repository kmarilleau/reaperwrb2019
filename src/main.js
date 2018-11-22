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
      markers: [
        // FIXME remove me
        { name: 'maker 1', id: 0, pos: '1', color: '#424242' },
        { name: 'maker 2', id: 1, pos: '2', color: '#424242' },
        { name: 'maker 3', id: 2, pos: '3', color: '#424242' },
        { name: 'maker 4', id: 3, pos: '4', color: '#424242' },
        { name: 'maker 5', id: 4, pos: '5', color: '#424242' },
        { name: 'maker 6', id: 5, pos: '6', color: '#424242' },
      ],
      regions: false,
    }, 
    editor: {
      enabled: true,
      toggle: false,
      // FIXME niceify
      menu: false,
      delete_dialog: false
    },
    // FIXME move to editor
    active_tab: 0,
    active_row: 0,
    edit_item: false,
    delete_item: false,
    tabs: [],
    clearEditHightlight: () => {
      let el = document.getElementsByClassName('app-highlight-edit')
      for(var i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-edit')
      }
    },
  },

  mutations: {
    set_reaper_api: (state, ready) => state.reaper.ready = ready,

    save_html: (state) => {
      console.log("SAVING WEB REMOTE ")
      const saveState = cloneDeep(state)
      saveState.editor.enabled = false
      const json = JSON.stringify(saveState)
      let html = `<!DOCTYPE html><html><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><title>ReaperWRB</title><meta name=viewport content="width=device-width,initial-scale=1"><script src=main.js></script><link href=/reaperwrb/css/app.css rel=stylesheet></head><body><div id=reaperwrb-json>${ json }</div><div id=app></div><script type=text/javascript src=/reaperwrb/js/manifest.js></script><script type=text/javascript src=/reaperwrb/js/vendor.js></script><script type=text/javascript src=/reaperwrb/js/app.js></script></body></html>`
      let blob = new Blob([html], { type: "text/html;charset=utf-8" })
      saveAs(blob, "mywebremote.html")
    },

    load_state: (state, data) => {
      state = data
    },
    
    new: (state) => {
      state.tabs.push({
        type: 'tab',
        label: 'new',
        bgcolor: '#525252',
        textcolor: '#f0f0f0',
        rows: [[]]
      })
    },

    import: (state, data) => {
      if(state.tabs.length <= 0)
        state.tabs = data
      else
        data.forEach(tab => state.tabs.push(tab))
    },

    switch_tab: (state, tab) => {
      state.edit_item = false
      state.clearEditHightlight()
      let el = document.getElementsByClassName('app-highlight-edit')
      for(var i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-edit')
      }
      state.active_tab = tab
    },

    switch_row: (state, row) => state.active_row = row,
    toggle_editor: (state) => state.editor.toggle = state.editor.toggle ? false : true,
    show_editor: (state) => state.editor.toggle = true, 
    enable_editor: (state, enabled) => state.editor.enabled = enabled,

    show_menu: (state) => {
      state.clearEditHightlight()
      state.editor.menu = true
    },
    
    clear: state => {
      state.tabs = []
      state.active_tab = 0
      state.edit_item = { bgcolor: '', textcolor: ''}
    },

    add_item: (state, type) => {
      let item = {}

      switch(type) {

        case 'action':
          item = {
            type: 'action',
            label: 'label',
            action: 0,
            color: '#f0f0f0',
            bgcolor: '#424242',
            toggle: false,
            icon: null,
            toggleicon: null,
            desc: ''
          }
          break

        case 'spacer':
          item = {
            type: 'spacer',
            bgcolor: '#424242'
          }
          break

        case 'transport':
          item = {
            type: 'transport',
            bgcolor: '#424242',
            textcolor: '#f0f0f0'
          }
          break

        case 'markers':
          item = {
            type: 'markers',
            bgcolor: '#424242',
            textcolor: '#f0f0f0'
          }
          break

        case 'regions':
          item = {
            type: 'regions',
            bgcolor: '#424242',
            textcolor: '#f0f0f0'
          }
          break
      }
      
      const row = state.tabs[state.active_tab].rows[state.active_row]
      row.push(item)
      state.edit_item = row[row.length - 1  ]
      state.editor.menu = false
    },

    edit_item: (state, item) => {
      state.clearEditHightlight()
      console.log(item.el)
      item.el.classList.add('app-highlight-edit')
      if(item.data.type === 'tab') {
        state.edit_item = state.tabs[item.index]
        state.active_tab = item.index
      } else {
        state.edit_item = state.tabs[state.active_tab].rows[item.row][item.index]
      }
    },

    show_delete_dialog: (state, item) => {
      state.editor.delete_dialog = true
      state.delete_item = item
      state.delete_item.el.classList.add('app-highlight-delete')
      if(item.data.type === 'tab') {
        let el = document.getElementsByClassName('app-item')
        for(var i = 0; i < el.length; i++) {
          el[i].classList.add('app-highlight-delete')
        }
      }
    },

    cancel_delete: (state) => {
      // FIXME clean-up
      state.delete_item.el.classList.remove('app-highlight-delete')
      let el = document.getElementsByClassName('app-item')
      for(var i = 0; i < el.length; i++) {
        el[i].classList.remove('app-highlight-delete')
      }
      state.delete_item = false,
      state.editor.delete_dialog = false
    },

    delete_item: (state, keepItems) => {

      state.delete_item.el.classList.remove('app-highlight-delete')

      switch(state.delete_item.data.type) {
        
        case 'tab':
          // FIXME not working when first tab ist deleted
          let el = document.getElementsByClassName('app-item')
          for(var i = 0; i < el.length; i++) {
            el[i].classList.remove('app-highlight-delete')
          }

          let rows
          if(keepItems) {
            let tab = state.delete_item.index
            rows = state.tabs[tab].rows
            if(tab >= 1) {
              rows.forEach(row => { state.tabs[tab - 1].rows.push(row)})
            }
          }
          state.tabs.splice(state.delete_item.index, 1)
          state.active_tab = state.tabs.length - 1
          break

        case 'row':

          let items = false
          if(keepItems)
            items = state.tabs[state.active_tab].rows[state.delete_item.row]

          state.tabs[state.active_tab].rows.splice(state.delete_item.row, 1)
          if(state.tabs[state.active_tab].rows.length === 0)
            state.tabs[state.active_tab].rows.push([])
          
          if(items)
            items.forEach(item => { state.tabs[state.active_tab].rows[0].push(item)})
          
          break

        default:
          state.tabs[state.active_tab].rows[state.delete_item.row].splice(state.delete_item.index, 1)
          break
        }

        state.edit_item = false
        state.editor.delete_dialog = false
      },

    add_row: (state, row) => {
      state.tabs[state.active_tab].rows.splice(row + 1, 0, [])
    },

    add_tab: (state, tab) => {
      state.tabs.push({
        type: 'tab',
        label: 'new',
        bgcolor: '#424242',
        textcolor: '#f0f0f0f',
        rows: [[]]  
      })

      state.active_tab = state.tabs.length - 1
      state.edit_item = state.tabs[state.active_tab]
    },

    clear_highlight: (state, data) => {
      state.clearEditHightlight()
      state.edit_item = false
    },

    update_item: (state, data) => state.edit_item[data.key] = data.val,

    update_row: (state, data) => {
      state.clearEditHightlight()
      Vue.set(state.tabs[state.active_tab].rows, data.row, data.value)
    },

    reaper_onreply: (state, result) => {
      // console.log(result)

      if(result.match('TRANSPORT')) {
        const data = result.trim().split("\n")[0].split("\t")
        data.splice(0,1)
        state.reaper.transport = {
          playstate: parseInt(data[0]), // 
          position_seconds: data[1],
          repeat: parseInt(data[2]),
          position_string: parseFloat(data[3]),
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
    const reaper_api = typeof(wwr_start) === 'function' ? true : false
    if(reaper_api) {
      console.log("ReaperWRB: REAPER API READY")
      wwr_start()
      window.wwr_onreply = (result) => this.$store.commit('reaper_onreply', result)
      this.$store.commit('set_reaper_api', reaper_api)
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
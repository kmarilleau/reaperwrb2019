'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/icons/'
import { log, LOG_LEVEL, DEBUG_LOG } from '@/lib/log'

Vue.config.productionTip = false

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
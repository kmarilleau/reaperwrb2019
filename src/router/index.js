import Vue from 'vue'
import Router from 'vue-router'
import ReaperWRB from '@/components/ReaperWRB'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ReaperWRB',
      component: ReaperWRB,
      alias: '*'
    }
  ]
})

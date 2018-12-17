import Vue from 'vue'
import Router from 'vue-router'
import tab from '../components/tab/tab'

import vuex from 'vuex'
Vue.use(vuex);

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/tab',
      name: 'tab',
      component: tab
    },
    {
      path: '/',
      name: 'swiper',
      component: resolve => require(['../components/swiper'], resolve)
    }
  ]
})


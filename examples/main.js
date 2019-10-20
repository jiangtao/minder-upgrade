/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue'
import Router from 'vue-router'
import App from './app.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/editor',
      name: 'editor',
      component: (resolve) => {
        require(['./routers/editor'], resolve)
      }
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

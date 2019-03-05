import Vue from 'vue'

import '@/plugins/vuetify'
import '@/plugins/sweetalert'
import '@/utils/filters'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

require('@/components')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

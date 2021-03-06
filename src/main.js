import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import toast from './plugins/toast'
import store from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')

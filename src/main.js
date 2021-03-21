import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
};

Vue.use(Toast, options);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

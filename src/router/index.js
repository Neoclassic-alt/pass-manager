import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../App.vue'
import MyPasses from '../views/MyPasses.vue'
import PassEdit from '../views/PassEditNew.vue'
import PassAdd from '../views/PassAdd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/mypasses',
    component: MyPasses
  },
  {
    path: '/mypasses/edit/:id',
    component: PassEdit
  },
  {
    path: '/mypasses/add',
    component: PassAdd
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

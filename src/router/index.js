import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from '../views/MainPage.vue'
import MyPasses from '../views/MyPasses.vue'
import PassEdit from '../views/PassEditNew.vue'
import PassAdd from '../views/PassAdd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainPage
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

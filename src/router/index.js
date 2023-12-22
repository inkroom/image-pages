import Vue from 'vue'
import VueRouter from 'vue-router'

import Album from './cover'
import Images from './images';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Album
  },
  {
    path: '/:album',
    name: '/album',
    component: Images
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

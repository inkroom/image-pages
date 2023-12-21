import Vue from 'vue'
import VueRouter from 'vue-router'

import Album from '@/components/album/cover'
import Images from '@/components/album/images';
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

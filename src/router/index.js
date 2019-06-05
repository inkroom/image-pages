import Vue from 'vue'
import Router from 'vue-router'
import Album from '@/components/album/cover'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: '/',
      component: Album
    }
  ],

})

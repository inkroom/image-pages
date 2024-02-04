import { createRouter, createWebHistory } from 'vue-router'
import Album from './cover.vue'
import Images from './images.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Album from './cover'
import Images from './images';
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

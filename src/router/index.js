import Vue from 'vue'
import Router from 'vue-router'


import { Loading } from "element-ui";


import Album from '@/components/album/cover'
import Images from '@/components/album/images';
Vue.use(Router)


const router = new Router({
  mode: 'hash',
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
  ],

})

// let loading = null;

// router.beforeEach((to, from, next) => {
//   loading = Loading.service({
//     text: "正在努力加载中..."
//   });
//   next();
// })

// router.afterEach((to, from) => {
//   loading.close();
// })

export default router;

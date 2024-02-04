

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ViewUIPlus,{Spin} from 'view-ui-plus'
import '@/style/style.less'


window.startLoading = ()=>{
    console.log("loadingssss")
  //   Spin.show({
  //     render: (h) => {
  //         return h('div', [
  //             h('Icon', {
  //                 'class': 'demo-spin-icon-load',
  //                 props: {
  //                     type: 'ios-loading',
  //                     size: 18
  //                 }
  //             }),
  //             h('div', '正在努力加载中...')
  //         ])
  //     }
  // })
  }
  
  window.hide=()=>{
  //   Spin.hide();
  }
  
  startLoading();

const app = createApp(App)

app.use(router).use(ViewUIPlus)

app.mount('#app')

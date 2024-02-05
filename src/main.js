

import { createApp,ref } from 'vue'
import App from './App.vue'
import router from './router'
import ViewUIPlus,{Spin} from 'view-ui-plus'
import '@/style/style.less'

window.loading_status = ref(true);
window.loading= (()=>{
  return {
    start:()=>{
      window.loading_status = true;
       Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'ios-loading',
                        size: 18
                    }
                }),
                h('div', '正在努力加载中...')
            ])
        }
    })
    },
    hide:()=>{
      Spin.hide();
      window.loading_status = false;
    }
  }
})();

window.loading.start();

const app = createApp(App)

app.use(router).use(ViewUIPlus)

app.mount('#app')

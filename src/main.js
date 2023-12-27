import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ViewUIPlus,{Spin} from 'view-ui-plus'
import '@/style/style.less'
// import 'view-ui-plus/dist/styles/viewuiplus.css'
// import ElementPlus from 'element-plus'
// import { ElLoading } from 'element-plus'

// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'

// import '@/style/style.css';

let loadingInstance = false;

// loadingInstance = ElLoading.service({
//   text: "正在努力加载中..."
// });


window.startLoading = ()=>{
  console.log("loadingssss")
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
}

window.hide=()=>{
  Spin.hide();
}

startLoading();

createApp(App).use(router).use(ViewUIPlus).mount('#app')

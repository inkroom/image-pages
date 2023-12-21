import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-dark';// 只用这个有图标丢失，可能是因为太久不更新了
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(Vuex)

let loadingInstance = false;

loadingInstance = ElementUI.Loading.service({
  text: "正在努力加载中..."
});

let store = new Vuex.Store({
  state: {
    loading: true
  },
  getters: {
  },
  mutations: {
    loading(state,loading){
      state.loading = loading;
      if(loading){
        loadingInstance = ElementUI.Loading.service({
          text: "正在努力加载中..."
        });
      }else{
        console.log('关闭loading')
                loadingInstance &&  loadingInstance.close();
                loadingInstance = null;

      }
    }
  },
  actions: {
  },
  modules: {
  }
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

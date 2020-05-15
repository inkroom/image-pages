// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import router from './router'


import ElementUI from 'element-ui'
import 'element-theme-dark';
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// import { Loading } from ElementUI;

let loadingInstance = false;

loadingInstance = ElementUI.Loading.service({
  text: "正在努力加载中..."
});

const store = new Vuex.Store({
  state: {
    loading: true
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
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

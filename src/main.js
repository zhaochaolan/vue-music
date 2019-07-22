// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    //不可顺意更改 能在任何组件中使用
    musicList:[]
  },
  //改变state里面的数据
  mutations:{
    //仓库数据初始化
    INITMUSIC(state,data){
      state.musicList = data;
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

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
// import axios from "./axios";
import request from "./axios";
Vue.prototype.$axios = request
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)
Vue.config.productionTip = false
require('./mock.js')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

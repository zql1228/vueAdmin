import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menus'
// import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {},
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    resetState: (state) => {
      state.token = ''
    },
  },
  actions: {},
  modules: {
    //modules的用法
    menus,
  },
  // plugins: [persistedState({ storage: window.sessionStorage })],
})

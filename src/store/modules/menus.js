import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    hasRoute: false,
    menuList: [],
    permList: [],
    editableTabsValue: 'Index',
    editableTabs: [
      {
        title: '首页',
        name: 'Index',
      },
    ],
  },
  getters: {},
  mutations: {
    setMenuList(state, menus) {
      state.menuList = menus
    },
    setPermList(state, perms) {
      state.permList = perms
    },
    changeRouteStatus(state, hasRoute) {
      state.hasRoute = hasRoute
      sessionStorage.setItem('hasRoute', hasRoute)
    },
    addTab(state, tab) {
      //tab切换还存在问题？
      let index = state.editableTabs.findIndex((e) => e.name == tab.name)
      if (index === -1) {
        state.editableTabs.push({
          title: tab.title,
          name: tab.name,
        })
        state.editableTabsValue = tab.name
        //console.log(state.editableTabs)
      }
    },
  },
  actions: {},
}

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import axios from 'axios'
import store from '../store'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '首页',
        },
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        meta: {
          title: '个人中心',
        },
        component: () => import('../views/UserCenter.vue'),
      },
      // {
      //   path: '/sys/users',
      //   name: 'sysUser',
      //   meta: {
      //     title: '用户管理',
      //   },
      //   component: () => import('../views/sys/User.vue'),
      // },
      // {
      //   path: '/sys/roles',
      //   name: 'sysRole',
      //   meta: {
      //     title: '角色管理',
      //   },
      //   component: () => import('@/views/sys/Role.vue'),
      // },
      // {
      //   path: '/sys/menus',
      //   name: 'sysMenu',
      //   meta: {
      //     title: '菜单管理',
      //   },
      //   component: () => import('@/views/sys/Menu.vue'),
      // },
    ],
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
const menuToRoute = (menu) => {
  //这个函数执行的慢了就会存在路由多次添加的问题
  if (!menu.component) {
    return null
  }
  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title,
    },
  }
  route.component = () => import('@/views/' + menu.component + '.vue')
  return route
}
router.beforeEach((to, from, next) => {
  let hasRoute = store.state.menus.hasRoute
  if (!hasRoute) {
    axios
      .get('/sys/menu/nav', {
        headers: { Authorization: localStorage.getItem('token') }, //用户凭证
      })
      .then((res) => {
        console.log(res)
        //拿到menuList
        store.commit('setMenuList', res.data.data.nav)
        //拿到用户权限
        store.commit('setPermList', res.data.data.authoritys)
        //动态绑定路由
        res.data.data.nav.forEach((menu) => {
          if (menu.children) {
            menu.children.forEach((e) => {
              //转成路由
              if (menuToRoute(e)) {
                router.addRoute('home', menuToRoute(e))
              }
            })
          }
        })
        store.commit('changeRouteStatus', true)
        // console.log(router.getRoutes())
        next({ path: to.path })
      })
  }
  next()
})

export default router

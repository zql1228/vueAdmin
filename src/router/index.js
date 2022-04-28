import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
        {
          path: '/index',
          name: 'index',
          meta: {
            title: "首页"
          },
          component: () => import('@/views/Index.vue')
        },
      {
        path: '/users',
        name: 'sysUser',
        meta: {
          title: "用户管理"
        },
        component: () => import('../views/sys/User.vue')
      },
      {
        path: '/roles',
        name: 'sysRole',
        meta: {
          title: "角色管理"
        },
        component: () => import('@/views/sys/Role.vue')
      },
      {
        path: '/menus',
        name: 'sysMenu',
        meta: {
          title: "菜单管理"
        },
        component: () => import('@/views/sys/Menu.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

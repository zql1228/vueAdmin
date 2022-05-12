import { tableData } from './views/sys/common/columns'
const Mock = require('mockjs')
const Random = Mock.Random //用于生成各种随机数据
let result = {
  code: 200,
  msg: '操作成功',
  data: null,
}
let nav = [
  {
    name: 'SysManga',
    title: '系统管理',
    icon: 'el-icon-s-operation',
    path: '',
    component: '',
    children: [
      {
        name: 'SysUser',
        title: '用户管理',
        icon: 'el-icon-s-custom',
        path: '/users',
        component: 'sys/User',
        children: [],
      },
      {
        name: 'SysRole',
        title: '角色管理',
        icon: 'el-icon-rank',
        path: '/roles',
        component: 'sys/Role',
        children: [],
      },
      {
        name: 'SysMenu',
        title: '菜单管理',
        icon: 'el-icon-menu',
        path: '/menus',
        component: 'sys/Menu',
        children: [],
      },
    ],
  },
  {
    name: 'SysTools',
    title: '系统工具',
    icon: 'el-icon-s-tools',
    path: '',
    component: '',
    children: [
      {
        name: 'SysDict',
        title: '数字字典',
        icon: 'el-icon-s-order',
        path: '/sys/dicts',
        component: '',
        children: [],
      },
    ],
  },
]
//Mock.mock()用于生成模拟数据
Mock.mock('/captcha', 'post', () => {
  return {
    code: 200,
    msg: '操作成功',
    data: {
      token: Random.string(32),
      capImg: Random.dataImage('120x40', 'p7n5w'),
    },
  }
})
// mock不认识/login?username=xxx，所以用了正则表达式
Mock.mock(RegExp('/login*'), 'post', (config) => {
  // 这里无法在header添加authorization，直接跳过
  console.log('mock----------------login')
  return {
    code: 200,
    msg: '登录成功',
    data: null,
  }
})
Mock.mock('/login', 'post', (config) => {})
Mock.mock('/sys/userInfo', 'get', (config) => {
  //获取用户登录信息
  return {
    code: 200,
    data: {
      id: '1',
      username: 'text',
      avatar: 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg',
    },
  }
})
Mock.mock('/logout', 'post', (config) => {
  //退出登录
  return result
})
Mock.mock('/sys/user/updataPass', 'post', (config) => {
  //修改个人信息
  return result
})
Mock.mock('/sys/menu/nav', 'get', (config) => {
  //获取路由
  let authoritys = []
  result.data = {
    nav,
    authoritys: authoritys,
  }
  return result
})
////////////////////////////
Mock.mock('/sys/menu/list', 'get', (res) => {
  // console.log(res)
  //获取列表数据
  let menus = tableData
  result.data = menus
  return result
})
Mock.mock(RegExp('/sys/role/list*'), 'get', () => {
  result.data = {
    records: [
      {
        id: 3,
        created: '2021-01-04T10:09:14',
        updated: '2021-01-30T08:19:52',
        statu: 1,
        name: '普通用户',
        code: 'normal',
        remark: '只有基本查看功能',
        menuIds: [],
      },
      {
        id: 6,
        created: '2021-01-16T13:29:03',
        updated: '2021-01-17T15:50:45',
        statu: 1,
        name: '超级管理员',
        code: 'admin',
        remark: '系统默认最高权限，不可以编辑和任意修改',
        menuIds: [],
      },
    ],
    total: 2,
    size: 10,
    current: 1,
    orders: [],
    optimizeCountSql: true,
    hitCount: false,
    countId: null,
    maxLimit: null,
    searchCount: true,
    pages: 1,
  }

  return result
})
Mock.mock('/sys/menu/update', 'post', (config) => {
  //菜单页修改列信息
  result.data = []
  return result
})
Mock.mock('/sys/role/update', 'post', (config) => {
  //菜单页修改列信息
  result.data = []
  return result
})
Mock.mock('/sys/menu/save', 'post', (config) => {
  //菜单页添加列
  result.data = []
  return result
})
Mock.mock('/sys/role/save', 'post', (config) => {
  //菜单页添加列
  result.data = []
  return result
})
Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {
  result.data = {
    id: 3,
    statu: 1,
    parentId: 1,
    name: '角色管理',
    path: '/sys/roles',
    perms: 'sys:role:list',
    component: 'sys/Role',
    type: 1,
    icon: 'el-icon-rank',
    orderNum: 2,
    children: [],
  }

  return result
})
Mock.mock(RegExp('/sys/role/info/*'), 'get', () => {
  result.data = {
    id: 1,
    statu: 1,
    code: '1',
    name: '普通管理员',
    remark: '///////////',
  }

  return result
})
Mock.mock(RegExp('/sys/menu/*'), 'post', () => {
  return result
})
Mock.mock(RegExp('/sys/role/*'), 'post', () => {
  return result
})
Mock.mock(RegExp('/sys/user/*'), 'post', () => {
  return result
})
Mock.mock(RegExp('/sys/user/list*'), 'get', () => {
  result.data = {
    records: [
      {
        id: 1,
        created: '2021-01-12T22:13:53',
        updated: '2021-01-16T16:57:32',
        statu: 1,
        username: 'admin',
        password: '$2a$10$R7zegeWzOXPw871CmNuJ6upC0v8D373GuLuTw8jn6NET4BkPRZfgK',
        avatar: 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg',
        email: '123@qq.com',
        city: '广州',
        lastLogin: '2020-12-30T08:38:37',
        roles: [
          {
            id: 6,
            created: '2021-01-16T13:29:03',
            updated: '2021-01-17T15:50:45',
            statu: 1,
            name: '超级管理员',
            code: 'admin',
            remark: '系统默认最高权限，不可以编辑和任意修改',
            menuIds: [],
          },
          {
            id: 3,
            created: '2021-01-04T10:09:14',
            updated: '2021-01-30T08:19:52',
            statu: 1,
            name: '普通用户',
            code: 'normal',
            remark: '只有基本查看功能',
            menuIds: [],
          },
        ],
      },
      {
        id: 2,
        created: '2021-01-30T08:20:22',
        updated: '2021-01-30T08:55:57',
        statu: 1,
        username: 'test',
        password: '$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO',
        avatar: 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg',
        email: 'test@qq.com',
        city: null,
        lastLogin: null,
        roles: [
          {
            id: 3,
            created: '2021-01-04T10:09:14',
            updated: '2021-01-30T08:19:52',
            statu: 1,
            name: '普通用户',
            code: 'normal',
            remark: '只有基本查看功能',
            menuIds: [],
          },
        ],
      },
    ],
    total: 2,
    size: 10,
    current: 1,
    orders: [],
    optimizeCountSql: true,
    hitCount: false,
    countId: null,
    maxLimit: null,
    searchCount: true,
    pages: 1,
  }

  return result
})

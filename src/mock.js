const Mock = require('mockjs')
const Random = Mock.Random //用于生成各种随机数据
let result = {
  code: 200,
  msg: '操作成功',
  data: null,
}
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
Mock.mock('/login', 'post', (config) => {
  return {
    code: 200,
    msg: '登录成功',
    data: null,
  }
})
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
  let authoritys = []
  result.data = {
    nav,
    authoritys: authoritys,
  }
  return result
})

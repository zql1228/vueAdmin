<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header style="height: 55px">
        <strong>VueAdmin后台管理系统</strong>
        <div class="header-avatar block">
          <el-avatar class="el-avatar" size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link"> {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :underline="false">
                <router-link :to="{ path: '/userCenter' }">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="https://space.bilibili.com/13491144">视频讲解</el-link>
          <el-link href="http://markerhub.com">网站</el-link>
        </div>
      </el-header>
      <el-main>
        <Tabs></Tabs>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import SideMenu from '@/views/inc/SideMenu'
import Tabs from '@/views/inc/Tabs'
export default {
  name: 'Home',
  components: { SideMenu, Tabs },
  data() {
    return {
      userInfo: {},
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get('/sys/userInfo').then((res) => {
        this.userInfo = res.data.data
      })
    },
    logout() {
      this.$axios.post('/logout').then((res) => {
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit('resetState')
        this.$router.push('/login')
      })
    },
  },
}
</script>
<style scoped>
.el-container {
  height: 100%;
  padding: 0;
  margin: 0;
}
.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-header,
.el-footer {
  background-color: #17b3a3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  padding: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-dropdown-link {
  cursor: pointer;
}
a,
a:hover {
  text-decoration: none;
}
.el-link.el-link--default:hover {
  color: #606266;
  text-decoration: none;
}
.el-link.is-underline:hover:after {
  border-bottom: 0;
}
</style>

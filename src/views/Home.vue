<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header style="height: 55px;">
        <strong  >VueAdmin后台管理系统</strong>
        <div class="header-avatar block">
          <el-avatar class="el-avatar" size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
                      <span class="el-dropdown-link">
                        {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :underline="false">
                <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="https://space.bilibili.com/13491144">视频讲解</el-link>
          <el-link href="http://markerhub.com">网站</el-link>
        </div>
      </el-header>
      <el-main>

        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
import SideMenu from "@/views/inc/SideMenu";
export default {
name: "Home.vue",
  components:{SideMenu},
data() {
  return {
    userInfo: {
    id: '-1',
    username: 'admin',
    avatar: 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg'
  }
}
},
}
</script>
<style scoped>
.el-container{
  height:100%;
  padding: 0;
  margin:0
}
.header-avatar{
  float: right;
  width: 210px;
  display: flex;
  justify-content:space-around;
  align-items: center;
}
.el-header, .el-footer {
  background-color: #17b3a3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
  color: #409EFF;
}

</style>
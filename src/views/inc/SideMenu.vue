<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <router-link to="/index">
    <el-menu-item index="0"><i class="el-icon-s-home"></i><template slot="title">首页</template></el-menu-item>
    </router-link>

    <el-submenu index="1">
      <template slot="title"><i class="el-icon-s-operation"></i>系统管理</template>
      <router-link to="/users"><el-menu-item index="1-1"><i class="el-icon-s-custom"></i>用户管理</el-menu-item>    </router-link>
        <router-link to="/roles"> <el-menu-item index="1-2"><i class="el-icon-rank"></i>角色管理</el-menu-item>    </router-link>
          <router-link to="/menus"><el-menu-item index="1-3"><i class="el-icon-menu"></i>菜单管理</el-menu-item>    </router-link>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-setting"></i>系统工具</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export  default {

}
</script>
<style scoped>
.el-menu-vertical-demo{
  height: 100%;
}
</style>
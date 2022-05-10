<template>
  <el-menu :default-active="this.$store.state.menus.editableTabsValue" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <router-link to="/index">
      <el-menu-item index="Index" @click="selectMenu({ name: 'Index', title: '首页' })">
        <i class="el-icon-s-home"></i><template slot="title"><span>首页</span></template>
      </el-menu-item>
    </router-link>

    <el-submenu :index="menu.name" v-for="(menu, i) of menuList" :key="i">
      <template slot="title"><i :class="menu.icon"></i>{{ menu.title }}</template>
      <router-link :to="item.path" v-for="(item, j) of menu.children" :key="j">
        <el-menu-item @click="selectMenu(item)" :index="item.name"><i :class="item.icon"></i>{{ item.title }}</el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    menuList() {
      console.log(this.$store.state.menus.menuList)
      return this.$store.state.menus.menuList
    },
  },
  methods: {
    selectMenu(item) {
      this.$store.commit('addTab', item)
    },
  },
}
</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
a {
  text-decoration: none;
}
</style>

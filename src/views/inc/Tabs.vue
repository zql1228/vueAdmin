<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" :closable="true" @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    editableTabsValue: {
      get() {
        return this.$store.state.menus.editableTabsValue
      },
      set(val) {
        this.$store.state.menus.editableTabsValue = val
      },
    },
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs
      },
      set(val) {
        //set方法我没写也可以添加tab呀？
        this.$store.state.menus.editableTabs = val
      },
    },
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName == 'index') {
        return
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
      this.$router.push({ name: this.editableTabsValue })
    },
    clickTab(target) {
      // console.log(target)
      this.$router.push({ name: target.name })
    },
  },
}
</script>

<style scoped></style>

<template>
  <div class="div_menu">
    <el-button style="margin: 10px 0" type="danger">新增</el-button>
    <el-table :data="tableData" style="width: 100%" border row-key="id">
      <el-table-column :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" v-for="(item, i) of columns" :key="item.prop" :prop="item.prop" :label="item.label" width="180">
        <template v-if="item.prop == '类型'" slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          label: '名称',
          prop: 'name',
          children: [],
        },
        {
          label: '权限编码',
          prop: 'code',
        },
        {
          label: '图表',
          prop: 'icon',
        },
        {
          label: '类型',
          prop: 'type',
        },
        {
          label: '菜单URL',
          prop: 'menuUrl',
        },
        {
          label: '菜单组件',
          prop: 'compontent',
        },
        {
          label: '排序号',
          prop: 'sortNum',
        },
        {
          label: '状态',
          prop: 'state',
        },
      ],
      tableData: [
        {
          id: 1,
          name: '系统管理',
          code: 'sys:manage',
          icon: 'el-icon-s-operation',
          type: 1,
          menuUrl: '',
          state: 1,
          sortNum: '1',
          action: '',
        },
        {
          id: 2,
          name: '系统工具',
          code: 'sys:tools',
          icon: 'el-icon-s-tools',
          type: 1,
          menuUrl: '',
          state: 1,
          sortNum: '1',
          action: '',
        },
      ],
    }
  },
}
</script>
<style scoped>
div.div_menu {
  padding: 0 24px;
}
</style>

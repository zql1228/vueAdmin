<template>
  <div class="div_container">
    <!--搜索框-->
    <el-form :inline="true" :model="searchForm">
      <el-form-item prop="name">
        <el-input type="text" placeholder="名称" v-model="searchForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="danger">删除</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table :data="tableData" style="width: 100%" :style="{ height: tableHeight + 'px' }" border row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column v-for="(item, i) of columns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <template v-if="item.label == '类型'">
            <el-tag v-show="scope.row.type == 0" size="small">目录</el-tag>
            <el-tag v-show="scope.row.type == 1" size="small" type="success">菜单</el-tag>
            <el-tag v-show="scope.row.type == 2" size="small" type="info">按钮</el-tag>
          </template>
          <template v-else-if="item.label == '状态'">
            <el-tag v-show="scope.row.statu == 0" size="small" type="danger">禁用</el-tag>
            <el-tag v-show="scope.row.statu == 1" size="small" type="success">正常</el-tag>
          </template>
          <template v-else>{{ scope.row[item.prop] }}</template>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="delHandle(scope.row.id)">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e6e6e6',
        padding: '14px 18px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <el-pagination background layout="prev, pager, next" :total="tableData.length"> </el-pagination>
    </div>

    <el-dialog title="菜单信息" :visible.sync="dialogFormVisible" width="600px" :close-on-click-modal="false" @closed="resetForm('editForm')">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="上级菜单" prop="parentId" label-width="100px">
          <!--模拟树形下拉框-->
          <el-select v-model="editForm.parentId" placeholder="请选择上级菜单">
            <template v-for="item in tableData">
              <el-option :label="item.name" :value="item.id"></el-option>
              <template v-for="child in item.children">
                <el-option :label="child.name" :value="child.id">
                  <span>{{ '- ' + child.name }}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="perms" label-width="100px">
          <el-input v-model="editForm.perms" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" label-width="100px">
          <el-input v-model="editForm.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL" prop="path" label-width="100px">
          <el-input v-model="editForm.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单组件" prop="component" label-width="100px">
          <el-input v-model="editForm.component" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="editForm.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum" label-width="100px">
          <el-input-number v-model="editForm.orderNum" :min="1" label="排序号">1</el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { MenuCom } from './common/columns.js'
export default {
  data() {
    return {
      columns: MenuCom,
      tableData: [],
      searchForm: {
        name: '',
      },
      multipleSelection: [],
      dialogFormVisible: false,
      editForm: {
        parentId: '',
        name: '',
        perms: '',
        type: '',
        orderNum: '',
        statu: '',
      },
      editFormRules: {
        parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        perms: [{ required: true, message: '请输入权限编码', trigger: 'blur' }],
        type: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        orderNum: [{ required: true, message: '请填入排序号', trigger: 'blur' }],
        statu: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.getMenuTree()
  },
  computed: {
    tableHeight() {
      return window.innerHeight - (41 + 55 + 61 + 15 + 62)
    },
  },
  methods: {
    getMenuTree() {
      // { params: { name: this.searchForm.name } }
      this.$axios.get('/sys/menu/list').then((res) => {
        // console.log(res)
        this.tableData = res.data.data
      })
    },
    editHandle(id) {
      this.$axios.get('/sys/menu/info/' + id).then((res) => {
        this.editForm = res.data.data
        this.dialogFormVisible = true
      })
    },
    delHandle(id) {
      this.$axios.get('/sys/menu/delete/' + id).then((res) => {
        this.$message({ message: '删除成功', type: 'success' })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.editForm = {}
      this.dialogFormVisible = false
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/menu/' + (this.editForm.id ? 'update' : 'save'), this.editForm).then((res) => {
            console.log(res.data)
            this.resetForm(formName),
              this.$message({
                showClose: true,
                message: '恭喜你，操作成功',
                type: 'success',
                onClose: () => {
                  this.getMenuTree()
                },
              })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style scoped></style>

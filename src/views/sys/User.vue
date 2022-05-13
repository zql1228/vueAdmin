<template>
  <div class="div_container">
    <!--搜索框-->
    <el-form :inline="true" :model="searchForm">
      <el-form-item prop="name">
        <el-input type="text" placeholder="名称" v-model="searchForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary" @click="dialogFormVisible = true" v-if="hasAuth('sys:user:save')">新增</el-button>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button style="margin: 0 10px" type="danger" slot="reference" v-if="hasAuth('sys:user:del')" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
    <el-table border row-key="id" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column v-for="(item, i) of columns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <template v-if="item.label == '状态'">
            <el-tag v-show="scope.row.statu == 0" size="small" type="danger">禁用</el-tag>
            <el-tag v-show="scope.row.statu == 1" size="small" type="success">正常</el-tag>
          </template>
          <template v-if="item.label == '头像'">
            <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
          </template>
          <template v-else>{{ scope.row[item.prop] }}</template>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="delHandle(scope.row.id)">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :current-page="current" :page-size="size" :total="total"> </el-pagination>

    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="600px" :close-on-click-modal="false" @closed="resetForm('editForm')">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false" @closed="resetForm('permForm')">
      <el-form :model="permForm">
        <el-tree :data="permTreeData" show-checkbox ref="permTree" :default-expand-all="true" node-key="id" :check-strictly="true" :props="defaultProps"> </el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPermFormHandle('permForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { UserCom } from './common/columns'
export default {
  data() {
    return {
      searchForm: {
        name: '',
      },
      columns: UserCom,
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      dialogVisible: false,
      delBtlStatu: true,
      editForm: {},
      permForm: {},
      editFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入唯一编码', trigger: 'blur' }],
        statu: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      total: 2,
      current: 1,
      size: 10,
      permTreeData: [
        {
          id: 1,
          label: '普通管理员',
        },
        {
          id: 2,
          label: '超级管理员',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      // { params: { name: this.searchForm.name } }
      this.$axios.get('/sys/user/list').then((res) => {
        // console.log(res)
        this.tableData = res.data.data.records
      })
    },
    permHandle(id) {
      this.dialogVisible = true
      this.$axios.get('/sys/user/info/' + id).then((res) => {
        this.$refs.permTree.setCheckedKeys(res.data.data.menuIds)
        this.getRoleList()
      })
    },
    submitPermFormHandle(formName) {
      var menuIds = this.$refs.permTree.getCheckedKeys()

      console.log(menuIds)

      this.$axios.post('/sys/user/perm/' + this.permForm.id, menuIds).then((res) => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose: () => {
            this.getRoleList()
          },
        })
        this.permDialogVisible = false
        this.resetForm(formName)
      })
    },
    handleSelectionChange(val) {
      console.log('勾选')
      console.log(val)
      this.multipleSelection = val

      this.delBtlStatu = val.length > 0 ? false : true
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.current = val
      this.getRoleList()
    },
    editHandle(id) {
      //编辑
      this.$axios.get('/sys/user/info/' + id).then((res) => {
        this.editForm = res.data.data
        this.dialogFormVisible = true
      })
    },
    delHandle(id) {
      this.$axios.get('/sys/user/delete/' + id).then((res) => {
        this.$message({ message: '删除成功', type: 'success' })
      })
    },
    resetForm(formName) {
      this.editForm = {}
      this.permForm = {}
      this.dialogFormVisible = false
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/user/' + (this.editForm.id ? 'update' : 'save'), this.editForm).then((res) => {
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>
<style scoped>
.el-pagination {
  float: right;
  margin-top: 20px;
}
</style>

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
        <el-button type="danger">批量删除</el-button>
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
          <template v-else>{{ scope.row[item.prop] }}</template>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text">分配权限</el-button>
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确定要删除这条记录吗？" @confirm="delHandle(scope.row.id)">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>
<script>
import { RoleCom } from './common/columns'
export default {
  data() {
    return {
      searchForm: {
        name: '',
      },
      columns: RoleCom,
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      editForm: {},
      editFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入唯一编码', trigger: 'blur' }],
        statu: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.getMenuTree()
  },
  methods: {
    getMenuTree() {
      // { params: { name: this.searchForm.name } }
      this.$axios.get('/sys/role/list').then((res) => {
        // console.log(res)
        this.tableData = res.data.data.records
      })
    },
    editHandle(id) {
      //编辑
      this.$axios.get('/sys/role/info/' + id).then((res) => {
        this.editForm = res.data.data
        this.dialogFormVisible = true
      })
    },
    delHandle(id) {
      this.$axios.get('/sys/role/delete/' + id).then((res) => {
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
          this.$axios.post('/sys/role/' + (this.editForm.id ? 'update' : 'save'), this.editForm).then((res) => {
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
<style scoped></style>

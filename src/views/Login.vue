<template>
  <el-row type="flex" :gutter="24" justify="center">
    <el-col :span="6" :md="6" :sm="8">
      <h2>欢迎来到VueAdmin管理系统</h2>
      <el-image style="width: 180px; height: 180px" :src="require('@/assets/MarkerHub.jpg')"></el-image>
      <p>公众号 MarkerHub</p>
      <p>扫描二维码，回复「VueAdmin」获取登录密码</p>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="6">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px">
          <el-row type="flex" justify="space-between">
            <el-col :span="18">
              <el-input v-model="loginForm.code"></el-input>
            </el-col>
            <el-col :span="6">
              <el-image :src="capImg" style="line-height: 15px; height: 40px"></el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-col>
            <el-col :span="12">
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'markerhub',
        code: '11111',
        token: '',
      },
      capImg: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min:6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min:6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // { min: 5, max: 5, message: '长度在5 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/login?' + qs.stringify(this.loginForm))
            .then((res) => {
              console.log(res, 'login')
              const jwt = res.headers['Authorization']
              this.$store.commit('SET_TOKEN', jwt)
              this.$router.push('/index')
            })
            .catch((error) => {
              this.getCapCha()
              console.log('error submit!!')
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getCapCha() {
      //获取验证码
      debugger
      this.$axios
        .post('/captcha')
        .then((res) => {
          console.log(res)
          this.loginForm.token = res.data.data.token
          this.capImg = res.data.data.capImg
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getCapCha()
  },
}
</script>
<style scoped>
.el-row {
  background: #fafafa;
  height: 100%;
  align-items: center;
  text-align: center;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.el-divider--vertical {
  height: 280px;
}
</style>

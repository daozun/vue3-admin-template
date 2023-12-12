<template>
  <section class="login">
    <div class="login-container">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
        <h1 class="text-2xl pb-4">注册</h1>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="用户名"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="密码"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            @click="submitForm(ruleFormRef)"
            style="width: 400px"
            >register</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { registerApi } from '@/api/modules/register'
import { reponseCode } from '@/enum/index'
import { useRouter } from 'vue-router'
const router = useRouter()

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleFormRef = ref()
const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      registerApi(ruleForm).then((res) => {
        if (res.statusCode === reponseCode.CREATED) {
          router.push('/login')

          ElMessage({
            message: `${res.message},请去登录`,
            type: 'success'
          })
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url('../../assets/login_bg.jpeg') 100% 100% no-repeat;

  .login-container {
    position: absolute;
    max-width: 100%;
    padding: 25px 50px;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -45%);
    overflow: hidden;
    background: #000000;
    color: #eee;
    text-align: center;
    border-radius: 10px;
  }

  .el-form-item {
    margin-bottom: 35px;
  }
}
</style>

<style lang="scss">
.login {
  .el-form-item__content {
    justify-content: center;
  }
}
</style>

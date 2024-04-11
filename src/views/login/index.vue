<template>
  <section class="login">
    <div class="login-container">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
        <h1 class="text-2xl pb-4">登录</h1>
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
            >Login</el-button
          >
        </el-form-item>
        <p
          v-if="goToRegisterTipVisible"
          class="hover:underline cursor-pointer text-emerald-400 decoration-emerald-400"
          @click="goToRegister"
        >
          点击去注册，go
        </p>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { loginApi } from '@/api/modules/login'
import { getAllRole } from '@/api/modules/role'
import { RESPONSECODE } from '@/enum/index'
import { setToken, setUserInfo } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { Store } from '@/store/index'
const router = useRouter()
const store = Store()

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

const goToRegisterTipVisible = ref(false)

const ruleFormRef = ref()
const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loginApi(ruleForm).then(async (res) => {
        if (res.statusCode === RESPONSECODE.OK) {
          setToken(res.data.token)
          setUserInfo(res.data.userInfo)
          store.setUserInfo(res.data.userInfo)

          await getRole()

          router.push('/dashboard')

          ElMessage({
            message: res.message,
            type: 'success'
          })
        }

        if (res.statusCode === RESPONSECODE.NOT_FOUND) {
          goToRegisterTipVisible.value = true
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const getRole = async () => {
  await getAllRole().then((res) => {
    if (res.statusCode === RESPONSECODE.OK) {
    }
  })
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  // background: url('../../assets/login_bg.jpeg') 100% 100% no-repeat;
  background-color: #182026;;

  .login-container {
    position: absolute;
    max-width: 100%;
    padding: 25px 50px;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -45%);
    overflow: hidden;
    background: #fff;
    color: #182026;
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

<template>
  <div class="navbar">
    <div class="left">
      <SvgIcon
        icon-class="hamburger"
        class="hamburger-svg"
        @click="toggleSideBar"
        :class="{ 'is-active': isActive }"
      />
      <Breadcrumb class="breadcrumb" />
    </div>
    <div class="right avatar">
      <svg-icon
        :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="changeScreen"
      />
      <el-dropdown class="dropdown" ref="dropdown" trigger="click">
        {{ userName }}
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/dashboard">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/daozun/vue3-admin-template"
            >
              <el-dropdown-item>项目地址</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="signOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="dropdown"></div>
  </div>
</template>

<script setup>
import Breadcrumb from './components/Breadcrumb/index.vue'
import { computed, ref } from 'vue'
import { Store } from '@/store/index'
import { useScreenfull } from '@/hooks/useScreenfull'
import { useRouter } from 'vue-router'
import { logOut } from '@/utils/auth'
const store = Store()
const router = useRouter()

const isActive = computed(() => {
  return store.isOpenSideBar
})

const userName = computed(() => {
  return store.userInfo?.username
})

const toggleSideBar = () => {
  store.toggleSideBar()
}

// screenfull
const isFullScreen = ref(false)

const changeScreen = () => {
  isFullScreen.value = !isFullScreen.value
  useScreenfull(isFullScreen)
}

const signOut = () => {
  logOut()
  store.removeUserInfo()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  line-height: 50px;
  padding: 5px 40px 5px 18px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 40px;
  }

  .breadcrumb {
    margin-left: 20px;
  }

  .hamburger-svg {
    font-size: 24px;
    vertical-align: -0.25em;
    cursor: pointer;
  }

  .avatar {
    font-weight: bold;
    cursor: pointer;
    line-height: 50px;
    color: #5a5e66;
  }

  .dropdown {
    margin-left: 18px;
    font-size: 16px;
  }

  .is-active {
    transform: rotate(180deg);
  }
}
</style>

<style lang="scss">
.navbar {
  .el-dropdown {
    line-height: 50px;
  }
}
</style>

<template>
  <div class="navbar">
    <div class="fl">
      <SvgIcon
        icon-class="hamburger"
        class="hamburger-svg"
        @click="toggleSideBar"
        :class="{ 'is-active': isActive }"
      />
    </div>
    <Breadcrumb class="breadcrumb" />
    <div class="fr avatar">
      <el-dropdown ref="dropdown" trigger="click">
        <el-image :src="src">
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/daozun/vue3-admin-template"
            >
              <el-dropdown-item>项目地址</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"
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
import Breadcrumb from "./components/Breadcrumb/index.vue";
import { computed, defineProps, ref } from "vue";
import { Store } from "@/store/index";
import { useRouter } from "vue-router";
import { logOut } from "@/utils/auth";
const store = Store();
const router = useRouter();

const src = require("../../../assets/head.jpeg");
const isActive = computed(() => {
  return store.isOpenSideBar;
});

const toggleSideBar = () => {
  store.toggleSideBar();
};

const logout = () => {
  logOut();
  store.removeUserInfo();
  router.push("/login");
};
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

  .breadcrumb {
    margin-left: 20px;
  }

  .hamburger-svg {
    font-size: 24px;
    vertical-align: -0.25em;
    cursor: pointer;
  }

  .avatar {
    width: 40px;
    height: 40px;
    padding-top: 5px;

    .el-image {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      cursor: pointer;
    }
  }

  .is-active {
    transform: rotate(180deg);
  }
}
</style>

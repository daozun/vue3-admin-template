<template>
  <div class="aside">
    <el-scrollbar>
      <el-menu
        :default-active="defaultMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409eff"
        :collapse-transition="false"
        mode="vertical"
      >
        <SideBarItem v-for="route in routes" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SideBarItem from "./components/SideBarItem.vue";
import { reactive, ref, computed, watch, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Store } from "@/store/index";
const store = Store();

const route = useRoute();
const routes = computed(() => {
  return useRouter().options.routes;
});

const isCollapse = computed(() => {
  return store.isOpenSideBar;
});

const defaultMenu = computed(() => {
  return route.path;
});

const marginLeft = computed(() => {
  return store.isOpenSideBar ? "64px" : "210px";
});
</script>

<style lang="scss" scoped>
.aside {
  width: v-bind("marginLeft");
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  transition: width 0.3s;
}
</style>

<style lang="scss">
.el-scrollbar__view {
  height: 100%;
}

.el-menu {
  height: 100%;
  border: none;
  .el-menu-item {
    &:hover {
      background-color: #263445 !important;
    }
  }
}

.el-menu--collapse {
  width: 100%;
}
</style>

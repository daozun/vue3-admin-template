<template>
  <el-aside class="aside">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
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
  </el-aside>
</template>

<script setup>
import SideBarItem from "./components/SideBarItem.vue";
import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const routes = computed(() => {
  return useRouter().options.routes;
});
</script>

<style lang="scss" scoped>
.aside {
  width: 200px;
  height: 100%;
  .el-menu {
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    .el-menu-item {
      &:hover {
        background-color: #263445 !important;
      }
    }
  }
}
</style>

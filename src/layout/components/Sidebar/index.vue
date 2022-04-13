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
        <el-sub-menu index="1">
          <template #title>
            <SvgIcon icon-class="user" class="svg-icon" />
            <span>dashboard</span>
          </template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { reactive, ref } from "vue";

const routes = reactive([]);

for (let index = 0; index < 5; index++) {
  routes.push({
    name: `哈哈哈${index}`,
  });
}
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

    .svg-icon {
      margin-right: 16px;
    }
  }
}
</style>

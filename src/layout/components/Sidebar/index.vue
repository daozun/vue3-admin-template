<template>
  <el-aside class="aside">
    <el-scrollbar>
      <el-menu>
        <el-menu-item v-for="(item, index) in menuArr" :key="index">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { reactive, ref } from "vue";

const menuArr = reactive([]);

for (let index = 0; index < 5; index++) {
  menuArr.push({
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
  }
}
</style>

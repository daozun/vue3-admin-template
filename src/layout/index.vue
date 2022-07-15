<template>
  <div class="layout">
    <el-container>
      <Sidebar />
      <Appmain />
    </el-container>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index.vue'
import Appmain from './components/Appmain/index.vue'
</script>

<style lang="scss">
.layout {
  position: relative;
  width: 100vw;
  height: 100vh;

  .el-container {
    width: 100vw;
    height: 100vh;
  }
}
</style>

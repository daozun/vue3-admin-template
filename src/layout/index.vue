<template>
  <div class="layout">
    <el-container>
      <Sidebar />
      <el-main style="background: #fff">Main</el-main>
    </el-container>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar/index.vue";
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

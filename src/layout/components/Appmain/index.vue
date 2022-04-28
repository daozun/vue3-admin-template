<template>
  <el-main style="background: #fff">
    <Navbar />
    <router-view></router-view>
  </el-main>
</template>

<script setup>
import Navbar from "../Navbar/index.vue";
</script>

<style lang="scss"></style>

<style>
.el-main {
  padding: 0;
}
</style>

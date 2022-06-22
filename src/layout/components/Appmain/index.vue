<template>
  <el-main style="background: #fff">
    <Navbar />
    <div class="app-main">
      <router-view></router-view>
    </div>
  </el-main>
</template>

<script setup>
import { computed } from "vue";
import Navbar from "../Navbar/index.vue";
import { Store } from "@/store/index";
const store = Store();

const marginLeft = computed(() => {
  return store.isOpenSideBar ? "64px" : "210px";
});
</script>

<style lang="scss">
.app-main {
  padding: 20px;
}
</style>

<style>
.el-main {
  padding: 0;
  margin-left: v-bind("marginLeft");
  transition: margin-left 0.3s;
}
</style>

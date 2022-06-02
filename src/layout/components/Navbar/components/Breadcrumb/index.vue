<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
      <el-breadcrumb-item
        v-for="route in routes"
        :key="route.path"
        :to="{ path: route.path }"
        >{{ route.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const routes = computed(() => {
  // console.log("[ router ] >", router);
  // console.log("[ route ] >", route);
  return router.options.routes;
});
</script>

<style lang="scss" scoped>
.breadcrumb {
}
</style>

<style lang="scss">
.breadcrumb {
  .el-breadcrumb {
    line-height: 50px;
    margin-left: 25px;
    float: left;
  }
}
</style>

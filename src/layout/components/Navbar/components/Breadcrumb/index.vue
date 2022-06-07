<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="route in routeList"
        :key="route.path"
        :to="{ path: route.path == '/' ? route.redirect : route.path }"
        >{{ route.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div>{{ currentRoute }}</div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();

const routeList = computed(() => {
  let matched = route.matched;
  let first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: "/dashboard", name: "Dashboard" }].concat(matched);
  } else {
    matched = [first];
  }

  return matched;
});

const isDashboard = (route) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
};
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

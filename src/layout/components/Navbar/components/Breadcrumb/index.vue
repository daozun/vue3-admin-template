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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const routeList = computed(() => {
  let matched = route.matched
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', name: 'Dashboard' }].concat(matched)
  } else {
    matched = [first]
  }

  return dropDuplocate(matched)
})

const isDashboard = (route) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const dropDuplocate = (matched) => {
  // eslint-disable-next-line no-undef
  return _.uniqBy(matched, 'path')
}
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

  .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }
}
</style>

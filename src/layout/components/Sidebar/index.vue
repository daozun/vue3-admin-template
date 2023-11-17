<template>
  <div class="sidebar">
    <el-scrollbar>
      <el-menu
        :default-active="defaultMenu"
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
  </div>
</template>

<script setup>
import SideBarItem from './components/SideBarItem.vue'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// eslint-disable-next-line no-unused-vars
import variables from '@/styles/variables.scss'
import { Store } from '@/store/index'
const store = Store()

const route = useRoute()
const routes = computed(() => {
  return useRouter().options.routes
})

const isCollapse = computed(() => {
  return store.isOpenSideBar
})

const defaultMenu = computed(() => {
  return route.path
})

const marginLeft = computed(() => {
  return store.isOpenSideBar ? '64px' : '210px'
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.sidebar {
  width: v-bind('marginLeft');
  background: $menuBg;
}
</style>

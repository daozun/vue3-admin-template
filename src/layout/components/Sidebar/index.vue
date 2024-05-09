<template>
  <div :class="theme === 'dark' ? 'sidebar-dark' : 'sidebar'" :style="styleObject">
    <el-scrollbar>
      <el-menu
        :default-active="defaultMenu"
        :collapse="isCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :unique-opened="false"
        :active-text-color="activeTextColor"
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
import { Store } from '@/store/index'
import { useCssModule } from 'vue'
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

const sidebarVariableObj = useCssModule('sidebar')
const textColor = sidebarVariableObj.menuText
const activeTextColor = sidebarVariableObj.menuActiveText

const backgroundColor = computed(() => {
  return store.theme === 'dark' ? sidebarVariableObj.menuDarkBg : sidebarVariableObj.menuBg
})

const marginLeft = computed(() => {
  return store.isOpenSideBar ? '64px' : '210px'
})

const theme = computed(() => {
  return store.theme
})

const styleObject = reactive({
  width: marginLeft,
})

</script>

<style lang="scss" scoped  module="sidebar">
@import '@/styles/variables.scss';

.sidebar {
  background: $menuBg;
}

.sidebar-dark {
  background: $menuDarkBg;
}
</style>

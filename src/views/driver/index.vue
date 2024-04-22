<template>
  <div class="driver">
    <el-button type="primary" @click="openDrive">打开引导</el-button>
  </div>
</template>

<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const driverObj = driver({
  showProgress: true,
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  doneBtnText: '结束',
  steps: [
    {
      element: '.hamburger-svg',
      popover: {
        title: 'Collapse Icon',
        description: '点击可以关闭或者打开左侧菜单',
        side: 'left',
        align: 'start'
      }
    },
    {
      element: '.breadcrumb',
      popover: {
        title: 'Breadcrumb',
        description: '指示当前页面位置',
        side: 'left',
        align: 'start'
      }
    },
    {
      element: '.switch-theme',
      popover: {
        title: 'Setting theme',
        description: '切换模式',
        side: 'left',
        align: 'start'
      }
    },
    {
      element: '.full-screen-svg',
      popover: {
        title: 'Full Screen',
        description: '全屏和退出全屏',
        side: 'left',
        align: 'start'
      }
    }
  ]
})

const openDrive = () => {
  driverObj.drive()
}
</script>

<style lang="scss">
.driver {
}
</style>

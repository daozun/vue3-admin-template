<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="clickFullScreen"
    />
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
import { init } from 'events'

const isFullscreen = ref(false)

onUnmounted(() => {
  init()

  if (screenfull.enabled) {
    screenfull.off('change', this.change)
  }
})

const clickFullScreen = () => {
  if (!screenfull.enabled) {
    // this.$message({
    //   message: "you browser can not work",
    //   type: "warning",
    // });
    return false
  }
  screenfull.toggle()
}

// eslint-disable-next-line no-unused-vars
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>

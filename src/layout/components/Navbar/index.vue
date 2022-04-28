<template>
  <div class="navbar">
    <div>
      <SvgIcon icon-class="hamburger" class="hamburger-svg" />
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  line-height: 50px;
  padding: 5px 15px;
  box-sizing: border-box;

  .hamburger-svg {
    font-size: 24px;
  }
}
</style>

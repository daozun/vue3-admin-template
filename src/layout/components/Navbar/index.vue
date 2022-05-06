<template>
  <div class="navbar">
    <div class="fl">
      <SvgIcon icon-class="hamburger" class="hamburger-svg" />
    </div>
    <div class="fl">dashboard</div>
    <div class="fr avatar">
      <el-image :src="src">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
      <SvgIcon icon-class="caret-bottom" class="caret-bottom" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const src =
  "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  line-height: 50px;
  padding: 5px 20px 5px 10px;
  box-sizing: border-box;

  .hamburger-svg {
    font-size: 24px;
    vertical-align: -0.25em;
    cursor: pointer;
  }

  .avatar {
    width: 40px;
    height: 40px;
    padding-top: 5px;

    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 40px;
      cursor: pointer;
    }

    .caret-bottom {
      position: absolute;
      bottom: 2px;
      right: 0;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>

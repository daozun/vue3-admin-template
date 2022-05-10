<template>
  <div class="navbar">
    <div class="fl">
      <SvgIcon icon-class="hamburger" class="hamburger-svg" />
    </div>
    <div class="fl">dashboard</div>
    <div class="fr avatar" @click="handleVisible()">
      <el-image :src="src">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
      <SvgIcon icon-class="caret-bottom" class="caret-bottom" />
    </div>
    <div class="dropdown">
      <el-dropdown ref="dropdown" trigger="contextmenu">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Home</el-dropdown-item>
            <el-dropdown-item>Github</el-dropdown-item>
            <el-dropdown-item divided>Log Out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
const src = require("../../../assets/head.jpeg");

const dropdown = ref();
const handleVisible = (visible) => {
  console.log(
    "%c [ visible ]-37",
    "font-size:13px; background:pink; color:#bf2c9f;",
    visible
  );
  if (visible) {
    dropdown.value.handleClose();
  } else {
    dropdown.value.handleOpen();
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  line-height: 50px;
  padding: 5px 40px 5px 10px;
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
      right: 20px;
      font-size: 24px;
      cursor: pointer;
    }
  }

  .dropdown {
    position: absolute;
    right: 40px;
    top: 60px;
  }
}
</style>

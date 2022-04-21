<template>
  <div v-if="!item.hidden">
    <el-sub-menu index="1">
      <template #title>
        <SvgIcon icon-class="user" class="svg-icon" />
        <span>dashboard</span>
      </template>
      <el-menu-item index="1-1">{{ item.name }}</el-menu-item>
      <el-menu-item index="1-2"></el-menu-item>
    </el-sub-menu>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const prop = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
</style>

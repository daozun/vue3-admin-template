<template>
  <div v-if="!item.hidden">
    <router-link :to="item.path">
      <el-menu-item v-if="noHasChildren(item)" :index="item.path">
        <div>
          <SvgIcon :icon-class="item.meta?.icon" />
          <span>{{ item.name }}</span>
        </div>
      </el-menu-item>
    </router-link>

    <router-link :to="item.path">
      <el-menu-item v-if="hasOneChildren(item)" :index="item.path">
        <div>
          <SvgIcon :icon-class="item.children[0].meta?.icon" />
          <span>{{ item.children[0].name }}</span>
        </div>
      </el-menu-item>
    </router-link>

    <el-sub-menu v-if="hasThanOneChildren(item)" :index="item.path">
      <template #title>
        <div>
          <SvgIcon :icon-class="item.meta?.icon" />
          <span>{{ item.name }}</span>
        </div>
      </template>
      <SideBarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import path from "path";
import { defineProps, ref } from "vue";

let onlyOneChild = ref(null);
let basePath = ref(null);

const prop = defineProps({
  item: {
    type: Object,
  },
});

const noHasChildren = (item) => {
  if (!item.children) {
    return true;
  } else {
    return false;
  }
};

const hasOneChildren = (item) => {
  if (item.children?.length === 1) {
    return true;
  } else {
    return false;
  }
};

const hasThanOneChildren = (item) => {
  if (item.children?.length > 1) {
    return true;
  } else {
    return false;
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
</style>

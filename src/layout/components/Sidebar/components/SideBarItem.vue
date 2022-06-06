<template>
  <div v-if="!item.hidden">
    <div @click="goToPath(item)">
      <el-menu-item v-if="noHasChildren(item)" :index="item.path">
        <div :class="{ icon: item.meta?.icon }">
          <SvgIcon :icon-class="item.meta?.icon" />
        </div>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </div>

    <div @click="goToPath(item)">
      <el-menu-item v-if="hasOneChildren(item)" :index="item.path">
        <div :class="{ icon: item.children[0].meta?.icon }">
          <SvgIcon :icon-class="item.children[0].meta?.icon" />
        </div>
        <span>{{ item.children[0].name }}</span>
      </el-menu-item>
    </div>

    <el-sub-menu v-if="hasThanOneChildren(item)" :index="item.path">
      <template #title>
        <div :class="{ icon: item.meta?.icon }">
          <SvgIcon :icon-class="item.meta?.icon" />
        </div>
        <span>{{ item.name }}</span>
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
import { defineProps, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { recursionFn } from "@/utils/index";
import { Store } from "@/store/index";
const store = Store();
const router = useRouter();

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

const goToPath = (item) => {
  const routerList = router.options.routes;
  const pathArr = recursionFn(routerList, item);

  router.push(pathArr.join("/"));
};

const right = computed(() => {
  return store.isOpenSideBar ? "-20px" : "20px";
});
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 30px;
}
</style>

<style>
.el-sub-menu .el-sub-menu__icon-arrow {
  right: v-bind("right");
}
</style>

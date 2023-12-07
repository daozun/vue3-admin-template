<template>
  <div class="menu flex">
    <div style="flex-basis: 500px">
      <el-tree
        :data="dataSource"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <a @click="append(data)"> Append </a>
              <a style="margin-left: 8px" @click="remove(node, data)">
                Delete
              </a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="route" label="路由" />
        <el-table-column prop="component" label="组件名" />
        <el-table-column prop="hidden" label="是否隐藏" />
        <el-table-column prop="meta" label="meta" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const dataSource = ref([
  {
    id: 1,
    label: 'Level1',
    children: [
      {
        id: 4,
        label: 'Level1-1',
        children: [
          {
            id: 9,
            label: 'Level1-1-1'
          },
          {
            id: 10,
            label: 'Level1-1-2'
          }
        ]
      }
    ]
  }
])

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style lang="scss" scoped>
.menu {
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>

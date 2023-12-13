<template>
  <div class="permission">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="name" label="角色名称" width="180" align="center">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180"
        align="center"
      >
        <template #default="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)" type="primary"
            >编辑菜单权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <authDialog
      :dialogVisible="dialogVisible"
      @changeVisible="changeVisible"
    ></authDialog>
  </div>
</template>

<script setup>
import authDialog from '@/views/permission/auth-dialog'
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)

const tableData = reactive([
  {
    name: 'admin',
    description: '管理员'
  },
  {
    name: 'normal',
    description: '员工'
  }
])

// 点击编辑按钮
const handleEdit = () => {
  dialogVisible.value = true
}

// 子组件传值
const changeVisible = (status) => {
  dialogVisible.value = status
}
</script>

<style lang="scss" scoped>
.permission {
}
</style>

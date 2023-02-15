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

    <el-dialog v-model="dialogVisible" title="编辑菜单权限" width="30%">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const tableData = reactive([
  {
    name: 'admin',
    description: '管理员'
  },
  {
    name: 'visitor',
    description: '游客'
  }
])

// 点击编辑按钮
const handleEdit = () => {}

// 确认按钮
const confirm = () => {}
</script>

<style lang="scss" scoped>
.permission {
}
</style>

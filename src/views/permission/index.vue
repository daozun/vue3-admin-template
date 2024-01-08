<template>
  <div class="permission">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="code" label="角色名称" width="180" align="center">
        <template #default="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="描述" width="180" align="center">
        <template #default="scope">
          {{ scope.row.name }}
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
      :dataSource="dataSource"
      :code="code"
      @changeVisible="changeVisible"
    ></authDialog>
  </div>
</template>

<script setup>
import authDialog from '@/views/permission/auth-dialog'
import { ref, onMounted } from 'vue'
import { getMenuList } from '@/api/modules/menu'
import { getAllRole } from '@/api/modules/role'
import { RESPONSECODE } from '@/enum/index'

const tableData = ref([])

onMounted(() => {
  getRoleList()
})

const getRoleList = () => {
  getAllRole().then((res) => {
    if (res.statusCode === RESPONSECODE.OK) {
      tableData.value = res.data
    }
  })
}

const dialogVisible = ref(false)
const dataSource = ref([])
const code = ref('')

// 点击编辑按钮
const handleEdit = (row) => {
  code.value = row.code
  dialogVisible.value = true

  getAllMenu()
}

const getAllMenu = () => {
  getMenuList().then((res) => {
    if (res.statusCode === RESPONSECODE.OK) {
      dataSource.value = res.data
    }
  })
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

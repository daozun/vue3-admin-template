<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑菜单权限"
    width="30%"
    :before-close="cancel"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @open="openDialog"
  >
    <el-tree
      ref="treeRef"
      :data="dataSource"
      node-key="id"
      show-checkbox
      default-expand-all
      :expand-on-click-node="false"
      :props="defaultProps"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="confirmLoading"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { saveRoleMenu, getRoleMenu } from '@/api/modules/role'
import { RESPONSECODE } from '@/enum'

const defaultProps = {
  children: 'children',
  label: 'name'
}

const props = defineProps(['dialogVisible', 'dataSource', 'code'])
const dialogVisible = computed(() => props.dialogVisible)
const dataSource = computed(() => props.dataSource)
const code = computed(() => props.code)

const emit = defineEmits(['changeVisible'])
// 取消按钮
const cancel = () => {
  emit('changeVisible', false)
}

const treeRef = ref()
const confirmLoading = ref(false)

// 打开弹窗
const openDialog = () => {
  getDefaultCheckData()
}

// 获取默认数据
const getDefaultCheckData = () => {
  getRoleMenu({
    role: code.value
  }).then((res) => {
    if (res.statusCode === RESPONSECODE.OK) {
      const idList = res.data.map((item) => item.menu_id)
      treeRef.value.setCheckedKeys(idList)
    }
  })
}

// 确认按钮
const confirm = () => {
  const checkedNodes = treeRef.value.getCheckedNodes()
  if (checkedNodes.length === 0) {
    ElMessage({
      message: '请选择数据',
      type: 'warning'
    })

    return false
  }

  confirmLoading.value = true
  saveRoleMenu({
    role: code.value,
    menuIdList: checkedNodes
  }).then((res) => {
    if (res.statusCode === RESPONSECODE.OK) {
      ElMessage({
        message: res.message,
        type: 'success'
      })
    }

    confirmLoading.value = false
    cancel()
  })
}
</script>

<style lang="scss" scoped>
.permission {
}
</style>

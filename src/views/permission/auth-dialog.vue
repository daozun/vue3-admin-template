<template>
  <el-dialog v-model="dialogVisible" title="编辑菜单权限" width="30%">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const defaultProps = {
  children: 'children',
  label: 'label'
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1'
          },
          {
            id: 10,
            label: 'Level three 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
    ]
  }
]

const props = defineProps(['dialogVisible'])
const dialogVisible = computed(() => props.dialogVisible)

const emit = defineEmits(['changeVisible'])
// 取消按钮
const cancel = () => {
  emit('changeVisible', false)
}

// 确认按钮
const confirm = () => {}
</script>

<style lang="scss" scoped>
.permission {
}
</style>

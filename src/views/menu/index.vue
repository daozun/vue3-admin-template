<template>
  <div class="menu flex">
    <div style="flex-basis: 550px">
      <el-tree
        :data="dataSource"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <span class="flex flex-1 justify-between items-center">
            <span>{{ node.label }}</span>
            <span class="flex">
              <svg-icon
                icon-class="edit"
                class="text-sm text-red-600"
                @click="edit(data)"
              />
              <svg-icon
                icon-class="delete"
                class="ml-5 text-sm text-red-600"
                @click="del(data)"
              />
              <svg-icon
                icon-class="add"
                class="ml-5 text-sm text-blue-600"
                @click="add(data)"
              />
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <div class="flex-auto ml-20">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="route" label="路由" />
        <el-table-column prop="component" label="组件名" />
        <el-table-column prop="hidden" label="是否在侧边栏显示" />
        <el-table-column prop="alwaysShow" label="是否显示跟路由" />
        <el-table-column prop="isExternal" label="是否外部URL" />
        <el-table-column prop="redirect" label="重定向" />
        <el-table-column prop="meta" label="额外信息" />
      </el-table>
    </div>

    <!-- dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="30%"
      :before-close="handleClose"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      draggable="true"
    >
      <el-form
        ref="dialogRuleFormRef"
        :model="dialogRuleForm"
        :rules="dialogRules"
        label-width="60px"
        label-position="left"
        size="default"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="dialogRuleForm.title"
            size="large"
            maxlength="20"
            placeholder="请输入标题"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="dialogRuleForm.status" clearable size="large">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input
            v-model="dialogRuleForm.author"
            size="large"
            maxlength="10"
            placeholder="请输入作者"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm(dialogRuleFormRef)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const dataSource = ref([
  {
    id: 1,
    label: '菜单',
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

const tableData = []

// dialog
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogRuleFormRef = ref()
const dialogRuleForm = reactive({
  name: '',
  route: '',
  component: ''
})
const resetForm = reactive({ ...dialogRuleForm })

const dialogRules = reactive({
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  route: [{ required: true, message: '请输入路由', trigger: 'change' }],
  component: [{ required: true, message: '请输入组件', trigger: 'blur' }]
})

const edit = (data) => {}

const add = (data) => {
  Object.assign(dialogRuleForm, resetForm)
  dialogVisible.value = true
  dialogTitle.value = '添加菜单'
}

const del = (data) => {}
</script>

<style lang="scss" scoped>
.menu {
}
</style>

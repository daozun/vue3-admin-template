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
            <span>{{ node.name }}</span>
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
        <el-table-column prop="external" label="外部URL" />
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
        label-width="130px"
        label-position="left"
        size="default"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input
            v-model="dialogRuleForm.name"
            size="large"
            maxlength="20"
            placeholder="请输入菜单名称"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="路由" prop="route">
          <el-input
            v-model="dialogRuleForm.route"
            size="large"
            maxlength="100"
            placeholder="请输入路由"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="组件名" prop="component">
          <el-input
            v-model="dialogRuleForm.component"
            size="large"
            maxlength="100"
            placeholder="请输入组件名"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="是否在侧边栏显示">
          <el-switch
            v-model="dialogRuleForm.hidden"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </el-form-item>
        <el-form-item label="是否显示跟路由">
          <el-switch
            v-model="dialogRuleForm.alwaysShow"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </el-form-item>
        <el-form-item label="外部URL">
          <el-input
            v-model="dialogRuleForm.external"
            size="large"
            placeholder="请输入外部URL"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="重定向">
          <el-input
            v-model="dialogRuleForm.redirect"
            size="large"
            placeholder="请输入重定向"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="额外信息">
          <el-input
            v-model="dialogRuleForm.meta"
            size="large"
            type="textarea"
            placeholder="请输入额外信息"
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
import { ref, reactive, onMounted, toRaw } from 'vue'
import { getMenuList } from '@/api/modules/menu'
import { reponseCode } from '@/enum/index'

onMounted(() => {
  getDataList()
})

const getDataList = () => {
  getMenuList().then((res) => {
    if (res.statusCode === reponseCode.OK) {
      dataSource.value = res.data
      console.log(
        '%c [ dataSource.value ]-161',
        'font-size:13px; background:pink; color:#bf2c9f;',
        toRaw(dataSource.value)
      )
    }
  })
}

const dataSource = ref([
  // {
  //   id: 1,
  //   label: '菜单',
  //   children: [
  //     {
  //       id: 4,
  //       label: 'Level1-1',
  //       children: [
  //         {
  //           id: 9,
  //           label: 'Level1-1-1'
  //         },
  //         {
  //           id: 10,
  //           label: 'Level1-1-2'
  //         }
  //       ]
  //     }
  //   ]
  // }
])

const tableData = []

// dialog
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogRuleFormRef = ref()
const dialogRuleForm = reactive({
  name: '',
  route: '',
  component: '',
  hidden: false,
  alwaysShow: false,
  external: '',
  redirect: '',
  meta: ''
})
const resetForm = reactive({ ...dialogRuleForm })

const dialogRules = reactive({
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  route: [{ required: true, message: '请输入路由', trigger: 'blur' }],
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

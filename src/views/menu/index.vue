<template>
  <div class="menu flex">
    <div style="flex-basis: 550px">
      <el-tree
        :data="dataSource"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
        <template #default="{ data }">
          <span class="flex flex-1 justify-between items-center">
            <span>{{ data.name }}</span>
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
        <el-table-column prop="name" label="菜单名称">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由">
          <template #default="scope">
            <span>{{ scope.row.path }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="component" label="组件名">
          <template #default="scope">
            <span>{{ scope.row.component }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="是否在侧边栏显示">
          <template #default="scope">
            <span>{{ scope.row.hidden == false ? '否' : '是' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="alwaysShow" label="是否显示跟路由">
          <template #default="scope">
            <span>{{ scope.row.alwaysShow == false ? '否' : '是' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="external" label="外部URL">
          <template #default="scope">
            <span>{{ scope.row.external }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="redirect" label="重定向">
          <template #default="scope">
            <span>{{ scope.row.redirect }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="meta" label="额外信息">
          <template #default="scope">
            <span>{{ scope.row.meta }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="200">
          <template #default="scope">
            <el-button size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
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
        <el-form-item label="路由" prop="path">
          <el-input
            v-model="dialogRuleForm.path"
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
        <el-form-item label="是否在侧边栏隐藏">
          <el-switch
            v-model="dialogRuleForm.hidden"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </el-form-item>
        <el-form-item label="是否在根路由隐藏">
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
import { ref, reactive, onMounted } from 'vue'
import {
  getMenuList,
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  getMenuChildren
} from '@/api/modules/menu'
import { reponseCode } from '@/enum/index'

onMounted(() => {
  getAllMenu()
})

const getAllMenu = () => {
  getMenuList().then((res) => {
    if (res.statusCode === reponseCode.OK) {
      dataSource.value = res.data
    }
  })
}

const defaultProps = {
  children: 'children',
  label: 'name'
}

const dataSource = ref([])

const tableData = ref([])

const tempData = ref(null)
const tempId = ref(null)

// dialog
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogRuleFormRef = ref()
const dialogRuleForm = reactive({
  name: '',
  path: '',
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
  path: [{ required: true, message: '请输入路由', trigger: 'blur' }],
  component: [{ required: true, message: '请输入组件', trigger: 'blur' }]
})

const edit = (data) => {
  tempId.value = data.id

  Object.assign(dialogRuleForm, resetForm)
  dialogVisible.value = true
  dialogTitle.value = '编辑菜单'

  getSingleMenu()
}

const add = (data) => {
  tempData.value = data

  Object.assign(dialogRuleForm, resetForm)
  dialogVisible.value = true
  dialogTitle.value = '添加菜单'
}

const del = (data) => {
  ElMessageBox.confirm('确定删除此菜单么', 'Warning', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteMenu({
        id: data.id
      }).then((res) => {
        if (res.statusCode === reponseCode.OK) {
          ElMessage({
            message: res.message,
            type: 'success'
          })

          getAllMenu()
        }
      })
    })
    .catch(() => {})
}

// 点击菜单
const handleNodeClick = (node) => {
  getChildrenList(node.id)
}

// 获取单个菜单
const getSingleMenu = () => {
  getMenu({
    id: tempId.value
  }).then((res) => {
    if (res.statusCode === reponseCode.OK) {
      Object.assign(dialogRuleForm, res.data)
    }
  })
}

// 获取其下子菜单
const getChildrenList = (id) => {
  getMenuChildren({
    id: id
  }).then((res) => {
    if (res.statusCode === reponseCode.OK) {
      tableData.value = res.data
    }
  })
}

// 确定添加或者编辑
const confirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (dialogTitle.value === '添加菜单') {
        dialogRuleForm.parent_id = tempData.value.id
        dialogRuleForm.level = tempData.value.level + 1

        addMenu(dialogRuleForm).then((res) => {
          if (res.statusCode === reponseCode.CREATED) {
            ElMessage({
              message: res.message,
              type: 'success'
            })

            dialogVisible.value = false

            getAllMenu()
          }
        })
      }

      if (dialogTitle.value === '编辑菜单') {
        updateMenu(dialogRuleForm).then((res) => {
          if (res.statusCode === reponseCode.OK) {
            ElMessage({
              message: res.message,
              type: 'success'
            })

            dialogVisible.value = false

            getAllMenu()
          }
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.menu {
}
</style>

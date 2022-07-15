<template>
  <div class="table">
    <!-- query -->
    <el-form size="large" :inline="true" :model="query" class="query">
      <el-form-item label="标题">
        <el-input
          v-model.trim="query.title"
          clearable
          placeholder="请输入标题"
        />
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="query.status" clearable size="large">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input
          v-model.trim="query.author"
          clearable
          placeholder="请输入作者"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="tableAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column label="序号" type="index" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="标题" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180" align="center">
        <template #default="scope">
          <div>
            {{ handleStatus(scope.row.status) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.author }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="220" align="center">
        <template #default="scope">
          <div>
            {{ handleTime(scope.row.createdAt) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="220" align="center">
        <template #default="scope">
          <div>
            {{ handleTime(scope.row.updatedAt) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- pagination -->
    <el-row justify="end" style="margin-top: 20px">
      <el-pagination
        :currentPage="pageNo"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>

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
        label-width="120px"
        size="default"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="dialogRuleForm.title" size="large" />
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
          <el-input v-model="dialogRuleForm.author" size="large" />
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
import { ref, reactive, onBeforeMount } from 'vue'
import {
  addTable,
  getTable,
  getTableList,
  delTable,
  updateTable
} from '@/api/modules/table'
import { reponseCode, articleStatus } from '@/enum/index'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// beforeMount
onBeforeMount(() => {
  search()
})

// status
const statusList = reactive([
  {
    name: '草稿',
    value: '0'
  },
  {
    name: '已发布',
    value: '1'
  }
])

// pagination data
const pageNo = ref(1)
const pageSize = ref(5)
const total = ref(0)

// search form
const query = reactive({
  title: '',
  status: '',
  author: '',
  pageNo: pageNo,
  pageSize: pageSize
})

// dialog
const dialogVisible = ref(false)
const dialogTitle = ref('')

const dialogRuleFormRef = ref()
const dialogRuleForm = reactive({
  title: '',
  status: '',
  author: ''
})
const resetForm = reactive({ ...dialogRuleForm })

const dialogRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }]
})

// table data
const tableData = ref([])

// 搜索
const search = () => {
  getTableList(query).then((res) => {
    tableData.value = res.data.rows
    total.value = res.data.count
  })
}

// pagination event
const handleSizeChange = (size) => {
  pageSize.value = size
  pageNo.value = 1
  search()
}

const handleCurrentChange = (page) => {
  pageNo.value = page
  search()
}

// 添加按钮
const tableAdd = () => {
  Object.assign(dialogRuleForm, resetForm)
  dialogVisible.value = true
  dialogTitle.value = '创建'
}

// 编辑按钮
const handleEdit = (row) => {
  dialogVisible.value = true
  dialogTitle.value = '编辑'

  getTable({
    id: row.id
  }).then((res) => {
    if (res.statusCode === reponseCode.OK) {
      const result = { ...res.data }
      result.status = result.status.toString()
      Object.assign(dialogRuleForm, { ...result })
    }
  })
}

// 确定添加或者编辑
const confirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (dialogTitle.value === '创建') {
        addTable(dialogRuleForm).then((res) => {
          if (res.statusCode === reponseCode.OK) {
            dialogVisible.value = false
            search()
          }
        })
      }

      if (dialogTitle.value === '编辑') {
        updateTable({
          id: dialogRuleForm.id,
          title: dialogRuleForm.title,
          status: dialogRuleForm.status,
          author: dialogRuleForm.author
        }).then((res) => {
          if (res.statusCode === reponseCode.OK) {
            dialogVisible.value = false
            search()
          }
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 删除
const handleDelete = (row) => {
  // eslint-disable-next-line no-undef
  ElMessageBox.confirm(`确定删除标题为${row.title}的数据么`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delTable({ id: row.id }).then((res) => {
        if (res.statusCode === reponseCode.OK) {
          search()
        }
      })
    })
    .catch(() => {})
}

// 状态
const handleStatus = (status) => {
  if (status === articleStatus.draft) {
    return '草稿'
  } else if (status === articleStatus.published) {
    return '已发布'
  } else {
    return ''
  }
}

// 时间
const handleTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style lang="scss" scoped>
.table {
}
</style>

<style lang="scss">
.table {
}
</style>

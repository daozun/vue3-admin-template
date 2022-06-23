<template>
  <div class="table">
    <!-- query -->
    <el-form size="large" :inline="true" :model="form" class="query">
      <el-form-item label="姓名">
        <el-input v-model="form.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="草稿" value="0" />
          <el-option label="已发布" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" placeholder="请输入作者" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="ID" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.ID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.status }}
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
      <el-table-column label="创建时间" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.createTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="180" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.updateTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="创建"
      width="30%"
      :before-close="handleClose"
      destroy-on-close="true"
      draggable="true"
    >
      <el-form
        ref="dialogRuleFormRef"
        :model="dialogRuleForm"
        :rules="dialogRules"
        label-width="120px"
        size="default"
        status-icon
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="dialogRuleForm.username" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, ref, reactive } from "vue";

// search form
const form = reactive({
  username: "",
  status: "",
  author: "",
});

// dialog
let dialogVisible = ref(false);

const dialogRuleFormRef = ref();
const dialogRuleForm = reactive({
  username: "",
});
const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
});

// table data
const tableData = reactive([]);

// 搜索
const search = () => {};

// 添加
const confirmAdd = () => {};
</script>

<style lang="scss" scoped>
.table {
}
</style>

<style lang="scss">
.table {
}
</style>

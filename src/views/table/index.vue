<template>
  <div class="table">
    <!-- query -->
    <el-form size="large" :inline="true" :model="query" class="query">
      <el-form-item label="标题">
        <el-input v-model="query.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="发布状态状态">
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
        <el-input v-model="query.author" placeholder="请输入作者" />
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
          <el-button type="primary" @click="confirmAdd(dialogRuleFormRef)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, ref, reactive } from "vue";
import { addTable } from "@/api/modules/table";
import { reponseCode } from "@/enum/index";

// status
const statusList = reactive([
  {
    name: "草稿",
    value: "0",
  },
  {
    name: "已发布",
    value: "1",
  },
]);

// search form
const query = reactive({
  title: "",
  status: "",
  author: "",
});

// dialog
let dialogVisible = ref(false);

const dialogRuleFormRef = ref();
const dialogRuleForm = reactive({
  title: "",
  status: "",
  author: "",
});
const dialogRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
  author: [{ required: true, message: "请输入作者", trigger: "blur" }],
});

// table data
const tableData = reactive([]);

// 搜索
const search = () => {};

// 添加
const confirmAdd = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      addTable(dialogRuleForm).then((res) => {
        if (res.statusCode == reponseCode.OK) {
          dialogVisible.value = false;
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped>
.table {
}
</style>

<style lang="scss">
.table {
}
</style>

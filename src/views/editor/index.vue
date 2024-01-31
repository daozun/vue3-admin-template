<template>
  <div class="editor">
    <div class="text-xl text-slate-500 m-8 text-center">富文本编辑器</div>
    <RichText @getContent="getContent" />
    <div class="text-center">
      <button
        class="rounded-full m-8 bg-indigo-500 text-white py-2 px-4"
        @click="dialogVisible = true"
      >
        内容预览
      </button>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="富文本内容预览"
      width="70%"
      height="500px"
      :before-close="cancel"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @open="openDialog"
    >
      <div class="editor-content-view">
        <div v-html="richTextContet"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RichText from '@/components/RichText/index'

const richTextContet = ref('')
const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
}
const cancel = () => {
  dialogVisible.value = false
}

const getContent = (content) => {
  richTextContet.value = content
}
</script>

<style lang="scss" scoped>
.editor {
}
</style>
<style lang="scss">
.editor {
  .el-dialog__body {
    height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>

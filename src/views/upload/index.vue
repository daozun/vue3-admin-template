<template>
  <div class="upload-container">
    <div class="mb-20">
      <span class="align-top"> 现在头像： </span>
      <el-image
        v-if="nowAvatarUrl"
        :src="'data:image/png;base64,' + nowAvatarUrl"
      />
      <span v-else class="text-warning">暂无头像</span>
    </div>
    <div class="flex items-center">
      <span class="align-top self-start"> 上传头像： </span>
      <el-upload
        ref="uploadRef"
        action=""
        list-type="picture-card"
        :auto-upload="false"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit="2"
        :multiple="true"
        accept=".PNG,.JPEG"
      >
        <el-icon><Plus /></el-icon>

        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>

      <el-row class="ml-5">
        <el-button type="primary" @click="submitUpload" :loading="uploadLoading"
          >上传</el-button
        >
      </el-row>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <div class="text-xs text-warning ml-20 mt-5">提示：上传图片不能超过3MB</div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, toRaw } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { uploadImg } from '@/api/modules/upload'
import { getUser } from '@/api/modules/user'
import { Store } from '@/store/index'
import { RESPONSECODE } from '@/enum/index'
import { setUserInfo, getUserInfo } from '@/utils/auth'

const store = Store()

const nowAvatarUrl = ref('')

const fileList = ref([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const uploadLoading = ref(false)

onBeforeMount(() => {
  getUserData()
})

// 文件状态被改变时调用（添加图片、上传成功、上传失败）
const handleChange = (file, oldfileList) => {
  const list = toRaw(oldfileList)

  if (file) {
    const isPNG = file.raw.type === 'image/png'
    const isJPG = file.raw.type === 'image/jpeg'

    const isLt50M = file.size / 1024 / 1024 < 3

    if (isPNG || isJPG) {
      if (isLt50M) {
        if (list.length > 1) {
          fileList.value = list.slice(-1)
        } else {
          fileList.value = list
        }
      } else {
        ElMessage({
          message: '图片的大小不能超过 3 MB',
          type: 'error'
        })

        const index = list.indexOf(file)
        list.splice(index, 1)

        return false
      }
    } else {
      ElMessage({
        message: '导入图片的格式只能是 png、jpg!',
        type: 'error'
      })
      const index = list.indexOf(file)
      list.splice(index, 1)
      return false
    }
  }
}

const handleRemove = () => {
  fileList.value = []
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const getUserData = () => {
  getUser({
    id: getUserInfo()?.id
  }).then((res) => {
    if (res.statusCode === RESPONSECODE.OK) {
      setUserInfo(res.data)
      store.setUserInfo(res.data)

      nowAvatarUrl.value = res.data.avatar
    }
  })
}

const submitUpload = () => {
  if (fileList.value.length === 0) {
    ElMessage({
      message: '请先上传图片',
      type: 'warning'
    })

    return false
  }

  uploadLoading.value = true

  const formData = new FormData()
  fileList.value.forEach((file) => {
    formData.append('file', file.raw)
  })

  formData.append('userId', getUserInfo()?.id)

  disabled.value = true

  uploadImg(formData).then((res) => {
    if (res.statusCode === RESPONSECODE.OK) {
      ElMessage({
        message: res.message,
        type: 'success'
      })

      getUserData()
    }

    uploadLoading.value = false
    handleRemove()
  })
}
</script>

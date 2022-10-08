<script setup lang="ts">
import {
  ElMessage,
  ElLoading,
  type UploadRawFile,
  type UploadFile,
  type UploadFiles,
  type UploadUserFile,
} from 'element-plus'
import { includes } from 'lodash-es'
import { useUserStore } from '~/stores/user'
import { uploadHandler } from '~/utils/upload'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    fileType?: string
    isShowFileList?: boolean
    disabled?: boolean
    maxSize?: number
    tips?: string
  }>(),
  {
    modelValue: '',
    fileType: 'image/*',
    isShowFileList: false,
    disabled: false,
    maxSize: 100 * 1024, //kb
  }
)

const emit = defineEmits(['update:modelValue', 'change', 'remove'])

const token = useUserStore().token
const loadingInstance: any = ref()

let fileList = reactive<UploadUserFile[]>([])

const accept = computed(() => `${props.fileType}` || '*')

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      fileList = [{ url: newValue, name: '' }]
    } else {
      fileList = []
    }
  }
)

const handleBeforeUpload = (file: UploadRawFile) => {
  if (props.fileType === 'video' && !includes(file.type, 'mp4')) {
    ElMessage.error('请选择mp4类型的视频')
    return false
  }

  if (file.size > props.maxSize * 1024) {
    ElMessage.error(
      `文件体积不能超过 ${
        props.maxSize < 1000
          ? props.maxSize + 'KB'
          : props.maxSize / 1024 + 'MB'
      }.`
    )
    return false
  }
  loadingInstance.value = ElLoading.service({ lock: true })
}
const handleRemove = (file: UploadFile, list: UploadFiles) => {
  emit('remove')
  if (props.disabled) false
  emit('update:modelValue', '')
  emit('change', list)
}

const handleSuccess = (response: any, file: UploadFile, list: UploadFiles) => {
  loadingInstance.value?.close()

  if (!response?.url) {
    ElMessage.error('上传错误，请重新上传。')
    return
  }
  emit('update:modelValue', response.url)
  emit('change', list)
}

const handlerError = () => {
  loadingInstance.value?.close()
  ElMessage.error('上传错误，请重新上传。')
  emit('change')
}
</script>

<template>
  <el-upload
    class="uploader"
    :class="{ 'uploader--tips': tips }"
    action="/oss/token"
    :headers="{ Authorization: `Bearer ${token}` }"
    :show-file-list="isShowFileList"
    list-type="text"
    :http-request="(options) => uploadHandler(options.file)"
    :file-list="fileList"
    :on-remove="handleRemove"
    :before-upload="handleBeforeUpload"
    :multiple="false"
    :accept="accept"
    :disabled="disabled"
    :on-success="handleSuccess"
    :on-error="handlerError"
  >
    <slot>
      <el-button size="small" type="primary">点击上传</el-button>
    </slot>
    <slot name="tip">
      <div v-if="tips" class="el-upload__tip">{{ tips }}</div>
    </slot>
  </el-upload>
</template>

<style lang="scss" scoped>
.uploader {
  :deep(.el-upload) {
    display: flex;
  }
}
</style>

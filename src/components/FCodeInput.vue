<script setup lang="ts">
import { isFunction } from 'lodash-es'
import { sendPhoneCode } from '~/api/user'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  validate: {
    type: Function,
    default: null,
  },
  immediate: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const cutdown = 60
const code = ref(props.modelValue)
const isSendCode = ref(false)
const count = ref(cutdown)
let timer: any

watch(code, (val) => {
  emit('update:modelValue', val)
})

const codeText = computed(() => {
  if (isSendCode.value) {
    return `${count.value} 秒后可重新发送`
  }
  return '发送验证码'
})

const sendCode = () => {
  sendPhoneCode(props.phone, props.type)
    .then(() => {
      isSendCode.value = true
      timer = setInterval(() => {
        if (count.value <= 1) {
          clearInterval(timer)
          timer = undefined
          isSendCode.value = false
          count.value = cutdown
        }
        count.value--
      }, 1000)
    })
    .catch(() => {
      isSendCode.value = false
    })
}

const handleSendCode = () => {
  if (!!isSendCode.value || !props.phone) {
    return
  }

  if (isFunction(props.validate)) {
    props
      .validate()
      .then(sendCode)
      .catch((error: any) => console.warn(error))
  } else {
    sendCode()
  }
}

tryOnMounted(() => {
  if (props.immediate) {
    handleSendCode()
  }
})
</script>

<template>
  <el-input v-model="code" class="code-input" placeholder="请输入验证码">
    <template #suffix>
      <a @click="handleSendCode">{{ codeText }}</a>
    </template>
  </el-input>
</template>

<style lang="scss" scoped>
.code-input {
  :deep(.el-input__suffix) {
    display: flex;
    align-items: center;
    right: 24px;
  }
}
</style>

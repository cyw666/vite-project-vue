<script setup lang="ts">
import ErrorImg from '~/assets/logo.svg'

defineProps<{
  src?: string
  size?: number
  shape?: 'circle' | 'square' | undefined
}>()

const emit = defineEmits(['click'])

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<template>
  <ElAvatar
    class="f-avatar"
    :size="size"
    :src="src"
    :shape="shape"
    @click="handleClick"
  >
    <img :src="ErrorImg" alt="" />
  </ElAvatar>
</template>

<style lang="scss" scoped>
.f-avatar {
  --el-avatar-bg-color: #fdcb6e;
}
</style>

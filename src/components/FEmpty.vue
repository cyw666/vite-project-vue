<script setup lang="ts">
import EmptyImage from '~/assets/empty.svg'

withDefaults(
  defineProps<{
    show: boolean
    imageSize?: number
    description?: string
  }>(),
  {
    show: true,
    imageSize: 200,
  }
)
</script>

<template>
  <el-empty
    v-show="show"
    class="f-empty"
    :image="EmptyImage"
    :image-size="imageSize"
    :description="description"
  ></el-empty>
</template>

<style lang="scss" scoped></style>

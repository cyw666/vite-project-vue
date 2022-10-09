<template>
  <header class="flex h-screen flex-col items-center justify-center">
    <h1
      class="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100"
    >
      404 Page not Found
    </h1>
    <FButton v-if="showBackBtn" type="primary" @click="backto"
      >返回上一页</FButton
    >
  </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import FButton from '../components/FButton.vue'
const route = useRoute()
const router = useRouter()
const showBackBtn = !route.query.nobackbtn
const backto = () => {
  router.go(-1)
}
</script>

<style></style>

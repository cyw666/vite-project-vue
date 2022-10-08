<template>
  <div class="not-found-page">
    <h1 class="title">404 Not Found</h1>
    <p>
      <el-button v-if="showBackBtn" type="text" @click="backto"
        >返回上一页</el-button
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const showBackBtn = !route.query.nobackbtn
const backto = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.not-found-page {
  text-align: center;
}
.title {
  margin-top: 220px;
  margin-bottom: 16px;
  font-size: 24px;
}
</style>

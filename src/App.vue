<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import zh_cn from 'element-plus/lib/locale/lang/zh-cn'

const locale = ref(zh_cn)
</script>

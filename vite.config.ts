import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: process.env.BASE_URL || '/',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '#/': `${path.resolve(__dirname, 'types')}/`,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/composables'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'types/components.d.ts',
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://test.fetalk.tech/thanku',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
})

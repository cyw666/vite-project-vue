import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

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
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'types/components.d.ts',
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
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
})

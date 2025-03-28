import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',  // 使用相对路径
  build: {
    outDir: 'docs', // 将构建输出目录改为 docs
    emptyOutDir: true, // 构建前清空输出目录
    chunkSizeWarningLimit: 1600, // 增加块大小警告限制
    rollupOptions: {
      output: {
        manualChunks: {
          'ant-design-vue': ['ant-design-vue'],
          'lodash': ['lodash-es'],
          'icons': ['@ant-design/icons-vue']
        }
      }
    }
  }
})
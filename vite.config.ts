import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',  // 修改为根路径
  build: {
    outDir: 'docs', // 将构建输出目录改为 docs
    emptyOutDir: true, // 构建前清空输出目录
  }
})
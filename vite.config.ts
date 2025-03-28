import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/poe2_-dai-ju_-get-all/',  // 添加base配置，使用仓库名作为base
})
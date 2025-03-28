import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/poe2_-dai-ju_-get-all/',  // 使用仓库名作为base
  publicDir: 'public', // 明确指定public目录
  build: {
    outDir: 'docs', // 将构建输出目录改为 docs
    emptyOutDir: true, // 构建前清空输出目录
    chunkSizeWarningLimit: 1600, // 增加块大小警告限制
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'vendor': [
            'vue',
            'ant-design-vue',
            'lodash-es',
            '@ant-design/icons-vue'
          ]
        }
      }
    },
    assetsInlineLimit: 4096, // 小于4kb的资源将被内联为base64
    sourcemap: false, // 不生成sourcemap
    minify: 'terser', // 使用terser进行压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true // 移除debugger
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 与部署子路径保持一致；main.tsx 通过 import.meta.env.BASE_URL 读取
  base: '/token/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    // 使用 esbuild 压缩（默认），支持 terser 可进一步减小体积
    minify: 'esbuild',
    sourcemap: false,
    // 分包策略：把 react / react-dom / react-router 打到 vendor chunk
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-lucide': ['lucide-react'],
          'vendor-utils': ['clsx', 'tailwind-merge'],
        },
        // 带 hash 的 chunk 文件名便于长期缓存
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 打包体积报告（仅 CI 环境触发）
    // chunkSizeWarningLimit: 500,
  },
})

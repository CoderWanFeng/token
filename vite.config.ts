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
    minify: 'esbuild',
    sourcemap: false,
  },
})

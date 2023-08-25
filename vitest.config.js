import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },  
});
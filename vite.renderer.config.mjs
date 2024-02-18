import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    build: {
      emptyOutDir: false,
      rollupOptions: {
        input: './index.html'
      }
    },
    server: {
      host: true,
    }
  }
})

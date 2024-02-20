import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { TARGET_BY_ELECTRON } from './vite.main.config'

export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [vue()],
    build: {
      emptyOutDir: false,
      reportCompressedSize: false,
      target: TARGET_BY_ELECTRON[1],
    },
    server: {
      host: true,
    }
  }
})

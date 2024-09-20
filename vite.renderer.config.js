import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [vue(), vueJsx()],
    build: {
      emptyOutDir: false,
      reportCompressedSize: false,
      target: 'esnext',
    },
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    server: {
      host: true,
    }
  }
})

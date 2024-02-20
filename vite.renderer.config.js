import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [vue()],
    build: {
      emptyOutDir: false,
      // 也可以设置为对应的 chrome 版本。eg：Electron28 对应 chrome122
      // https://www.electronjs.org/zh/docs/latest/tutorial/electron-timelines
      target: 'esnext',
    },
    server: {
      host: true,
    }
  }
})

import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      rollupOptions: {
        input: './electron/preload.js',
        output: {
          entryFileNames: '[name].js',
        }
      }
    },
  }
})

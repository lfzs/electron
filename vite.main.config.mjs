import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      rollupOptions: {
        input: './electron/main.js',
        output: {
          entryFileNames: '[name].js',
        }
      }
    },
    resolve: {
      conditions: ['node'], // https://github.com/electron/forge/pull/3278
      mainFields: ['module', 'jsnext:main', 'jsnext'], // https://github.com/electron/forge/pull/3218
    },
  }
})

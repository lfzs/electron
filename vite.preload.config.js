import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { external, TARGET_BY_ELECTRON } from './vite.main.config'

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      reportCompressedSize: false,
      target: TARGET_BY_ELECTRON[0],
      watch: mode === 'development' ? {} : null,
      minify: mode !== 'development',
      rollupOptions: {
        external,
        input: ['./preload/a.js'],
        output: {
          format: 'cjs',
          inlineDynamicImports: true,
          entryFileNames: 'preload/[name].js',
          chunkFileNames: 'preload/[name].js',
          assetFileNames: 'preload/[name].[ext]',
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    plugins: [
      mode === 'development' && {
        closeBundle() { // 热更新
          process.viteServer.ws.send({ type: 'full-reload' })
        }
      }
    ].filter(Boolean)
  }
})

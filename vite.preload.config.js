import { defineConfig } from 'vite'
import { external } from './vite.main.config'

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      target: `node${process.versions.node}`,
      watch: mode === 'development' ? {} : null,
      minify: mode !== 'development',
      rollupOptions: {
        external,
        input: ['./preload/a.js'],
        output: {
          format: 'cjs',
          entryFileNames: 'preload/[name].js',
          // inlineDynamicImports: true,
          // entryFileNames: 'preload/[name].js',
          // chunkFileNames: 'preload/[name].js',
          // assetFileNames: 'preload/[name].[ext]',
        }
      }
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

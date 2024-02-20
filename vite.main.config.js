import { defineConfig } from 'vite'
import { builtinModules } from 'node:module'
import { spawn } from 'node:child_process'
import electron from 'electron'
import pkg from './package.json';

// 主进程和预加载脚本忽略 node 包和 dependencies 包（electron 和 package 提供了）
export const external = [
  'electron',
  ...builtinModules.map(m => [m, `node:${m}`]).flat(),
  ...Object.keys(pkg.dependencies || {})
]

// 启动 electron
let [ps, startElectron] = [null, () => ps = spawn(electron, ['dist/index.cjs'], { stdio: 'inherit' })]

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      target: `node${process.versions.node}`,
      watch: mode === 'development' ? {} : null,
      minify: mode !== 'development',
      lib: {
        entry: './index.js',
        formats: ['cjs'],
        fileName: '[name]',
      },
      rollupOptions: {
        external,
      },
    },
    resolve: {
      mainFields: ['module', 'jsnext:main', 'jsnext'], // https://github.com/electron/forge/pull/3218
    },
    plugins: [
      mode === 'development' && {
        closeBundle() { // 重启 electron
          ps?.kill()
          startElectron()
        }
      }
    ].filter(Boolean)
  }
})

import { defineConfig } from 'vite'
import { builtinModules } from 'node:module'
import { spawn } from 'node:child_process'
import electron from 'electron'
import { dependencies, devDependencies } from './package.json'

// 主进程和预加载脚本忽略 node 包和 dependencies 包（electron 和 package 提供了）
export const external = [
  'electron',
  ...builtinModules.map(m => [m, `node:${m}`]).flat(),
  ...Object.keys(dependencies || {})
]

// electron 版本内置的 node 和 chrome 版本 https://www.electronjs.org/docs/latest/tutorial/electron-timelines
export const TARGET_BY_ELECTRON = {
  29: ['node18.19', 'chrome122'], // 更新 electron 版本时，需手动更新
}[devDependencies.electron.replace('^', '').split('.')[0]]

// 启动 electron
let [ps, startElectron] = [null, () => ps = spawn(electron, ['dist/index.cjs'], { stdio: 'inherit' })]

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      reportCompressedSize: false,
      target: TARGET_BY_ELECTRON[0],
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
          ps?.kill('SIGTERM')
          startElectron()
        }
      }
    ].filter(Boolean)
  }
})

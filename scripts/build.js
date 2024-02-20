import { packager } from '@electron/packager'
import { join } from 'node:path'
import fs from 'node:fs/promises'
import minimist from 'minimist'
import { build } from 'vite'

;(async () => {
  await fs.rm('dist', { recursive: true, force: true })
  const { mode } = minimist(process.argv.slice(2))
  await Promise.all([
    build({ mode, configFile: join(process.cwd(), 'vite.renderer.config.js') }),
    build({ mode, configFile: join(process.cwd(), 'vite.main.config.js') }),
    build({ mode, configFile: join(process.cwd(), 'vite.preload.config.js') })
  ])

  // 打包
  await packager({
    // node_modules/@electron/packager/dist/types.d.ts
    dir: process.cwd(),
    out: join(process.cwd(), 'out'),
    name: 'cx',
    overwrite: true,
    icon: join(process.cwd(), 'electron/static/mac.icns'),
    ignore: [
      '/electron',
      '/public',
      '/script',
      '/src',
      '/.gitignore',
      '/index.html',
      '/index.js',
      '/preload',
      '/vite.(main|preload|renderer).config.js',
    ].map(path => new RegExp(`^${path}$`))
  })
})()
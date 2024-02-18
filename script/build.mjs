import { packager } from '@electron/packager'
import { join } from 'path'
import fs from 'fs/promises'
import minimist from 'minimist'
import * as vite from 'vite'


;(async () => {
  await fs.rm('dist', { recursive: true, force: true })
  const { mode } = minimist(process.argv.slice(2))
  await vite.build({
    mode,
    configFile: join(process.cwd(), 'vite.renderer.config.mjs'),
  })

  await vite.build({
    mode,
    configFile: join(process.cwd(), 'vite.main.config.mjs'),
  })

  await vite.build({
    mode,
    configFile: join(process.cwd(), 'vite.preload.config.mjs'),
  })

  // 打包
  // await packager({
  //   // node_modules/@electron/packager/dist/types.d.ts
  //   dir: join(process.cwd(), 'electron'),
  //   out: join(process.cwd(), 'out'),
  //   name: 'cx',
  //   overwrite: true,
  //   icon: join(process.cwd(), 'src/static/mac.icns')
  // })
})()
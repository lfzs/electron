import { join } from 'path'
import fs from 'fs/promises'
import { createServer, build } from 'vite'

;(async () => {
  await fs.rm('dist', { recursive: true, force: true })
  const server = await createServer({ configFile: join(process.cwd(), 'vite.renderer.config.js') })
  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({ print: true })
  process.viteServer = server // 提供子进程

  // 构建主进程和预加载脚本并 watch。强制修改为 dev 模式
  await build({ mode: 'development', configFile: join(process.cwd(), 'vite.preload.config.js') })
  await build({ mode: 'development', configFile: join(process.cwd(), 'vite.main.config.js') })
})()

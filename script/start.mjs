import electron from 'electron'
import { spawn } from 'child_process'
import { join } from 'path'
import { createServer } from 'vite'

;(async () => {
  const server = await createServer({
    configFile: join(process.cwd(), 'vite.renderer.config.mjs'),
  })
  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({ print: true })

  // electron 作为子进程
  process.env.VITE_SERVER_LOCAL = server.resolvedUrls.local[0] // vite server 运行地址提供给子进程
  const ps = spawn(electron, ['electron/main.js'], { stdio: 'inherit' })
  ps.on('close', process.exit)
})()
const { app, BrowserWindow } = require('electron')
const { join } = require('path')
const axios = require('axios')
axios.get('https://scrm.jianzhiweike.net/admin/common-permission/getPermissionByAcl').then(data => {
  console.info('data---------------------------')
  console.info(data)
})

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, './preload.js')
    }
  })
  app.isPackaged ? win.loadFile('index.html') : win.loadURL(process.env.VITE_SERVER_LOCAL)

  if (app.isPackaged) {

  } else { // dev 模式
    win.webContents.openDevTools()
  }

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    // if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
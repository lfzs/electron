const { app, BrowserWindow } = require('electron')
app.whenReady().then(() => {
  const win = new BrowserWindow({})
  app.isPackaged ? win.loadFile('index.html') : win.loadURL('http://localhost:5173/')

  if (app.isPackaged) {

  } else { // dev 模式
    win.webContents.openDevTools()
  }
})

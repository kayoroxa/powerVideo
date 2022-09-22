const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
// const obs = require('./src/utils/observer')

let win
let mainWindow2

app.on('ready', () => {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1240,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  win.maximize()
  win.loadURL(`file://${__dirname}/src/pages/home.html`)

  // mainWindow2 = new BrowserWindow({
  //   autoHideMenuBar: true,
  //   width: 1240,
  //   height: 720,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     contextIsolation: false,
  //     enableRemoteModule: true,
  //   },
  // })
  // mainWindow2.maximize()
  // mainWindow2.loadURL(
  //   `file://F:/MAIN/JOB/vscode/big Programns/player/pages/player/player.html`
  // )

  // globalShortcut.register('CommandOrControl+V', () => {
  //   win.webContents.send('past')
  //   // mainWindow.loadFile('other.html')
  // })
})

module.exports = {
  mainWindow: win,
}

// ipcRenderer.on('sum-request', (event, ...args) => {
//   event.sender.send('sum-reply', [...args].reduce(add, 0))
// })

// win.webContents.once('dom-ready', () => {
//   win.webContents
//   .send('sum-request', 23, 98, 3, 61)
//   ipcMain.once('sum-reply', (event, sum) => {
//     doJobWithResult(sum)
//   })
// })

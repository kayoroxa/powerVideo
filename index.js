const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  mainWindow.maximize()
  mainWindow.loadURL(`file://${__dirname}/src/pages/home.html`)
})

//♪
// /#
// obs('PAGE').on('CHANGE_HTML', path => {
//   console.log('Oi')
//   mainWindow.loadURL(`file://${path}`)
// })

import { startServer, stopServer } from './api/index'
import { ipcMain, app, BrowserWindow } from 'electron'
import { networkInterfaces } from 'os'
import { startWS, stopWS } from './api/ws'
import path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {

  })
}

let win: Electron.BrowserWindow

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, "/assets/logocontrol.ico")
  })
  win.loadFile('dist/view/home/index.html')
  //win.webContents.openDevTools()
  return win
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("start-web-server", (e, args) => {
  startWS()
  //startServer()
})

ipcMain.on("stop-web-server", (e, args): void => {
  stopWS()
  //stopServer()
})

ipcMain.handle("get-ip-address", (event)=>{
  return networkInterfaces()["Wi-Fi"][1].address
})
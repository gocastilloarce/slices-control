import { ipcMain, app, BrowserWindow } from 'electron'
import { networkInterfaces } from 'os'
import { startWS, stopWS, conectado, desconectado, escuchando, cerrando } from './api/ws'
import path = require('path')
import { randomUUID } from 'crypto'

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {})
}

let win: Electron.BrowserWindow
let token=""
let PORT=3000

const createWindow = () => {
  win = new BrowserWindow({
    width: 350,
    height: 500,
    maxHeight:600,
    maxWidth:600,
    minHeight:300,
    minWidth:350,
    icon: path.join(__dirname, "/assets/logocontrol.ico"),
    maximizable:false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.loadFile('dist/view/home/index.html')
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
  token=randomUUID()
  startWS(token)
})

ipcMain.on("stop-web-server", (e, args): void => {
  stopWS()
})

ipcMain.handle("get-connection-info", (event)=>{
  return {ip:networkInterfaces()["Wi-Fi"][1].address, token:token, port:PORT}
})

conectado(()=>{
  win.webContents.send("ws-client-connected");
})

desconectado(()=>{
  win.webContents.send("ws-client-disconnected")
})

escuchando(()=>{
  win.webContents.send("ws-server-on");
})

cerrando(()=>{
  win.webContents.send("ws-server-off")
})
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const os_1 = require("os");
const ws_1 = require("./api/ws");
const path = require("path");
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {});
}
let win;
const createWindow = () => {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, "/assets/logocontrol.ico")
    });
    win.loadFile('dist/view/home/index.html');
    //win.webContents.openDevTools()
    return win;
};
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.ipcMain.on("start-web-server", (e, args) => {
    (0, ws_1.startWS)();
    //startServer()
});
electron_1.ipcMain.on("stop-web-server", (e, args) => {
    (0, ws_1.stopWS)();
    //stopServer()
});
electron_1.ipcMain.handle("get-ip-address", (event) => {
    return (0, os_1.networkInterfaces)()["Wi-Fi"][1].address;
});

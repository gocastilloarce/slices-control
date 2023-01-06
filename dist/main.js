"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const os_1 = require("os");
const ws_1 = require("./api/ws");
const path = require("path");
const crypto_1 = require("crypto");
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {});
}
let win;
let token = "";
let PORT = 3000;
const createWindow = () => {
    win = new electron_1.BrowserWindow({
        width: 350,
        height: 500,
        maxHeight: 600,
        maxWidth: 600,
        minHeight: 300,
        minWidth: 350,
        icon: path.join(__dirname, "/assets/logocontrol.ico"),
        maximizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile('dist/view/home/index.html');
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
    token = (0, crypto_1.randomUUID)();
    (0, ws_1.startWS)(token);
});
electron_1.ipcMain.on("stop-web-server", (e, args) => {
    (0, ws_1.stopWS)();
});
electron_1.ipcMain.handle("get-connection-info", (event) => {
    return { ip: (0, os_1.networkInterfaces)()["Wi-Fi"][1].address, token: token, port: PORT };
});
(0, ws_1.conectado)(() => {
    win.webContents.send("ws-client-connected");
});
(0, ws_1.desconectado)(() => {
    win.webContents.send("ws-client-disconnected");
});
(0, ws_1.escuchando)(() => {
    win.webContents.send("ws-server-on");
});
(0, ws_1.cerrando)(() => {
    win.webContents.send("ws-server-off");
});

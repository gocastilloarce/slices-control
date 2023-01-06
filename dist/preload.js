"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const exposedIpi = {
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron
    },
    webServer: {
        start: () => electron_1.ipcRenderer.send("start-web-server"),
        stop: () => electron_1.ipcRenderer.send("stop-web-server"),
        onStart: (callback) => electron_1.ipcRenderer.on("ws-server-on", (e) => callback()),
        onStop: (callback) => electron_1.ipcRenderer.on("ws-server-off", (e) => callback()),
        onClientConnect: (cb) => electron_1.ipcRenderer.on("ws-client-connected", (e) => cb()),
        onClientDisconnect: (cb) => electron_1.ipcRenderer.on("ws-client-disconnected", (e) => cb())
    },
    getConnectionInfo: () => electron_1.ipcRenderer.invoke("get-connection-info")
};
electron_1.contextBridge.exposeInMainWorld("api", exposedIpi);

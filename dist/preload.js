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
        stop: () => electron_1.ipcRenderer.send("stop-web-server")
    },
    getIpAddress: () => electron_1.ipcRenderer.invoke("get-ip-address")
};
electron_1.contextBridge.exposeInMainWorld("api", exposedIpi);

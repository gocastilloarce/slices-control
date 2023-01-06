import { contextBridge, ipcRenderer } from 'electron';
import { ConnectionInfo, ContextBridgeApi } from './types';

const exposedIpi: ContextBridgeApi=  {
    versions: {
        node: ()=> process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron
    },
    webServer: {
        start: ()=>ipcRenderer.send("start-web-server"),
        stop: ()=>ipcRenderer.send("stop-web-server"),
        onStart: (callback)=>ipcRenderer.on("ws-server-on", (e)=>callback()),
        onStop: (callback)=>ipcRenderer.on("ws-server-off", (e)=>callback()),
        onClientConnect: (cb)=>ipcRenderer.on("ws-client-connected", (e)=>cb()),
        onClientDisconnect: (cb)=>ipcRenderer.on("ws-client-disconnected", (e)=>cb())
    },
    getConnectionInfo: ()=>ipcRenderer.invoke("get-connection-info") as Promise<ConnectionInfo>
}

contextBridge.exposeInMainWorld("api", exposedIpi)
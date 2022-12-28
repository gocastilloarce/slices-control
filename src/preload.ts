import { contextBridge, ipcRenderer } from 'electron';
import { ContextBridgeApi } from './types';

const exposedIpi: ContextBridgeApi=  {
    versions: {
        node: ()=> process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron
    },
    webServer: {
        start: ()=>ipcRenderer.send("start-web-server"),
        stop: ()=>ipcRenderer.send("stop-web-server")
    },
    getIpAddress: ()=>ipcRenderer.invoke("get-ip-address") as Promise<string>
}

contextBridge.exposeInMainWorld("api", exposedIpi)
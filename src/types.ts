export type Versions = {
    node: ()=>string
    chrome: ()=>string
    electron: ()=>string
}

export type WebServer = {
    start: ()=>void
    stop: ()=>void
    onStart: (callback)=>any
    onStop: (callback)=>any
    onClientConnect: (cb)=>void
    onClientDisconnect: (cb)=>void
}

export enum KeyActions {
    RIGHT = 'right',
    LEFT = 'left'
}

export enum ApiActions {
    LOGIN = 'login',
    KEYACTION = 'key',
    PRESENTATIONACTION = 'presentation'
}

export enum PresentationActions {
    START = 'start',
    STOP = 'stop'
}

export interface message {
    event: ApiActions
    body: any
}

export interface ConnectionInfo {
    ip:string
    token:string
    port:number
}

export type ContextBridgeApi = {
    versions: Versions,
    webServer: WebServer,
    getConnectionInfo: ()=>Promise<ConnectionInfo>
}
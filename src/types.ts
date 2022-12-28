
export type Versions = {
    node: ()=>string
    chrome: ()=>string
    electron: ()=>string
}

export type WebServer = {
    start: ()=>void
    stop: ()=>void
}

export enum KeyActions {
    RIGHT = 'right',
    LEFT = 'left'
}

export enum ApiActions {
    LOGIN = 'login',
    KEYACTION = 'key'
}

export type ContextBridgeApi = {
    versions: Versions,
    webServer: WebServer,
    getIpAddress: ()=>Promise<string>
}
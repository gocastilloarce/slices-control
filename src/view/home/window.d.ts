import * as Qr from "qrcode"
import type { ContextBridgeApi } from "../../types"

declare global {
    interface Window {
        api:ContextBridgeApi
        QRCode:typeof Qr
    }
}
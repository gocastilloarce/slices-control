import express = require("express");
const app = express();
import http = require("http");
import WebSocket = require("ws");
const server = http.createServer(app);
import { strokeRight, strokeLeft } from '../controller';
import { KeyActions, ApiActions } from "../types";
class message {
    event: ApiActions
    body: {
        token: string,
        keypress: KeyActions
    }
}
const wss = new WebSocket.Server({ server })

wss.on("connection", (ws, req) => {
    if (wss.clients.size > 1) return ws.close()
    const arr = new URL("http://example"+req.url).searchParams.getAll("token")
    if(arr.length<1)return ws.close();
    const token = arr[0];
    if(token != "holatoken") return ws.close();
    ws.on("message", (message) => {
        try {
            const { event, body }: message = JSON.parse(message.toString())
            if (!body.token) return ws.close();
            if (body.token !== "holatoken") return ws.close();
            switch (event) {
                case ApiActions.KEYACTION: {
                    switch (body.keypress) {
                        case KeyActions.LEFT: {
                            strokeLeft()
                            break
                        }
                        case KeyActions.RIGHT: {
                            strokeRight()
                            break
                        }
                    }
                    break
                }
                default: {
                    console.log("default")
                }
            }
        } catch (err) {
            ws.close()
        }
    })
    ws.on("close", (ws) => {
        console.log("desconectado")
    })
})

const startWS = () => {
    if (!server.listening) {
        server.listen(3000, () => {
            console.log("Server running on port", 3000)
        })
    }
};

const stopWS = () => {
    if (server.listening) {
        wss.clients.forEach((ws)=>ws.close())
        server.close(()=>{
            console.log("Closing Server")
        })
    }
}

export { startWS, stopWS }
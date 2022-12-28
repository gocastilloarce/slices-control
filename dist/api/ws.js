"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopWS = exports.startWS = void 0;
const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const controller_1 = require("../controller");
const types_1 = require("../types");
class message {
}
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws, req) => {
    if (wss.clients.size > 1)
        return ws.close();
    const arr = new URL("http://example" + req.url).searchParams.getAll("token");
    if (arr.length < 1)
        return ws.close();
    const token = arr[0];
    if (token != "holatoken")
        return ws.close();
    ws.on("message", (message) => {
        try {
            const { event, body } = JSON.parse(message.toString());
            if (!body.token)
                return ws.close();
            if (body.token !== "holatoken")
                return ws.close();
            switch (event) {
                case types_1.ApiActions.KEYACTION: {
                    switch (body.keypress) {
                        case types_1.KeyActions.LEFT: {
                            (0, controller_1.strokeLeft)();
                            break;
                        }
                        case types_1.KeyActions.RIGHT: {
                            (0, controller_1.strokeRight)();
                            break;
                        }
                    }
                    break;
                }
                default: {
                    console.log("default");
                }
            }
        }
        catch (err) {
            ws.close();
        }
    });
    ws.on("close", (ws) => {
        console.log("desconectado");
    });
});
const startWS = () => {
    if (!server.listening) {
        server.listen(3000, () => {
            console.log("Server running on port", 3000);
        });
    }
};
exports.startWS = startWS;
const stopWS = () => {
    if (server.listening) {
        wss.clients.forEach((ws) => ws.close());
        server.close(() => {
            console.log("Closing Server");
        });
    }
};
exports.stopWS = stopWS;

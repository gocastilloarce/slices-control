"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cerrando = exports.escuchando = exports.desconectado = exports.conectado = exports.stopWS = exports.startWS = void 0;
const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const controller_1 = require("../controller");
const types_1 = require("../types");
let connectionToken = "";
const wss = new WebSocket.Server({ server });
const conectado = (cb) => wss.on("connection", cb);
exports.conectado = conectado;
let desconect = () => { console.log("dess"); };
let desconectado = (cb) => {
    desconect = cb;
};
exports.desconectado = desconectado;
const escuchando = (cb) => wss.addListener("listening", cb);
exports.escuchando = escuchando;
const cerrando = (cb) => server.addListener("close", cb);
exports.cerrando = cerrando;
wss.on("connection", (ws, req) => {
    ws.on("close", desconect);
    if (wss.clients.size > 1)
        return ws.close();
    const arr = new URL("http://example" + req.url).searchParams.getAll("token");
    if (arr.length < 1)
        return ws.close();
    const token = arr[0];
    if (token !== connectionToken)
        return ws.close();
    ws.on("message", (message) => {
        try {
            const { event, body } = JSON.parse(message.toString());
            switch (event) {
                case types_1.ApiActions.KEYACTION: {
                    const { keypress } = body;
                    switch (keypress) {
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
                case types_1.ApiActions.PRESENTATIONACTION: {
                    const { action } = body;
                    switch (action) {
                        case types_1.PresentationActions.START: {
                            (0, controller_1.startPresentation)();
                            break;
                        }
                        case types_1.PresentationActions.STOP: {
                            (0, controller_1.stopPresentation)();
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
            console.log("error", err);
            ws.close();
        }
    });
});
const startWS = (token) => {
    if (!server.listening) {
        connectionToken = token;
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

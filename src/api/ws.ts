import express = require("express");
const app = express();
import http = require("http");
import WebSocket = require("ws");
const server = http.createServer(app);
import { strokeRight, strokeLeft, startPresentation, stopPresentation } from '../controller';
import { KeyActions, ApiActions, message, PresentationActions } from "../types";

let connectionToken = "";
const wss = new WebSocket.Server({ server })

const conectado = (cb) => wss.on("connection", cb);
let desconect = () => {console.log("dess") }
let desconectado = (cb: () => void) => {
  desconect = cb
};
const escuchando = (cb) => wss.addListener("listening", cb)
const cerrando = (cb) => server.addListener("close", cb)

wss.on("connection", (ws, req) => {
  ws.on("close", desconect)
  if (wss.clients.size > 1) return ws.close()
  const arr = new URL("http://example" + req.url).searchParams.getAll("token")
  if (arr.length < 1) return ws.close();
  const token = arr[0];
  if (token !== connectionToken) return ws.close();
  ws.on("message", (message) => {
    try {
      const { event, body }: message = JSON.parse(message.toString())
      switch (event) {
        case ApiActions.KEYACTION: {
          const { keypress } = body
          switch (keypress) {
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
        case ApiActions.PRESENTATIONACTION: {
          const { action } = body
          switch (action) {
            case PresentationActions.START: {
              startPresentation()
              break;
            }
            case PresentationActions.STOP: {
              stopPresentation()
              break;
            }
          }
          break;
        }
        default: {
          console.log("default")
        }
      }
    } catch (err) {
      console.log("error", err)
      ws.close()
    }
  })
})

const startWS = (token:string) => {
  if (!server.listening) {
    connectionToken=token
    server.listen(3000, () => {
      console.log("Server running on port", 3000)
    })
  }
};

const stopWS = () => {
  if (server.listening) {
    wss.clients.forEach((ws) => ws.close())
    server.close(() => {
      console.log("Closing Server")
    })
  }
}

export { startWS, stopWS, conectado, desconectado, escuchando, cerrando }
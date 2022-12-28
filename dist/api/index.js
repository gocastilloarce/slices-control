"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServer = exports.startServer = void 0;
const express = require("express");
const controller_1 = require("../controller");
let cors = require('cors');
const app = express();
let server = null;
app.use(cors({ origin: true /* /192.168.[0-255].[0-255]/ */ }));
app.post("/api/right", (req, res) => {
    try {
        (0, controller_1.strokeRight)();
        res.send("hola mundo");
    }
    catch (err) {
        console.log("error", err);
    }
});
app.post("/api/left", (req, res) => {
    try {
        (0, controller_1.strokeLeft)();
        res.send("hola mundo");
    }
    catch (err) {
        console.log("error");
    }
});
app.get("/api/ping", (req, res) => {
    console.log(req.ip);
    res.sendStatus(200);
});
const startServer = () => {
    if (server === null) {
        server = app.listen(3000, () => {
            console.log("server on");
        });
    }
};
exports.startServer = startServer;
const stopServer = () => {
    if (server !== null) {
        server.close();
        server = null;
        console.log("server off");
    }
};
exports.stopServer = stopServer;

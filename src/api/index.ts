import express = require('express');
import { Express } from 'express';
import { Server } from 'http';
import { strokeRight, strokeLeft } from '../controller';
let cors = require('cors')

const app:Express = express();
let server:Server = null

app.use(cors({origin:true/* /192.168.[0-255].[0-255]/ */}))

app.post("/api/right", (req, res) => {
    try {
        strokeRight()
        res.send("hola mundo")
    }catch (err) {     
        console.log("error",err)
    }
})

app.post("/api/left", (req, res) => {
    try {
        strokeLeft()
        res.send("hola mundo")
    } catch (err) {
        console.log("error")
    }
})

app.get("/api/ping", (req, res) => {
    console.log(req.ip)
    res.sendStatus(200)
})

export const startServer = () => {
    if (server === null ) {
        server = app.listen(3000, () => {
            console.log("server on")
        })
    }
}

export const stopServer = () => {
    if (server !== null) {
        server.close()
        server = null
        console.log("server off")
    }
}
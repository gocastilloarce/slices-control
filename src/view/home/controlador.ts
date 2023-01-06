let wsServerOn = false
const generateQRAddress = async()=> {
    const imagen = document.getElementById("qr-container");
    const {ip, token, port} = await window.api.getConnectionInfo();
    const protocol = "ws";
    const params = new URLSearchParams()
    params.append("token",token)
    const url = new URL("http://example.com")
    url.search = params.toString()
    url.protocol = protocol
    url.port = port.toString()
    url.host=ip
    window.QRCode.toString(url.href).then((str)=>{
        imagen.innerHTML=str
    })
}

const toggleWS = ()=>{
    if(wsServerOn) {
        window.api.webServer.stop()
    }else {
        window.api.webServer.start()
    }
}

const onoff = document.getElementById("on-of-indicator") as HTMLSpanElement
onoff.addEventListener("click", ()=>{
    toggleWS();
})

const clientConnection = document.getElementById("client-connection")
const serverIsOff = document.getElementById("server-is-off")

window.api.webServer.onStart(()=>{
    generateQRAddress();
    wsServerOn=true
    onoff.classList.remove("on-of-indicator-off")
    onoff.classList.add("on-of-indicator-on")
    onoff.innerText= "ON"
    clientConnection.classList.remove("hidden");
    serverIsOff.classList.add("hidden")
})

window.api.webServer.onStop(()=>{
    wsServerOn=false
    onoff.classList.add("on-of-indicator-off")
    onoff.classList.remove("on-of-indicator-on")
    onoff.innerText= "OFF"
    clientConnection.classList.add("hidden");
    serverIsOff.classList.remove("hidden")
})


const connectionIndicator = document.getElementById("qr-connected")
const lea = document.getElementById("lea-qr")
const qrcontainer = document.getElementById("qr-container")
window.api.webServer.onClientConnect(()=>{
    connectionIndicator.classList.remove("hidden")
    lea.classList.add("hidden")
    qrcontainer.classList.add("hidden")
})

window.api.webServer.onClientDisconnect(()=>{
    generateQRAddress();
    connectionIndicator.classList.add("hidden")
    lea.classList.remove("hidden")
    qrcontainer.classList.remove("hidden")
})
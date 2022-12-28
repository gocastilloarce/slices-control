
const div1 = document.getElementById("info")

const informacion = document.getElementById('info')

const botonUp = document.getElementById("buttonUp");
botonUp.addEventListener('click', () => {
    window.api.webServer.start()
}) 

const botonDown = document.getElementById("buttonDown");
botonDown.addEventListener('click', () => {
    window.api.webServer.stop()
})

const input = document.getElementById("input") as HTMLInputElement

input.addEventListener("input", (e)=>{
    const target = e.target as HTMLInputElement
    console.log(target.value)
})

const generateQRAddress = async()=> {
    const imagen = document.getElementById("imagen");
    const ip = await window.api.getIpAddress();
    const protocol = "ws";
    const port="3000";
    const params = new URLSearchParams()
    params.append("token","holatoken")
    const url = new URL("http://example.com")
    url.search = params.toString()
    url.protocol = protocol
    url.port = port
    url.host=ip
    window.QRCode.toString(url.href).then((str)=>{
        imagen.innerHTML=str
    }) 
}

generateQRAddress();
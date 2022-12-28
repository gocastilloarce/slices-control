var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const div1 = document.getElementById("info");
const informacion = document.getElementById('info');
const botonUp = document.getElementById("buttonUp");
botonUp.addEventListener('click', () => {
    window.api.webServer.start();
});
const botonDown = document.getElementById("buttonDown");
botonDown.addEventListener('click', () => {
    window.api.webServer.stop();
});
const input = document.getElementById("input");
input.addEventListener("input", (e) => {
    const target = e.target;
    console.log(target.value);
});
const generateQRAddress = () => __awaiter(this, void 0, void 0, function* () {
    const imagen = document.getElementById("imagen");
    const ip = yield window.api.getIpAddress();
    const protocol = "ws";
    const port = "3000";
    const params = new URLSearchParams();
    params.append("token", "holatoken");
    const url = new URL("http://example.com");
    url.search = params.toString();
    url.protocol = protocol;
    url.port = port;
    url.host = ip;
    window.QRCode.toString(url.href).then((str) => {
        imagen.innerHTML = str;
    });
});
generateQRAddress();

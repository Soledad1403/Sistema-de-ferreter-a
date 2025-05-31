function mostrarMensaje(event) {
    event.preventDefault(); // Evita el envío real del formulario
    document.getElementById("mensaje-enviado").style.display = "block";
}

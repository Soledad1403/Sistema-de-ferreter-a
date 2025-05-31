let carrito = [];
function agregarAlCarrito(producto, precio) {
    carrito.push({producto, precio});
    actualizarCarrito();
}

function actualizarCarrito() {
    let lista = document.getElementById('lista-carrito');
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        lista.innerHTML += `<li>${item.producto} - $${item.precio}</li>`;
        total += item.precio;
    });

    document.getElementById('total').innerText = "$" + total;
}

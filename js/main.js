let recetaSeleccionada = ""
let carrito = []

document.getElementById("calcular").addEventListener("click", calcularIngredientes)
document.getElementById("eliminarCarrito").addEventListener("click", eliminarCarrito)

function seleccionarReceta(receta) {
    recetaSeleccionada = receta
    document.getElementById("recetaElegida").innerText = `Has seleccionado: ${recetaSeleccionada}`
}

const recetas = [
    {
        nombre: "risotto",
        ingredientes: [
            { nombre: "Arroz", cantidad: 75, precio: 0.5 },
            { nombre: "Champignones", cantidad: 40, precio: 1.0 },
            { nombre: "Cebolla", cantidad: 12, precio: 0.3 }
        ]
    },
    {
        nombre: "lasagna",
        ingredientes: [
            { nombre: "Pasta", cantidad: 200, precio: 1.5 },
            { nombre: "Carne picada", cantidad: 150, precio: 3.0 },
            { nombre: "Vegetales", cantidad: 100, precio: 2.0 }
        ]
    },
    {
        nombre: "pasta",
        ingredientes: [
            { nombre: "Espagueti", cantidad: 100, precio: 1.2 },
            { nombre: "Salsa de tomate", cantidad: 80, precio: 0.8 },
            { nombre: "Zucchini", cantidad: 50, precio: 1.0 }
        ]
    }
]


function guardarRecetasFavoritas(favoritas) {
    localStorage.setItem("favoritas", JSON.stringify(favoritas))
}

function obtenerRecetasFavoritas() {
    const favoritasJSON = localStorage.getItem("favoritas")
    return favoritasJSON ? JSON.parse(favoritasJSON) : []
}

function crearBotonesDeRecetas(recetas) {
    const contenedor = document.getElementById("contenedor-botones")
    contenedor.innerHTML = ""

    const favoritas = obtenerRecetasFavoritas();

    recetas.forEach(receta => {
        const contenedorReceta = document.createElement("div")
        contenedorReceta.classList.add("px-3")
        const botonReceta = document.createElement("button")
        botonReceta.textContent = receta.nombre
        botonReceta.classList.add("rounded-pill", "btn" )
        contenedorReceta.appendChild(botonReceta)

        const botonFavorito = document.createElement("button")
        botonFavorito.textContent = "★"
        botonFavorito.classList.add("boton-favorito")
        if (favoritas.includes(receta.nombre)) {
            botonFavorito.classList.add("seleccionado")
        }
        botonFavorito.addEventListener("click", () => {
            toggleFavorito(receta.nombre)
            crearBotonesDeRecetas(recetas)
        });

        
        contenedorReceta.appendChild(botonFavorito)
        contenedor.appendChild(contenedorReceta)

        botonReceta.addEventListener("click", () => {
            seleccionarReceta(receta.nombre)
        })
    })
}

function toggleFavorito(nombreReceta) {
    let favoritas = obtenerRecetasFavoritas()
    if (favoritas.includes(nombreReceta)) {
        favoritas = favoritas.filter(nombre => nombre !== nombreReceta)
    } else {
        favoritas.push(nombreReceta)
    }
    guardarRecetasFavoritas(favoritas)
}

crearBotonesDeRecetas(recetas)


function calcularIngredientes() {
    let receta = recetaSeleccionada
    let recetaEncontrada = recetas.find((r) => r.nombre === receta)

    if (!recetaEncontrada) {
        document.getElementById("mensaje").innerText = "Por favor, selecciona una receta antes de calcular los ingredientes."
        return;
    }

    let comensales = parseInt(document.getElementById("comensales").value)
    if (isNaN(comensales) || comensales <= 0) {
        document.getElementById("mensaje").innerText = "Por favor, ingresa un número válido de personas."
        return;
    }

    let mensaje = "Vas a necesitar:\n"
    let ingredientesDiv = document.getElementById("ingredientes")
    ingredientesDiv.innerHTML = ""

    recetaEncontrada.ingredientes.forEach(i => {
        let cantidadTotal = i.cantidad * comensales
        let ingredienteHTML = `
        
        <div class="row py-2 px-5">
            <div class="col-10 text-start">
                <h5 class="p-0 m-0">${i.nombre}: ${cantidadTotal}gr</h5>
                <p class="p-0 m-0">$${i.precio.toFixed(2)} por unidad</p>
            </div>
            <div class="col-2 text-center">
                <button class="fa-solid fa-cart-shopping btnNone agregar-carrito" data-nombre="${i.nombre}" data-cantidad="${cantidadTotal}" data-precio="${i.precio}"></button>
            </div>
        </div>`
        ingredientesDiv.innerHTML += ingredienteHTML
    })

    document.getElementById("mensaje").innerText = mensaje

    document.querySelectorAll(".agregar-carrito").forEach(button => {
        button.addEventListener("click", (e) => {
            let nombre = e.target.getAttribute("data-nombre")
            let cantidad = parseInt(e.target.getAttribute("data-cantidad"))
            let precio = parseFloat(e.target.getAttribute("data-precio"))
            agregarAlCarrito(nombre, cantidad, precio)
        })
    })
}

function agregarAlCarrito(nombre, cantidad, precio) {
    let ingredienteEnCarrito = carrito.find(item => item.nombre === nombre)
    if (ingredienteEnCarrito) {
        ingredienteEnCarrito.cantidad = cantidad
        ingredienteEnCarrito.numIngredientes += 1
        ingredienteEnCarrito.precio += precio
    } else {
        carrito.push({ nombre: nombre, cantidad: cantidad, numIngredientes: 1, precio: precio })
    }
    actualizarCarrito()

}

function actualizarCarrito() {
    let carritoDiv = document.getElementById("carrito")
    carritoDiv.innerHTML = ""
    let total = 0
    carrito.forEach(ingrediente => {
        let precioTotal = ingrediente.numIngredientes * ingrediente.precio
        total += precioTotal
        carritoDiv.innerHTML += `<div class="py-2"><h4>${ingrediente.nombre}</h4><p>${ingrediente.cantidad} Gr X ${ingrediente.numIngredientes} = $${precioTotal.toFixed(2)}</div></p>`
    })
    document.getElementById("total").innerText = `Total: $${total.toFixed(2)}`
}

function eliminarCarrito() {
    carrito = []
    actualizarCarrito()
}


document.addEventListener("DOMContentLoaded", (event) => {
    const body = document.body
    const botonToggle = document.getElementById("toggleButton")

    function aplicarModoOscuro(estaOscuro) {
        if(estaOscuro) {
            body.classList.add("dark-mode")
        }else {
            body.classList.remove("dark-mode")
        }
    }

    function alternarModoOscuro() {
        const estaEnModoOscuro = body.classList.toggle("dark-mode")
        localStorage.setItem("modoOscuro", estaEnModoOscuro ? "habilitado" : "deshabilitado")
    }

    function inicializarModoOscuro() {
        const modoOscuroGuardado = localStorage.getItem("modoOscuro")
        if (modoOscuroGuardado === "habilitado") {
            aplicarModoOscuro(true)
        } else {
            aplicarModoOscuro(false)
        }
    }

    inicializarModoOscuro()

    botonToggle.addEventListener("click", alternarModoOscuro)
})
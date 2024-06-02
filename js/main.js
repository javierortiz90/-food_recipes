let recetaSeleccionada = "";
let carrito = []

document.getElementById('calcular').addEventListener('click', calcularIngredientes);
document.getElementById('eliminarCarrito').addEventListener('click', eliminarCarrito);
//document.getElementById("eliminarBusqueda").addEventListener("click", eliminarBusqueda)

function seleccionarReceta(receta) {
    recetaSeleccionada = receta;
    document.getElementById("recetaElegida").innerText = `Has seleccionado: ${recetaSeleccionada}`;
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
];


// Función para guardar recetas favoritas en localStorage
function guardarRecetasFavoritas(favoritas) {
    localStorage.setItem('favoritas', JSON.stringify(favoritas));
}

// Función para obtener recetas favoritas desde localStorage
function obtenerRecetasFavoritas() {
    const favoritasJSON = localStorage.getItem('favoritas');
    return favoritasJSON ? JSON.parse(favoritasJSON) : [];
}

// Función para crear los botones de recetas
function crearBotonesDeRecetas(recetas) {
    // Selecciona el contenedor donde se añadirán los botones
    const contenedor = document.getElementById('contenedor-botones');
    contenedor.innerHTML = ''; // Limpiar el contenedor

    // Obtener recetas favoritas
    const favoritas = obtenerRecetasFavoritas();

    // Itera sobre cada receta
    recetas.forEach(receta => {
        // Crea un contenedor para cada receta
        const contenedorReceta = document.createElement('div');
        contenedorReceta.classList.add("px-3")
        // Crea un elemento botón para la receta
        const botonReceta = document.createElement('button');
        botonReceta.textContent = receta.nombre;
        botonReceta.classList.add("rounded-pill", "btn" );
        // Añade el botón de receta al contenedor de receta
        contenedorReceta.appendChild(botonReceta);

        // Crea un elemento botón para marcar como favorito
        const botonFavorito = document.createElement('button');
        botonFavorito.textContent = '★';
        botonFavorito.classList.add("boton-favorito");
        // Si la receta es favorita, añade una clase especial
        if (favoritas.includes(receta.nombre)) {
            botonFavorito.classList.add('seleccionado');
        }
        // Añade evento de click para marcar como favorito
        botonFavorito.addEventListener('click', () => {
            toggleFavorito(receta.nombre);
            crearBotonesDeRecetas(recetas);
        });

        
        // Añade el botón de favorito al contenedor de receta
        contenedorReceta.appendChild(botonFavorito);
        // Añade el contenedor de receta al contenedor principal
        contenedor.appendChild(contenedorReceta);

       

        botonReceta.addEventListener('click', () => {
            seleccionarReceta(receta.nombre);})
    });
}

// Función para marcar/desmarcar una receta como favorita
function toggleFavorito(nombreReceta) {
    let favoritas = obtenerRecetasFavoritas();
    if (favoritas.includes(nombreReceta)) {
        favoritas = favoritas.filter(nombre => nombre !== nombreReceta);
    } else {
        favoritas.push(nombreReceta);
    }
    guardarRecetasFavoritas(favoritas);
}

// Crear botones de recetas con las recetas obtenidas desde el array
crearBotonesDeRecetas(recetas);


function calcularIngredientes() {
    let receta = recetaSeleccionada;
    let recetaEncontrada = recetas.find((r) => r.nombre === receta);

    if (!recetaEncontrada) {
        document.getElementById("mensaje").innerText = "Por favor, selecciona una receta antes de calcular los ingredientes.";
        return;
    }

    let comensales = parseInt(document.getElementById("comensales").value);
    if (isNaN(comensales) || comensales <= 0) {
        document.getElementById("mensaje").innerText = "Por favor, ingresa un número válido de personas.";
        return;
    }

    let mensaje = "Vas a necesitar:\n";
    let ingredientesDiv = document.getElementById("ingredientes");
    ingredientesDiv.innerHTML = ""; // borrar busqueda anterior

    recetaEncontrada.ingredientes.forEach(i => {
        let cantidadTotal = i.cantidad * comensales;
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
        ingredientesDiv.innerHTML += ingredienteHTML;
    });

    document.getElementById("mensaje").innerText = mensaje;

    // Agrego eventlisteners a botones "Agregar al carrito"
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', (e) => {
            let nombre = e.target.getAttribute('data-nombre');
            let cantidad = parseInt(e.target.getAttribute('data-cantidad'));
            let precio = parseFloat(e.target.getAttribute('data-precio'));
            agregarAlCarrito(nombre, cantidad, precio);
        });
    });
}

function agregarAlCarrito(nombre, cantidad, precio) {
    let ingredienteEnCarrito = carrito.find(item => item.nombre === nombre);
    if (ingredienteEnCarrito) {
        ingredienteEnCarrito.cantidad = cantidad;
        ingredienteEnCarrito.numIngredientes += 1;
        ingredienteEnCarrito.precio += precio;
    } else {
        carrito.push({ nombre: nombre, cantidad: cantidad, numIngredientes: 1, precio: precio });
    }
    actualizarCarrito();

}

function actualizarCarrito() {
    let carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";
    let total = 0;
    carrito.forEach(ingrediente => {
        let precioTotal = ingrediente.numIngredientes * ingrediente.precio;
        total += precioTotal;
        carritoDiv.innerHTML += `<div class="py-2"><h4>${ingrediente.nombre}</h4><p>${ingrediente.cantidad} Gr X ${ingrediente.numIngredientes} = $${precioTotal.toFixed(2)}</div></p>`;
    });
    document.getElementById("total").innerText = `Total: $${total.toFixed(2)}`;
}

function eliminarCarrito() {
    carrito = [];
    total = []
    actualizarCarrito();
}
/* 
function eliminarBusqueda(){
    recetaEncontrada = ""
    ingredienteHTML = ""
    seleccionarReceta()
} */



//////////DARK MODE/////////////////

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
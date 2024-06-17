let recetaSeleccionada = ""
let carrito = []
let recetas = []

document.getElementById("calcular").addEventListener("click", calcularIngredientes)
document.getElementById("eliminarCarrito").addEventListener("click", eliminarCarrito)
document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra)

function seleccionarReceta(receta) {
    recetaSeleccionada = receta
    document.getElementById("recetaElegida").innerText = `${recetaSeleccionada}`
}

fetch("./json/recetas.json")
    .then((response) => response.json())
    .then(data => {
        recetas = data.recetas
        inicial()
})
.catch(error => {
    console.log("Error:", error)
});
    
function inicial() {
    crearBotonesDeRecetas(recetas)
    crearBotonesMenu()
}

function crearBotonesDeRecetas(recetas) {
    const contenedor = document.getElementById("contenedor")
    contenedor.innerHTML = ""

    const favoritas = obtenerRecetasFavoritas();

    recetas.forEach(receta => {
        const contenedorCard = document.createElement("div")
        contenedorCard.classList.add("col-12","col-sm-6","col-md-4","p-3","text-center")

        const card = document.createElement("div")
        card.classList.add("bg-dark-mode","shadow","rounded-3","p-3","align-content-center","position-relative","objectFitCover","card-height") 
        card.style.backgroundImage = `url(${receta.imagen})`
        card.innerHTML = `
                    <button type="button" class="text-light btnNone" data-bs-toggle="modal" data-bs-target="#exampleModal">${receta.nombre}</button>
                    `
       
        const botonFavorito = document.createElement("button")
        botonFavorito.textContent = "★"
        botonFavorito.classList.add("boton-favorito")

        if(favoritas.includes(receta.nombre)) {
            botonFavorito.classList.add("seleccionado")
        }

        botonFavorito.addEventListener("click", () => {
            toggleFavorito(receta.nombre)
            crearBotonesDeRecetas(recetas)
        });

        contenedor.appendChild(contenedorCard)  
        contenedorCard.appendChild(card)
        card.appendChild(botonFavorito)

        card.addEventListener("click", () => {
            seleccionarReceta(receta.nombre)
            limpiarModal()        
        })
        
    })
}

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
                <i class="fa-solid fa-circle-plus btnNone agregar-carrito" data-nombre="${i.nombre}" data-cantidad="${cantidadTotal}" data-precio="${i.precio}"></i>
            </div>
        </div>
        `
        ingredientesDiv.innerHTML += ingredienteHTML
    });

    document.querySelectorAll(".agregar-carrito").forEach(button => {
        button.addEventListener("click", (e) => {

            let nombre = e.target.getAttribute("data-nombre")
            let cantidad = parseInt(e.target.getAttribute("data-cantidad"))
            let precio = parseFloat(e.target.getAttribute("data-precio"))

            Toastify({
                text: `Agregaste ${nombre} al carrito`,
                duration: 1000
            }).showToast();

            agregarAlCarrito(nombre, cantidad, precio);
        });
    });

    document.getElementById("mensaje").innerText = mensaje
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
    botonFinalizarCompra()
}

function eliminarCarrito() {
    Swal.fire({
    text: "Queres eliminar todos los productos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "si, Eliminar"
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
        text: "Eliminaste todos los productos",
        icon: "success"
        });
        carrito = []
        actualizarCarrito()
    }
    });
}

function botonFinalizarCompra(){
    const contenedor = document.getElementById("finalizarCompra")
    contenedor.innerHTML = ""

        const botonFinalizar = document.createElement("button")
        botonFinalizar.classList.add("btn","btn-primary","rounded-pill","w-100","my-2")
        botonFinalizar.textContent="Finalizar Compra"
        contenedor.appendChild(botonFinalizar)

        botonFinalizar.style.display = carrito.length > 0 ? 'block' : 'none'
}

function finalizarCompra() {
    let timerInterval;
    Swal.fire({
    title: "Gracias por tu compra!",
    html: "Te enviamos un correo para que sigas tu envio. <br><br> Serás redireccionado en <b></b> millisegundos.",
    timer: 4000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
    },
    willClose: () => {
        clearInterval(timerInterval);
    }
    }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
    }
    });

    carrito = []
    actualizarCarrito()
}

function guardarRecetasFavoritas(favoritas) {
    localStorage.setItem("favoritas", JSON.stringify(favoritas))
}

function obtenerRecetasFavoritas() {
    const favoritasJSON = localStorage.getItem("favoritas")
    return favoritasJSON ? JSON.parse(favoritasJSON) : []
}

function toggleFavorito(nombreReceta) {
    let favoritas = obtenerRecetasFavoritas()
    favoritas.includes(nombreReceta) ? favoritas = favoritas.filter(nombre => nombre !== nombreReceta) : favoritas.push(nombreReceta);
    guardarRecetasFavoritas(favoritas)
}

function crearBotonesMenu() {
    const contenedor = document.getElementById("contenedor-menu")
    contenedor.innerHTML = ""

        const botonMostrarTodos = document.createElement("button")
        botonMostrarTodos.classList.add("rounded-pill", "btn", "btn-primary", "m-2")
        botonMostrarTodos.textContent = "Todos"
        contenedor.appendChild(botonMostrarTodos)
    
        botonMostrarTodos.addEventListener('click', () => {
            crearBotonesDeRecetas(recetas)
        })

    const tiposDeMenu = new Set();

    recetas.forEach(receta => {
        if (!tiposDeMenu.has(receta.tipoMenu)) {
            tiposDeMenu.add(receta.tipoMenu)

   
        const botonMenu = document.createElement("button")
        botonMenu.classList.add("rounded-pill", "btn", "btn-primary", "m-2")
        botonMenu.textContent = receta.tipoMenu

        contenedor.appendChild(botonMenu)

        botonMenu.addEventListener('click', () => {
            const menuBuscado = receta.tipoMenu
            const resultado = filtrarTipoMenu(menuBuscado)
            crearBotonesDeRecetas(resultado)
            })
        }
    })
}

function filtrarTipoMenu(menuBuscado) {
    return recetas.filter(menu => menu.tipoMenu === menuBuscado)
}

function limpiarModal(){
    document.getElementById("comensales").value = ""
    document.getElementById("mensaje").innerHTML = ""
    document.getElementById("ingredientes").innerHTML = ""

}
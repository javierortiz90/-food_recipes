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

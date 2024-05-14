function recetario() {
    
    const recetas = [
        {
            nombre: "risotto",
            ingredientes: [
                { nombre: "Arroz", cantidad: 75 },
                { nombre: "Champignones", cantidad: 40 },
                { nombre: "Cebolla", cantidad: 12 }
            ]
        },
        {
            nombre: "lasagna",
            ingredientes: [
                { nombre: "Pasta", cantidad: 200 },
                { nombre: "Carne picada", cantidad: 150 },
                { nombre: "Vegetales", cantidad: 100 }
            ]
        },
        {
            nombre: "pasta",
            ingredientes: [
                { nombre: "Espagueti", cantidad: 100 },
                { nombre: "Salsa de tomate", cantidad: 80 },
                { nombre: "Zucchini", cantidad: 50 }
            ]
        }
    ];

    let consulta = confirm("Bienvenido a recetario,\nTe voy a ayudar a calcular los ingredientes para la receta que elijas");

    if (consulta) {
        let recetaEncontrada;

       do {
            let receta = prompt("Ingresa una receta: \n 1. Risotto \n 2. Lasagna \n 3. Pasta");
            receta = receta.toLowerCase()
            let recetaEncontrada = recetas.find((r) => r.nombre === receta);

            if (recetaEncontrada) {
                let comensales = parseInt(prompt(`Para cuántas personas quieres cocinar ${receta}`));
                alert(`Tengo la receta para cocinar ${receta}`);

                let calcular = confirm(`¿Quieres que te calcule los ingredientes para ${comensales} personas?`);
                if (calcular) {
                    let mensaje = "Vas a necesitar:\n";
                    recetaEncontrada.ingredientes.forEach(ingrediente => {
                        let cantidadTotal = ingrediente.cantidad * comensales;
                        mensaje += `${ingrediente.nombre}: ${cantidadTotal}gr\n`;
                    });
                    alert(mensaje)
                    alert("¡Que lo disfrutes!");
                }
            } else {
                alert("Lo siento, no tengo en mis registros la receta que estás buscando");
            }
        } while (recetas.nombre != recetaEncontrada);
    }
}

recetario();
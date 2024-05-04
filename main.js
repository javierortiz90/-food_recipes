function recetario(){

    let consulta = confirm("Bienvendio a recetario,\nTe voy a ayudar a calcular los ingredientes para la receta que elijas")
    
        if(consulta == true){
    
            do{
            receta = prompt("Ingresa una receta: \n 1. Risotto \n 2. Lasagna \n 3. Pasta");
            receta = receta.toLowerCase()
    
                if(receta == "risotto" || receta == "lasagna" || receta == "pasta"){
                    comensales = parseInt(prompt(`Para cuantas personas queres cocinar ${receta}`))
    
                        switch(receta) {
                            case "risotto":
                                alert(`Tengo la receta para cocinar ${receta}`)
                
                                ingrediente1 = "Arroz"
                                ingrediente2 = "Champignones"
                                ingrediente3 = "Cebolla"
                                cantidad1 = 75
                                cantidad2 = 40
                                cantidad3 = 12
                
                                calcular = confirm(`Queres que te calcule los ingredientes para ${comensales} personas?`)
                                if(calcular == true){
                                    cantidadTotal1 = cantidad1 * comensales
                                    cantidadTotal2 = cantidad2 * comensales
                                    cantidadTotal3 = cantidad3 * comensales
                                    alert(`Vas a necesitar:\n ${ingrediente1}: ${cantidadTotal1}gr\n ${ingrediente2}: ${cantidadTotal2}gr\n ${ingrediente3}: ${cantidadTotal3}gr\n`)
                                    alert("Que lo disfrutes!!")
                                }
                                break
                
                            case "lasagna":
                                alert(`Tengo la receta para cocinar ${receta}`)
                
                                ingrediente1 = "Pasta"
                                ingrediente2 = "Carne picada"
                                ingrediente3 = "Vegetales"
                                cantidad1 = 200
                                cantidad2 = 150
                                cantidad3 = 100
                
                                calcular = confirm(`Queres que te calcule los ingredientes para ${comensales} personas?`)
                                if(calcular == true){
                                    cantidadTotal1 = cantidad1 * comensales
                                    cantidadTotal2 = cantidad2 * comensales
                                    cantidadTotal3 = cantidad3 * comensales
                                    alert(`Vas a necesitar:\n ${ingrediente1}: ${cantidadTotal1}gr\n ${ingrediente2}: ${cantidadTotal2}gr\n ${ingrediente3}: ${cantidadTotal3}gr\n`)
                                    alert("Que lo disfrutes!!")
                                }
                                break
                
                            case "pasta":
                                alert(`Tengo la receta para cocinar ${receta}`)
                
                                ingrediente1 = "Espagueti"
                                ingrediente2 = "Salsa de tomate"
                                ingrediente3 = "Zucchini"
                                cantidad1 = 100
                                cantidad2 = 80
                                cantidad3 = 50
                
                                calcular = confirm(`Queres que te calcule los ingredientes para ${comensales} personas?`)
                                if(calcular == true){
                                    cantidadTotal1 = cantidad1 * comensales
                                    cantidadTotal2 = cantidad2 * comensales
                                    cantidadTotal3 = cantidad3 * comensales
                                    alert(`Vas a necesitar:\n ${ingrediente1}: ${cantidadTotal1}gr\n ${ingrediente2}: ${cantidadTotal2}gr\n ${ingrediente3}: ${cantidadTotal3}gr\n`)
                                    alert("Que lo disfrutes!!")
                                }
                                break
                
                            default:
                                alert("Lo siento, no tengo en mis registros la receta que estas buscando")
                                break
                        }
                           
                }
    
            }while(receta != "risotto" && receta != "lasagna" && receta != "pasta")
        }
    }
    
    recetario()
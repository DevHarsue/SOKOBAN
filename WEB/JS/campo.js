'use strict';

const loadLevel = async ()=>{
	// Buscamos el nivel que fue seleccionado 
	const valores = new URLSearchParams(window.location.search)
    let id = valores.get('id')
	await fetch(url+`levels/${id}`).then(response=>{
		if (response.ok){
			return response.json()
		}
		throw "xd"
	}).then(response=>{
		nivel = response
		
		// Guardamos el nombre del nivel
		nombreNivel = nivel.name
		// Recreamos el nivel
		nivel = recreador.recrear(nivel.structure,tipos)
		// y lo generamos
		generador.generar(nivel,campo)
	}).catch(reject=>{
		window.location.assign('niveles.html')

	})
}

// Funcion para generar los muros barreras, y los espacio
const generarPredeterminado = ()=>{
	let arr = []
	// Crear los muros
	arr.push(new Muro('1','1/11'))
	arr.push(new Muro('10','1/11'))
	arr.push(new Muro('2/10','1'))
	arr.push(new Muro('2/10','10'))

	// Crear los espacios
	for(let i = 2; i < 10; i++){
		for(let j = 2; j < 10;j++){
			let espacio = new Espacio(i,j)
			arr.push(espacio)
		}
	}
	return arr
}


// Seleccionamos el campo
const campo = document.querySelector('.contenedor');

// instaciamos los objetos necesarios para para recrear un nivel y generarlo
const recreador = new RecreadorObjetos()
const generador = new GeneradorNivel()

let nivelPredeterminado = generarPredeterminado()

// recreamos el nivel predeterminado
let nivel = recreador.recrear(nivelPredeterminado,tipos)

nivelPredeterminado = nivel
// Generamos los muros barrera
generador.generar(nivel,campo)

const url = "https://sokoban-1v5b.onrender.com/"

let nombreNivel = ""
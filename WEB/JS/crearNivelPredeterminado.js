'use strict'

// Instanciamos un generador y un recreador
const generador = new GeneradorNivel()
const recreador = new RecreadorObjetos()

// Seleccionamos el campo
const campo = document.querySelector('.contenedor')

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


let predeterminado = generarPredeterminado()


// Recreamos el nivel predeterminado
let nivelPredeterminado = recreador.recrear(predeterminado,tipos)
// Generar los bordes y los espacios
generador.generar(nivelPredeterminado,campo)


// Variable de nombre para saber si el nivel es nuevo o se esta editando
let nombreNivel = false
// Variable donde se guardara el nivel a ser editado
let nivelGuardado = false

// Si se esta editando el nivel lo detectamos con un key en el sessionStorage
if (sessionStorage.getItem('nivel')) {
	
	// Asignamos el nombre
	nombreNivel = sessionStorage.getItem('nivel')
	
	// Buscamos el nivel entre todos los niveles
	nivelGuardado = JSON.parse(localStorage.getItem('niveles')).find(nivel=>nivel.nombre==nombreNivel)	
	
	// Configuramos el input de nombre para que no sea editable y que lleve el nombre del nivel
	document.getElementById('nombre-nivel').value = nombreNivel
	document.getElementById('nombre-nivel').setAttribute('readonly',true)

	// Recreamos el nivel
	nivelGuardado = recreador.recrear(nivelGuardado.nivel,tipos)
	// Lo generamos
	generador.generar(nivelGuardado,campo)
	// Quitamos el nivel del sessionStorage para evitar errores
	sessionStorage.removeItem('nivel')
}
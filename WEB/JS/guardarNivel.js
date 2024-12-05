'use strict'

// Al clickar el boton guardar
const btnGuardar = document.getElementById('btn-guardar')
btnGuardar.addEventListener('click',()=>{
	// seleccionamos el input
	let input = document.getElementById('nombre-nivel')
	// Si ya existe un nombreNivel es porque estamos editando un nivel ya creado
	// asi que el nombre no va a cambiar
	let nombre = !nombreNivel ? input.value.toUpperCase() : nombreNivel

	// obtenemos todos los niveles guardados
	let niveles = JSON.parse(localStorage.getItem('niveles'))

	// cantidad de huecos y cajas
	let cHuecos = nivel.filter(obj => obj.type == 'Hueco').length
	let cCajas = nivel.filter(obj=>obj.type == 'Caja').length

	// Si existe un nivel con el mismo nombre(a menos que se este editando) o el nombre esta vacio
	if (niveles.find(nivel => nivel.nombre ==nombre && nivel.nombre !== nombreNivel) || nombre == '') {
		modal.abrir(contenedorModal,'El nombre no es valido o existe otro nivel con el mismo nombre.')
		return 0
	}
	// Si no hay un jugador o hay mas de uno
	else if(nivel.filter(obj => obj.type == 'Jugador').length != 1){
		modal.abrir(contenedorModal,'Debe haber un Jugador.')
		return 0
	}
	// si no hay cajas o no hay huecos
	else if (cHuecos <= 0 ||  cCajas<=0){
		modal.abrir(contenedorModal,'Debe haber por lo menos una caja y un hueco.')
		return 0
	}
	// Si el numero de cajas es diferente al numero de huecos
	else if(cCajas != cHuecos){
		modal.abrir(contenedorModal,'La cantidad de cajas debe ser igual a la cantidad de huecos.')
		return 0
	}

	// Eliminamos la propiedad div de cada obj del nivel
	nivel.forEach(obj=>obj.div ? delete obj.div : false)

	// Si se esta editando el nivel
	if (nombreNivel) {
		// Reemplazamos el nivel por el editado
		let indice = niveles.indexOf(niveles.find(nivel => nivel.nombre==nombreNivel))
		niveles.splice(indice,1,{nombre,nivel})		

	}
	// Si es un nivel nuevo se mete sin mas
	else niveles.push({nombre,nivel})

	// abrimos el modal diciendo que el nivel se guardo
	modal.abrir(contenedorModal,'Nivel Guardado')
	// Decimos que ya se guardo el nivel
	guardado = true
	// Guardamos los niveles en el almacenamiento local
	localStorage.setItem('niveles',JSON.stringify(niveles))

})

// creeamos un objeto modal
let modal = new Modal()
// seleccionamos el modal
let contenedorModal = document.querySelector('.modal')
// para saber si ya se guardo el nivel
let guardado = false

// Al preseionar boton del modal
const btnOK = document.querySelector('.modal-caja button')
btnOK.addEventListener('click',()=>{
	// Cerramos el modal
	modal.cerrar(contenedorModal)
	// Si ya se guardo el nivel redirecciona
	if (guardado) modal.cerrar(contenedorModal,'editar_niveles.html') 
})
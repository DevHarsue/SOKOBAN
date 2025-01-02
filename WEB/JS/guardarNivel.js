'use strict'

// Al clickar el boton guardar
const btnGuardar = document.getElementById('btn-guardar')
btnGuardar.addEventListener('click',()=>{
	if (guardando){
		return 0
	}
	guardando = true
	// seleccionamos el input
	let input = document.getElementById('nombre-nivel')
	// Si ya existe un nombreNivel es porque estamos editando un nivel ya creado
	// asi que el nombre no va a cambiar
	let nombre = !nombreNivel ? input.value.toUpperCase() : nombreNivel

	// obtenemos todos los niveles guardados
	let niveles = JSON.parse(localStorage.getItem('niveles'))

	// cantidad de huecos y cajas
	let cHuecos = structure.filter(obj => obj.type == 'Hueco').length
	let cCajas = structure.filter(obj=>obj.type == 'Caja').length

	// Si el nombre es menor 
	if (nombre.length < 3) {
		modal.abrir(contenedorModal,'El nombre no es valido, debe tener minimo 3 caracteres')
		guardando = false
		return 0
	}
	// Si no hay un jugador o hay mas de uno
	else if(structure.filter(obj => obj.type == 'Jugador').length != 1){
		modal.abrir(contenedorModal,'Debe haber un Jugador.')
		guardando = false
		return 0
	}
	// si no hay cajas o no hay huecos
	else if (cHuecos <= 0 ||  cCajas<=0){
		modal.abrir(contenedorModal,'Debe haber por lo menos una caja y un hueco.')
		guardando = false
		return 0
	}
	// Si el numero de cajas es diferente al numero de huecos
	else if(cCajas != cHuecos){
		modal.abrir(contenedorModal,'La cantidad de cajas debe ser igual a la cantidad de huecos.')
		guardando = false
		return 0
	}

	// Eliminamos la propiedad div de cada obj del nivel
	structure.forEach(obj=>obj.div ? delete obj.div : false)

	// Si se esta editando el nivel
	if (nombreNivel) {
		// Reemplazamos el nivel por el editado
		let indice = niveles.indexOf(niveles.find(nivel => nivel.nombre==nombreNivel))
		niveles.splice(indice,1,{nombre,nivel})		

	}
	
	let actualizar = nombreNivel!="" ? true : false 

	modal.abrir(contenedorModal,actualizar ? "ACTUALIZANDO"  : 'GUARDANDO')
	modal.quitarBoton(contenedorModal)
	mostrarBarra(contenedorModal.querySelector(".modal-caja"))
	fetch(url+"levels"+(actualizar ? `/?id=${id}`: ""),{
			method: !actualizar ? 'POST' : 'PUT',
			body: JSON.stringify({
				name: input.value.toUpperCase(),
				user_id: 1,
				message: "Mensaje Predeterminado",
				structure: structure
			}),
			headers: {
				'Content-Type': 'application/json'
				}
		}).then(response=>{
			if (response.status==201 || response.status==200){
				return response.json()
			}else{
				throw response
			}
		}).then(r=>{
			modal.agregarBoton(contenedorModal)
			quitarBarra(contenedorModal.querySelector(".modal-caja"))
			modal.cerrar(contenedorModal)
			// abrimos el modal diciendo que el nivel se guardo
			modal.abrir(contenedorModal,'Nivel ' + (actualizar? 'Actualizado' : 'Guardado'))
			// Decimos que ya se guardo el nivel
			guardando = false
			guardado = true
		}).catch(reject=>{
			modal.agregarBoton(contenedorModal)
			quitarBarra(contenedorModal.querySelector(".modal-caja"))
			modal.cerrar(contenedorModal)
			modal.abrir(contenedorModal,'Error al guardar/actualizar el nivel, ¿Porque?, No se')
			return reject.json()

		}).then(r=>console.log(r))
	

})

// creeamos un objeto modal
let modal = new Modal()
// seleccionamos el modal
let contenedorModal = document.querySelector('.modal')
// para saber si ya se guardo el nivel
let guardado = false
// para saber si se esta guardando
let guardando = false

// Al preseionar boton del modal
const btnOK = document.querySelector('.modal-caja button')
btnOK.addEventListener('click',()=>{
	// Cerramos el modal
	modal.cerrar(contenedorModal)
	// Si ya se guardo el nivel redirecciona
	if (guardado) modal.cerrar(contenedorModal,'editar_niveles.html') 
})



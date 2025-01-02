'use strict'

let id = 0
const comprobarEdicion = async ()=>{
	// Buscamos el nivel que fue seleccionado 
	const valores = new URLSearchParams(window.location.search)
    id = valores.get('id')
	if (!id){
		return 0
	}
	let nivelTemp = nivel
	modal.abrir(contenedorModal,'CARGANDO')
	modal.quitarBoton(contenedorModal)
	mostrarBarra(contenedorModal.querySelector(".modal-caja"))
	await loadLevel()
	structure = nivel
	nivel = nivelTemp
	modal.agregarBoton(contenedorModal)
	quitarBarra(contenedorModal.querySelector(".modal-caja"))
	modal.cerrar(contenedorModal)
	document.getElementById('nombre-nivel').setAttribute("disabled","")
	document.getElementById('nombre-nivel').value = nombreNivel
}
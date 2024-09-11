'use strict'

// al clickar
addEventListener('click',e=>{
	// Si es el boton para jugar
	if (e.target.id == 'btn1') {
		sessionStorage.setItem('jugar',true)
		window.location.assign('niveles.html')
	}
	// Si es el del Editor
	else if (e.target.id == 'btn2') window.location.assign('niveles.html')
})
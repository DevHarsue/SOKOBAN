'use strict'

// Si se clickea en cualquier parte de la pantalla
addEventListener('click',e=>{
	let clickeado = e.target

	// Si no se esta clickando un muro barrera y se esta tocando algo dentro de campo 
	// y no es el campo y ya se presiono algun boton de objeto que no sea el de borrar 
	if (!nivelPredeterminado.find(obj => obj.div == clickeado && obj.type == 'Muro') 
		&& e.composedPath().find(obj=>obj==campo) && clickeado!=campo && clase){ 
		
		// Buscar el objeto(ya sea espacio o no) que se esta tocando
		let objetoClickeado = nivelPredeterminado.find(obj => obj.div == clickeado)
		objetoClickeado = !objetoClickeado ? structure.find(obj=>obj.div==clickeado) : objetoClickeado
		// Crear objeto para ser agregado al nivel		
		let	objeto = new clase(objetoClickeado.x,objetoClickeado.y)
		
		// Si no es un espacio el que se clickeo
		if (objetoClickeado.type!='Espacio'){
			// Reemplazamos en el nivel el nuevo objeto
			structure.splice(structure.indexOf(objetoClickeado),1,objeto)

		}else{ // Si se esta clickando un espacio
			// Agregamos al nivel el objeto
			structure.push(objeto)			
		}
		// Reemplazamos en el nivel lo clickeeado por lo nuevo
		campo.replaceChild(objeto.div,clickeado)

	}else if(!clase){ // Si no esta seleccionado ningun boton o el boton de borrar se clickeo
		// buscamos el objeto que se clickeo (solo objeto no espacio)
		let objeto = structure.find(obj=>obj.div==clickeado)
		if (objeto) {
			// lo borramos del nivel
			structure.splice(structure.indexOf(objeto),1)
			// buscamos el espacio que estaba por defecto
			let espacio = nivelPredeterminado.find(esp => esp.x == objeto.x && esp.y == objeto.y)
			// Y lo reemplazamos por el objeto
			campo.replaceChild(espacio.div,clickeado)
		}
	}

	// Si clickeamos un objeto boton
	if (clickeado.classList.contains('objeto')) {
		// Seleccionamos el boton para quitar objetos
		let quitar = document.getElementById('quitar')
		
		// Si no se esta presionando el boton para borrar
		// Buscamos la clase a la que hace referencia ese boton  tipos = [['c1',c1],['c2',c2]]
		if(clickeado!=quitar) clase = tipos.find(tipo => tipo[0].toUpperCase()==clickeado.classList[0].toUpperCase())[1]
		// Si se clickeo el boton para borrar
		else clase = false

		// Esto de aqui da la animacio de seleccionado y la quita dependiendo del boton
		// Leer detenidamente para entender
		btnSeleccionado = !btnSeleccionado ? clickeado : btnSeleccionado
		if (btnSeleccionado==clickeado) btnSeleccionado.classList.add('seleccionado')
		else{
			btnSeleccionado.classList.remove('seleccionado')
			clickeado.classList.add('seleccionado')
			btnSeleccionado = clickeado
		}
	}


})

// Variable que utilizaremos saber que clase instanciar
let clase = false
// Variable para saber que boton de objeto se ha seleccionado
let btnSeleccionado = null

let structure = []
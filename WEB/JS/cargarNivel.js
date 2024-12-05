'use strict'

// Detectamos el click cuando se va a cargar
document.getElementById('btn-cargar').addEventListener('click',e=>{
	// Obtenemos los niveles
	let niveles = JSON.parse(localStorage.getItem('niveles'))
	// Bloque try por si el usuario mete algo que no sea un JSON no se trabe
	try{
		// Pedimos que inserte el nivel
		let nivelCargado = JSON.parse(prompt('Inserte el nivel a cargar: '))

		// Corroboramos la sintaxis
		for (let obj of nivelCargado.nivel){
			parseInt(obj.x)
			parseInt(obj.y)
			let lx = obj.x > 9 || obj.x < 2 ? true : false
			let ly = obj.y > 9 || obj.y < 2 ? true : false
			if(!tipos.find(tipo=>obj.type == tipo[0]) || lx || ly) throw 0
		}  
	
		// creamos el nombre con la nomenclatura de cargado
		let nombre = nivelCargado.nombre ? 'C-'+nivelCargado.nombre + '-C' : undefined
		// si no tiene nombre el nivel
		if (!nombre) throw 'El nivel no posee nombre'

		// Cantidad de jugadores,cajas,huecos
		let cJugadores = nivelCargado.nivel.filter(obj=>obj.type=='Jugador').length
		let cHuecos = nivelCargado.nivel.filter(obj=>obj.type=='Hueco').length
		let cCajas = nivelCargado.nivel.filter(obj=>obj.type=='Caja').length

		// Comprobamos que los parametros de un nivel valido se cumplan, sino lanzamos una exepcion
		if (niveles.find(nivel=>nivel.nombre==nombre)) throw 'Nombre invalido (duplicado)'
		else if (cJugadores!=1) throw 'No hay jugador o hay mas de uno.'
		else if(cHuecos!=cCajas) throw 'El numero de cajas y huecos no son iguales'
		else if (cHuecos<=0 || cCajas<=0) throw 'Hay cero cajas y/o cero huecos'
		
		// Recreamos y generamos el nivel para corroborar que si esta bien escrito
		// De lo contratio tiraria una exepcion
		let nivelRecreado = recreador.recrear(nivelCargado.nivel,tipos)
		generador.generar(nivelRecreado,campo)
		
		// damos el nuevo nombre (nomenclatura de cargado)
		nivelCargado.nombre = nombre
		// Lo metemos en el arreglo de niveles
		niveles.push(nivelCargado)
		// Lo cargamos
		localStorage.setItem('niveles',JSON.stringify(niveles))
		window.location.assign('niveles.html')

	}catch(e){
		// Si es un string es porque es un error detectado por mi
		if (typeof e == 'string') alert(e)
		// Sino es de sintaxis (lo que el usuario introdujo)
		else alert('Error de sintaxis.')
		window.location.assign('niveles.html')
	}
})
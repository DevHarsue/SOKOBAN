'use strict'

// Cuando se clickea
addEventListener('click',e=>{

	// Esto devuelve una clase de ruta de las cosas que se clickearon 
	// Exculimos a window y a document para evitar errores
	let path = e.composedPath().filter(x=>x!=window && x!=document)
	
	// Buscamos en el path el objeto que tenga la clase btn-nivel (es el div principal)
	let clickeado =	path.find(obj=>obj.classList.contains('btn-nivel'))
	
	// Ahora buscamos el div en el arreglo(para encontrar el objeto como tal)
	clickeado = clickeado ? nivelesDiv.find(nivel => nivel.div == clickeado) : false

	// Si se encontro un objeto nivel como clickeado
	if (clickeado) {
		let jugar = !window.location.href.includes("editar_niveles")

		// Si clickeamos el boton de borrar 
		if (e.target.classList.contains('borrar') && !jugar) {
			alert("MARICO ESTO ESTA SIENDO ACTUALIZADO")

			// Preguntamos si quiere borrar el nivel
			// if (confirm(`Seguro quieres borrar el nivel ${clickeado.nombre}`)) {
			// 	// Buscamos el nivel (que indice tiene)
			// 	let indice = niveles.indexOf(niveles.find(nivel=>nivel.nombre==clickeado.nombre))
			// 	// lo borramos
			// 	niveles.splice(indice,1)
			// 	// Y sobreescribimos los nuevos niveles (sin el borrado)
			// 	localStorage.setItem('niveles',JSON.stringify(niveles))
			// 	// Recargamos la pagina
			// 	window.location.assign('editar_niveles.html')	
			// }						
			return 0
		}else if(e.target.classList.contains('compartir') && !jugar){
			alert("MARICO ESTO ESTA SIENDO ACTUALIZADO")
			// alert(`Copia el siguiente codigo y carga en la opcion de crear nivel:${JSON.stringify(niveles.find(nivel=>nivel.nombre==clickeado.nombre))}`)
			return 0
		}
		// si estamos jugando lo enviamos a que juegue
		if (jugar) window.location.assign(`jugar.html?id=${clickeado.id}`)
		// // Si no a editar
		else window.location.assign(`crearNivel.html?id=${clickeado.id}`)
	}
})

const url = "https://sokoban-1v5b.onrender.com/"
const niveles = []
const nivelesDiv = []

const loadLevels = async ()=>{
	mostrarBarra(document.getElementById('contenedor-niveles'))
	// Obtenemos los niveles de la API
	await fetch(url+"levels/").then(response=>{
		// Si la respuesta fue exitosa
		if (response.ok) {
			// Lo convertimos a JSON
			return response.json()
		}
	}).then(response =>{
		// Lo guardamos en el arreglo
		niveles.push(...response)
	})

	let show_i = window.location.href.includes("editar_niveles")
	// Si existen los niveles, creamos los Niveles(div) y los guardamos en el arreglo nivelesDiv
	if (niveles && niveles.length>0) niveles.forEach(nivel => nivelesDiv.push(new Nivel(nivel.name,nivel.id,show_i)))
	else if(jugar){
		alert('No hay niveles creados.')
		window.location.assign('index.html')
	}

	quitarBarra(document.getElementById('contenedor-niveles'))
	// Declaramos un generado de niveles (mete divs en un contenedor)
	const generador = new GeneradorNivel()
	// Generamos los botones de cada nivel
	generador.generar(nivelesDiv,document.getElementById('contenedor-niveles'))

}

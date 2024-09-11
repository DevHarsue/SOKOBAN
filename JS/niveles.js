'use strict'

// Cuando se clickea
addEventListener('click',e=>{

	// Esto devuelve una clase de ruta de las cosas que se clickearon 
	// Exculimos a window y a document para evitar errores
	let path = e.composedPath().filter(x=>x!=window && x!=document)
	
	// Buscamos el en path el objeto qeu tenga la clase btn-nivel (es el div principal)
	let clickeado =	path.find(obj=>obj.classList.contains('btn-nivel'))
	
	// Ahora buscamos el div en el arreglo(para encontrar el objeto como tal)
	clickeado = clickeado ? nivelesDiv.find(nivel => nivel.div == clickeado) : false

	// Si se encontro un objeto nivel como clickeado
	if (clickeado) {

		// Si clickeamos el boton de borrar 
		if (e.target.classList.contains('borrar')) {
			// Preguntamos si quiere borrar el nivel
			if (confirm(`Seguro quieres borrar el nivel ${clickeado.nombre}`)) {
				// Buscamos el nivel (que indice tiene)
				let indice = niveles.indexOf(niveles.find(nivel=>nivel.nombre==clickeado.nombre))
				// lo borramos
				niveles.splice(indice,1)
				// Y sobreescribimos los nuevos niveles (sin el borrado)
				localStorage.setItem('niveles',JSON.stringify(niveles))
				// Recargamos la pagina
				window.location.assign('niveles.html')	
			}						
			return 0
		}else if(e.target.classList.contains('compartir')){
			alert(`Copia el siguiente codigo y carga en la opcion de crear nivel:${JSON.stringify(niveles.find(nivel=>nivel.nombre==clickeado.nombre))}`)
			return 0
		}
		// Guardamos el nombre del nivel que se selecciono
		sessionStorage.setItem('nivel',clickeado.nombre)
		// si estamos jugando lo enviamos a que juegue
		if (jugar) window.location.assign('jugar.html')
		// Si no a editar
		else window.location.assign('crearNivel.html')
	}
})

// Si se esta seleccionando los niveles para jugar y no para editar
const jugar = sessionStorage.getItem('jugar')

// Obtenemos los niveles
const niveles = JSON.parse(localStorage.getItem('niveles'))
// Constante donde se almacenaran los objetos Niveles
const nivelesDiv = []

// Si existen los niveles, creamos los Niveles(div) y los guardamos en el arregklos nivelesDiv
if (niveles && niveles.length>1) niveles.forEach(nivel => nivel.nombre != 'PREDETERMINADO' ? nivelesDiv.push(new Nivel(nivel.nombre)) : false)
else if(jugar){
	alert('No hay niveles creados.')
	window.location.assign('index.html')
}

// Declaramos un generado de niveles (mete divs en un contenedor)
const generador = new GeneradorNivel()
// Generamos los botones de cada nivel
generador.generar(nivelesDiv,document.getElementById('contenedor-niveles'))

if (jugar) {
	// Quitamos el boton de crear niveles
	document.getElementById('btn-crear').remove()
	// Ocultamos el boton de borrar de los botones
	document.querySelectorAll('.botones-nivel').forEach(x=>x.style.visibility='hidden')
	// Elimnamos para evitar errores
	sessionStorage.removeItem('jugar')
}

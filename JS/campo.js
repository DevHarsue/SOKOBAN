'use strict';

document.querySelector('.niveles').addEventListener('click',sessionStorage.setItem('jugar',true))

// Seleccionamos el campo
const campo = document.querySelector('.contenedor');

// Seleccionamos el nivel predeterminado (barreras y espacios)
let nivel = JSON.parse(localStorage.getItem('niveles')).find(n=>n.nombre=='PREDETERMINADO')

// instaciamos los objetos necesarios para para recrear un nivel y generarlo
const recreador = new RecreadorObjetos()
const generador = new GeneradorNivel()

// recreamos el nivel predeterminado
nivel = recreador.recrear(nivel.nivel,tipos)
// ahora quitamos los espacios para solo generar los muros
nivel = nivel.filter(obj=>obj.type!='Espacio')
// Generamos los muros barrera
generador.generar(nivel,campo)

// Buscamos el nivel que fue seleccionado 
nivel = JSON.parse(localStorage.getItem('niveles')).find(n=>n.nombre==sessionStorage.getItem('nivel'))
// Si no se ha seleccionado ningun nivel (se recargo la pagina)
if(!nivel){
	sessionStorage.setItem('jugar',true)
	window.location.assign('niveles.html')
} 
// Guardamos el nombre del nivel
let nombreNivel = nivel.nombre
// Recreamos el nivel
nivel = recreador.recrear(nivel.nivel,tipos)
// y lo generamos
generador.generar(nivel,campo)
// Removemos la seleccion del nivel
sessionStorage.removeItem('nivel')
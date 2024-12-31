'use strict';

addEventListener('keydown',e=>{
	const jugador = nivel.find(obj=>obj.type=='Jugador')

	let x,y;

	if(e.key == 'R' || e.key == 'r') {
		const valores = new URLSearchParams(window.location.search)
    	let id = valores.get('id')
		window.location.assign('jugar.html?id='+id)
	}

	x = (e.key == keyIzquierda) ? parseInt(jugador.x)-1 : (e.key == keyDerecha) ? parseInt(jugador.x)+1 : jugador.x;
	y = (e.key == keyArriba) ? parseInt(jugador.y)-1 : (e.key == keyAbajo) ? parseInt(jugador.y)+1 : jugador.y;

	x = (x <= 1) ? 2 : (x >= 10) ? 9 : x;
	y = (y <= 1) ? 2 : (y >= 10) ? 9 : y;

	let caja = colisionCaja(x,y);
	if( caja!==undefined){
		let xCaja = parseInt(caja.x)+parseInt(caja.x-jugador.x);
		let yCaja = parseInt(caja.y)+parseInt(caja.y-jugador.y);
		xCaja = (xCaja <= 1) ? 2 : (xCaja >= 10) ? 9 : xCaja;
		yCaja = (yCaja <= 1) ? 2 : (yCaja >= 10) ? 9 : yCaja;
		if(colisionCajaConCaja(xCaja,yCaja,caja)===undefined && colisionMuro(xCaja,yCaja)===undefined) mover(xCaja,yCaja,caja);
	}	

	if(colisionCaja(x,y)===undefined && colisionMuro(x,y)===undefined) mover(x,y,jugador);

	if(comprobarVictoria()) {
		setTimeout(() => {
			alert('Has ganado');
			sessionStorage.setItem('jugar',true)
			window.location.assign('niveles.html')
		}, 100);
	}
});


const keyArriba = 'ArrowUp';
const keyAbajo = 'ArrowDown';
const keyIzquierda = 'ArrowLeft';
const keyDerecha = 'ArrowRight';

const colisionCaja = (x,y) => nivel.find(caja=> caja.type=='Caja' && caja.x == x && caja.y==y);
const colisionMuro = (x,y) => nivel.find(muro=> muro.type=='Muro' && muro.x == x && muro.y==y);
const colisionCajaConCaja = (x,y,item) => nivel.find(caja=> caja.type=='Caja' && caja.x == x && caja.y==y && caja!=item);

const comprobarVictoria = ()=>{
	let huecoCaja=0;
	const cajas = nivel.filter(obj=>obj.type=='Caja')
	const huecos = nivel.filter(obj=>obj.type=='Hueco')
	for(let caja of cajas){
		for(let hueco of huecos){
			if(hueco.x == caja.x && hueco.y == caja.y) huecoCaja++;
		}
	}

	return (huecoCaja==cajas.length && huecoCaja==huecos.length) ? true : false;
}

const mover = (x,y,item)=>{
	item.x=x.toString();
	item.y=y.toString();
	item.mover();
}

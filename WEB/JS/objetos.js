'use strict';

// Este archivo deberia llamarse clases.js pero que paja cambiarle el nombre

class Modal{
	abrir(modal,texto){
		modal.children[0].children[0].textContent = texto		
		modal.classList.remove('desaparecer')
		modal.classList.add('aparecer')
	}
	cerrar(modal,direccion=null){
		modal.classList.remove('aparecer')
		modal.classList.add('desaparecer')
		if (direccion) window.location.assign(direccion)
	}
}

class GeneradorNivel{
	generar(objetos,contenedor){
		let fragmento = document.createDocumentFragment()
		objetos.forEach(obj => fragmento.appendChild(obj.div))
		contenedor.appendChild(fragmento)
	}
}

class RecreadorObjetos{
	recrear(objetos,tipos){
		let objetosRecreados=[]
		for (let obj of objetos){
			if (!obj.x || !obj.y || !obj.type) return false
			tipos.forEach(tipo=> tipo[0]==obj.type ? objetosRecreados.push(new tipo[1](obj.x,obj.y)) : false)
		}
		return objetosRecreados
	}
}

class Cubo{
	constructor(x,y){
		this.x=x
		this.y=y
		this.div = document.createElement('DIV')
		this.div.style.gridColumn = x
		this.div.style.gridRow = y
	}
}

class CuboMov extends Cubo{
	constructor(x,y){
		super(x,y)
	}
	mover(){
		this.div.style.gridColumn=this.x;
		this.div.style.gridRow=this.y;
	}
}

class Espacio extends Cubo{
	constructor(x,y){
		super(x,y)
		this.div.classList.add('espacio')
		this.type = 'Espacio'
	}
}

class Muro extends Cubo{
	constructor(x,y){
		super(x,y)
		this.div.classList.add('muro')
		this.type = 'Muro'
	}
} 

class Caja extends CuboMov{
	constructor(x,y){
		super(x,y);
		this.div.classList.add('caja');
		this.type = 'Caja'	
	}	
} 

class Hueco extends Cubo{
	constructor(x,y){
		super(x,y);
		this.div.classList.add('hueco');
		this.type = 'Hueco'
	}
} 

class Jugador extends CuboMov{
	constructor(x,y){
		super(x,y)
		this.div.id = 'jugador'
		this.type = 'Jugador'
	}
}


class Nivel{
	constructor(nombre){
		this.div = document.createElement('DIV')
		this.div.classList.add('boton','btn-nivel')
		let p = document.createElement('P')
		p.textContent = nombre
		this.div.appendChild(p)
		let opciones = document.createElement('DIV')
		opciones.classList.add('botones-nivel')
		let i = document.createElement('I')
		i.classList.add("fa-solid")
		i.classList.add("fa-share-nodes")
		i.classList.add('compartir')
		opciones.appendChild(i)
		i = document.createElement('I')
		i.classList.add("fa-solid")
		i.classList.add("fa-trash")
		i.classList.add('borrar')
		opciones.appendChild(i)
		this.div.appendChild(opciones)
		this.nombre = nombre
	}
}

// Esta constante se utiliza para recrear objetos
const tipos = [['Muro',Muro],['Caja',Caja],['Hueco',Hueco],['Jugador',Jugador],['Espacio',Espacio]]

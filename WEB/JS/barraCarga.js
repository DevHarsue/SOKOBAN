
const mostrarBarra = contenedor=>{
    let barra = document.createElement('div');
    barra.classList.add('loader');
    contenedor.appendChild(barra);
}

const quitarBarra = contenedor=>{
    let barra = contenedor.querySelector('.loader');
    contenedor.removeChild(barra);
}
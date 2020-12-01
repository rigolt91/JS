//Variables globales
const formularioUI = document.querySelector("#formulario")
const listaActividadesUI = document.getElementById("listaActividades")
let arrayActividades = []

//Funciones
const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item)

    return item
}

const GuardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades))
    PintarDB()
}

const PintarDB = () => {
    listaActividadesUI.innerHTML = ''

    arrayActividades = JSON.parse(localStorage.getItem('rutina'))

    if(arrayActividades === null) {
        arrayActividades = []
    }else{
        arrayActividades.forEach(element => {
            listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><span class="material-icons float-left mr-2">accessibility_new</span><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><span class="material-icons">done</span><span class="material-icons">delete</span></span></div>`
        });
    }
}

//EventListener
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault()

    let actividadUI = document.querySelector("#actividad").value
    CrearItem(actividadUI)
    GuardarDB()

    formularioUI.reset()
})

document.addEventListener('DOMContentLoaded', PintarDB)

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault()

    if(e.target.innerHTML === "done" || e.target.innerHTML === "delete"){
        console.log(e.target.offsetParent.childNodes[1].innerHTML)
    }
})
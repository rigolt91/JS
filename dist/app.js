//Variables globales
const formularioUI = document.querySelector("#formulario")
const listaActividadesUI = document.getElementById("listaActividades")
let errorUI = document.getElementById('error')
let arrayActividades = []

//Funciones
const CrearItem = (actividad) => {
    errorUI.innerHTML = ''

    if(actividad == ""){
        console.log('Campos vacios')
        errorUI.innerHTML = "El campo actividad esta vacio."
    }else{
        let item = {
            actividad: actividad,
            estado: false
        }

        arrayActividades.push(item)
        return item
    }
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
            listaActividadesUI.innerHTML += `<div class="alert ${element.estado===true ? 'alert-success' : 'alert-danger'}" role="alert"><span class="material-icons float-left mr-2">accessibility_new</span><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><span class="material-icons">done</span><span class="material-icons">delete</span></span></div>`
        });
    }
}

const EliminarDB = (actividad) => {
    let indexArray
    arrayActividades.forEach((elemento, index) => {
        if(elemento.actividad === actividad){
            indexArray = index
        }
    })
    arrayActividades.splice(indexArray, 1)
    GuardarDB()
}

const EditarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex( (elemento) => elemento.actividad===actividad )
    arrayActividades[indexArray].estado = true
    GuardarDB()
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
        let texto = e.target.offsetParent.childNodes[1].innerHTML
        if(e.target.innerHTML === "done"){
            EditarDB(texto)
        }

        if(e.target.innerHTML === "delete"){
            EliminarDB(texto)
        }
    }
})
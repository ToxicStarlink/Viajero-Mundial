const asientos = document.querySelectorAll(".asiento")
const contador = document.getElementById("contador")
const botonComprar = document.getElementById("comprar")

const PRECIO = 100

asientos.forEach(asiento => {

asiento.addEventListener("click", () => {

if(asiento.classList.contains("ocupado")) return

asiento.classList.toggle("seleccionado")

actualizar()

})

})

function actualizar(){

const seleccion = document.querySelectorAll(".asiento.seleccionado")

contador.textContent = seleccion.length

}

/* BOTON COMPRAR */

botonComprar.addEventListener("click", () => {

const seleccion = document.querySelectorAll(".asiento.seleccionado")

if(seleccion.length === 0){

alert("Debes seleccionar al menos un asiento para continuar.")

return

}

let asientosSeleccionados = []
let total = seleccion.length * PRECIO

seleccion.forEach(a => {

asientosSeleccionados.push(a.dataset.asiento)

})

/* ENVIAR A COMPRA */

window.location.href = "compra.php?asientos=" + asientosSeleccionados.join(",") + "&total=" + total

})
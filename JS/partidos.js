function verBoletos(partido){
console.log("Partido seleccionado:", partido)
/* ID DEL PARTIDO */
window.location.href = "boletos.php?partido=" + partido
}

const buscar = document.getElementById("buscarEquipo")
const filtroEquipo = document.getElementById("filtroEquipo")
const filtroPais = document.getElementById("filtroPais")
const ordenarFecha = document.getElementById("ordenarFecha")
const contenedor = document.querySelector(".contenedor-partidos-lista")
let partidos = Array.from(document.querySelectorAll(".partido"))

/* FILTROS */
function aplicarFiltros(){
let texto = buscar.value.toLowerCase()
let equipo = filtroEquipo.value
let pais = filtroPais.value
partidos.forEach(partido =>{
let equipos = partido.dataset.team
let paisPartido = partido.dataset.pais
let nombre = partido.innerText.toLowerCase()
let mostrar = true

if(equipo !== "todos" && !equipos.includes(equipo)){
mostrar = false
}
if(pais !== "todos" && paisPartido !== pais){
mostrar = false
}
if(texto !== "" && !nombre.includes(texto)){
mostrar = false
}
partido.style.display = mostrar ? "flex" : "none"
})
}

/* ORDENAR FECHAS */

function ordenarPartidos(){
let valor = ordenarFecha.value
if(valor === "normal"){
contenedor.innerHTML = ""
partidos.forEach(partido=>{
contenedor.appendChild(partido)
})
return

}
let partidosOrdenados = [...partidos]
partidosOrdenados.sort((a,b)=>{
let fechaA = new Date(a.dataset.fecha)
let fechaB = new Date(b.dataset.fecha)
if(valor === "asc"){
return fechaA - fechaB
}

if(valor === "desc"){
return fechaB - fechaA
}

})
contenedor.innerHTML = ""
partidosOrdenados.forEach(partido=>{
contenedor.appendChild(partido)
})
}

/* EVENTOS */

buscar.addEventListener("keyup", aplicarFiltros)
filtroEquipo.addEventListener("change", aplicarFiltros)
filtroPais.addEventListener("change", aplicarFiltros)
ordenarFecha.addEventListener("change", ordenarPartidos)
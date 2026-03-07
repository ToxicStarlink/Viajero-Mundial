function comprarZona(zona){

const params = new URLSearchParams(window.location.search)

const partido = params.get("partido")

console.log("Partido:", partido)
console.log("Zona:", zona)

/* REDIRIGE A LOS ASIENTOS */

window.location.href = "asientos.php?partido=" + partido + "&zona=" + zona

}
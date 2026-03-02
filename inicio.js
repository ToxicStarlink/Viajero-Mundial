let cards = document.querySelectorAll(".card")

cards.forEach(card => {

card.addEventListener("click", function(){

let partido = card.getAttribute("data-partido")

window.location.href = "partido.php?game=" + partido

})

})



/* SLIDER HERO */

const hero = document.getElementById("hero")

const imagenes = [

"IMG/Estadio1.jpg",
"IMG/Estadio2.jpg",
"IMG/Estadio3.jpg",
"IMG/Estadio4.jpg"

]

let index = 0

function cambiarImagen(){

hero.style.opacity = 0

setTimeout(() => {

hero.style.backgroundImage = "url('" + imagenes[index] + "')"

hero.style.opacity = 1

index++

if(index >= imagenes.length){
index = 0
}

},500)

}

cambiarImagen()

setInterval(cambiarImagen,4000)
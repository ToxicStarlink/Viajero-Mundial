let mapa = document.getElementById("mapa-estadio")

for(let i=1;i<=50;i++){

let asiento = document.createElement("div")

asiento.classList.add("asiento")

asiento.innerText=i

asiento.addEventListener("click",function(){

asiento.classList.toggle("seleccionado")

})

mapa.appendChild(asiento)

}
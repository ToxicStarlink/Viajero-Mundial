let seleccionados=[]

document.addEventListener("click",function(e){

if(e.target.classList.contains("asiento")){

let asiento=e.target.innerText

if(seleccionados.includes(asiento)){

seleccionados=seleccionados.filter(a=>a!=asiento)

}else{

seleccionados.push(asiento)

}

console.log("Asientos seleccionados:",seleccionados)

}

})
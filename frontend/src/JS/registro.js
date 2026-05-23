let form = document.querySelector("form")

form.addEventListener("submit", function(e){

let pass = document.getElementById("password").value
let confirmar = document.getElementById("confirmar").value

if(pass !== confirmar){

alert("Las contraseñas no coinciden")

e.preventDefault()

}

})
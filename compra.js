document.getElementById("irPaypal").addEventListener("click", () => {

const params = new URLSearchParams(window.location.search)

window.location.href = "paypal.php?" + params.toString()

})
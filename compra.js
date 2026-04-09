const paypalSection = document.getElementById("paypal-section");
const paypalMessage = document.getElementById("paypal-message");

const total = Number(paypalSection?.dataset.total || 0);
const asientos = paypalSection?.dataset.asientos || "";

if (total <= 0) {
  paypalMessage.textContent = "El total no es válido para procesar el pago.";
  paypalMessage.style.display = "block";
} else if (!window.paypal) {
  paypalMessage.textContent = "No se pudo cargar PayPal. Intenta actualizar la página.";
  paypalMessage.style.display = "block";
} else {
  paypal.Buttons({
    style: {
      layout: "vertical",
      color: "gold",
      shape: "rect",
      label: "paypal"
    },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: "MXN",
            value: total.toFixed(2)
          },
          description: `Boletos: ${asientos}`
        }]
      });
    },
    onApprove(data, actions) {
      return actions.order.capture().then(details => {
        alert(`Pago completado con éxito. Gracias, ${details.payer.name.given_name}!`);
        window.location.href = "inicio.php";
      });
    },
    onError(err) {
      console.error(err);
      paypalMessage.textContent = "Ocurrió un error con PayPal. Revisa la consola para más detalles.";
      paypalMessage.style.display = "block";
    }
  }).render("#paypal-button-container");
}
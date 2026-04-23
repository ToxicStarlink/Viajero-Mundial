import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../CSS/inicio.css";

const Asientos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Recibimos los datos enviados desde la página de boletos
  const { asientosSeleccionados, total, partido } = location.state || {};
  
  const paypalRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Si alguien entra a esta página sin haber seleccionado asientos, lo regresamos a partidos
    if (!asientosSeleccionados || asientosSeleccionados.length === 0) {
      navigate("/partidos");
      return;
    }

    // Integración de tu código compra.js a React
    if (window.paypal && paypalRef.current && paypalRef.current.children.length === 0) {
      window.paypal.Buttons({
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
                currency_code: "USD", // Ajustado a USD (o MXN si prefieres)
                value: total.toFixed(2)
              },
              description: `Boletos: ${asientosSeleccionados.join(", ")}`
            }]
          });
        },
        onApprove(data, actions) {
          return actions.order.capture().then(details => {
            alert(`Pago completado con éxito. Gracias, ${details.payer.name.given_name}!`);
            navigate("/"); // Redirige al inicio tras pago exitoso
          });
        },
        onError(err) {
          console.error(err);
          setError("Ocurrió un error con PayPal. Revisa la consola para más detalles.");
        }
      }).render(paypalRef.current);
    } else if (!window.paypal) {
      setError("No se pudo cargar PayPal. Asegúrate de agregar el script en tu index.html.");
    }
  }, [asientosSeleccionados, navigate, total]);

  if (!asientosSeleccionados) return null;

  return (
    <div className="inicio-container">
      <header className="header">
        <div className="logo"><Link to="/">Viajero Mundial</Link></div>
        <div className="menu-derecha">
          <nav className="nav"><Link to="/partidos">Partidos</Link></nav>
        </div>
      </header>

      <section className="eventos" style={{ marginTop: "40px", minHeight: "60vh" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <h2>Resumen de tu compra</h2>
          <p style={{ fontSize: "18px", color: "#555", marginBottom: "10px" }}>{partido?.equipos}</p>
          
          <div style={{ background: "#f1f2f6", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>Asientos Seleccionados:</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold", color: "#00b894", margin: "0" }}>
              {asientosSeleccionados.join(", ")}
            </p>
          </div>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0", color: "#2d3436" }}>Total a pagar: ${total} USD</p>
          {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "15px" }}>{error}</p>}
          <div ref={paypalRef} style={{ marginTop: "20px", minHeight: "150px" }}></div>
          <button onClick={() => navigate(-1)} className="login" style={{ background: "#666", border: "none", cursor: "pointer", marginTop: "15px", width: "100%" }}>Volver atrás</button>
        </div>
      </section>
    </div>
  );
};

export default Asientos;
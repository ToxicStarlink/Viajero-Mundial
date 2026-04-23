import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// 1. IMPORTANTE: Cambiamos la importación al CSS correcto de compras
import "../CSS/compra.css";

const Compra = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { asientosSeleccionados, total, partido } = location.state || {};
  
  const paypalRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!asientosSeleccionados || asientosSeleccionados.length === 0) {
      navigate("/partidos");
      return;
    }

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
                currency_code: "USD",
                value: total.toFixed(2)
              },
              description: `Boletos: ${asientosSeleccionados.join(", ")}`
            }]
          });
        },
        onApprove(data, actions) {
          return actions.order.capture().then(details => {
            alert(`Pago completado con éxito. Gracias, ${details.payer.name.given_name}!`);
            navigate("/"); 
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

  // Separamos el string "Estadio - Ciudad" que viene del state de React
  const lugarSplit = partido?.lugar ? partido.lugar.split(' - ') : ["", ""];
  const estadio = lugarSplit[0] || "";
  const ciudad = lugarSplit[1] || "";

  return (
    <>
      <header className="header">
        <div className="logo"><Link to="/">Viajero Mundial</Link></div>
        <div className="menu-derecha">
          <nav className="nav">
            <Link to="/partidos">Partidos</Link>
            <Link to="/guia">Guía Turística</Link>
          </nav>
          {isLoggedIn ? (
            <Link to="/perfil" className="login">Mi perfil</Link>
          ) : (
            <Link to="/login" className="login">Inicio de Sesión</Link>
          )}
        </div>
      </header>

      {/* 2. Recreamos la estructura HTML exacta del PHP */}
      <section className="compra">
        <div className="contenedor-compra">
          
          <div className="imagen-partido">
            <img src="/IMG/info3.jpg" alt="Partido" />
          </div>

          <div className="info-compra">
            <h1>{partido?.equipos || "Partido"}</h1>
            
            <p className="dato"><b>Estadio:</b> {estadio}</p>
            <p className="dato"><b>Ciudad:</b> {ciudad}</p>
            <p className="dato"><b>Fecha:</b> {partido?.fecha}</p>
            <p className="dato"><b>Asientos:</b> {asientosSeleccionados.join(", ")}</p>
            
            <p className="precio"><b>Total:</b> ${total}</p>

            {/* Contenedor de PayPal integrado debajo del texto como en PHP */}
            <div id="paypal-section" style={{ marginTop: "24px" }}>
              <div ref={paypalRef} id="paypal-button-container"></div>
              {error && <p id="paypal-message" style={{ color: "#b22222", marginTop: "12px" }}>{error}</p>}
            </div>
            
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Viajero Mundial</p>
      </footer>
    </>
  );
};

export default Compra;
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import axios from "axios";
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

    const renderPayPalButtons = () => {
      if (
        window.paypal &&
        paypalRef.current &&
        paypalRef.current.children.length === 0
      ) {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
            },
            createOrder(data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: total.toFixed(2),
                    },
                    description: `Boletos: ${asientosSeleccionados.join(", ")}`,
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
            
              return actions.order.capture().then(async (details) => {
                try {
                  const usuarioData = JSON.parse(
                    localStorage.getItem("usuario"),
                  );

                  await axios.post(
                    "http://localhost:3000/api/comprar-boletos",
                    {
                      fk_usuario: usuarioData.id_usuario,
                      fk_partido: partido.id,
                      fk_estadio_zona: location.state.idEstadioZona,
                      asientos: asientosSeleccionados,
                    },
                  );

                  alert(
                    `¡Pago completado! Boletos registrados para ${details.payer.name.given_name}`,
                  );
                  navigate("/");
                } catch (err) {
                  console.error("Error al guardar la compra:", err);
                  setError(
                    "Error al registrar tus boletos en la base de datos.",
                  );
                }
              });
            },
            onError(err) {
              console.error(err);
              setError(
                "Ocurrió un error con PayPal. Revisa la consola para más detalles.",
              );
            },
          })
          .render(paypalRef.current);
      }
    };

    if (!window.paypal) {
      const script = document.createElement("script");
      // IMPORTANTE: Si tienes un Client ID real, reemplaza la palabra "test" por tu ID.
      script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=USD";
      script.async = true;
      script.onload = () => renderPayPalButtons();
      script.onerror = () =>
        setError("No se pudo cargar la pasarela de PayPal.");
      document.body.appendChild(script);
    } else {
      renderPayPalButtons();
    }
  }, [asientosSeleccionados, navigate, total]);

  if (!asientosSeleccionados) return null;

  // Separamos el string "Estadio - Ciudad" que viene del state de React
  const lugarSplit = partido?.lugar ? partido.lugar.split(" - ") : ["", ""];
  const estadio = lugarSplit[0] || "";
  const ciudad = lugarSplit[1] || "";

  return (
    <div className="compra-container">
      <Navbar />

      <section className="compra">
        <div className="contenedor-compra">
          <div className="imagen-partido">
            <img src="/IMG/info3.jpg" alt="Partido" />
          </div>

          <div className="info-compra">
            <h1>{partido?.equipos || "Partido"}</h1>

            <p className="dato">
              <b>Estadio:</b> {partido.estadio?.nombre}
            </p>
            <p className="dato">
              <b>Ciudad:</b> {partido.estadio?.ciudad?.nombre}
            </p>
            <p className="dato">
              <b>Fecha:</b> {new Date(partido.fecha).toLocaleDateString()}
            </p>
            <p className="dato">
              <b>Asientos:</b> {asientosSeleccionados.join(", ")}
            </p>

            <p className="precio">
              <b>Total:</b> ${total}
            </p>

            <div id="paypal-section" style={{ marginTop: "24px" }}>
              <div ref={paypalRef} id="paypal-button-container"></div>
              {error && (
                <p
                  id="paypal-message"
                  style={{ color: "#b22222", marginTop: "12px" }}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Viajero Mundial</p>
      </footer>
    </div>
  );
};

export default Compra;

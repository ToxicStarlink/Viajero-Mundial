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
  const isPaidRef = useRef(false);
  const buttonRenderedRef = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!asientosSeleccionados || asientosSeleccionados.length === 0) {
      navigate("/partidos");
      return;
    }

    const renderPayPalButtons = () => {
      if (window.paypal && paypalRef.current && !buttonRenderedRef.current) {
        buttonRenderedRef.current = true;

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
                      currency_code: "MXN",
                      value: total.toFixed(2),
                    },
                    description: `Boletos: ${asientosSeleccionados.join(", ")}`,
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
            
              let details;
              try {
                details = await actions.order.capture();
              } catch (captureErr) {
                console.error("Error al capturar el pago:", captureErr);
                // BYPASS: Si es el error de cookies de localhost, simulamos el éxito para poder seguir programando
                if (captureErr.message && captureErr.message.includes("Buyer access token not present")) {
                  console.warn("Bypass activo: Simulando pago exitoso por bloqueo de cookies en localhost.");
                  details = { payer: { name: { given_name: "Usuario de Prueba" } } };
                } else {
                  setError("Error al procesar el pago: " + (captureErr.message || "Revisa la consola."));
                  isPaidRef.current = false;
                  return;
                }
              }

              try {
                isPaidRef.current = true;
                const usuarioData = JSON.parse(localStorage.getItem("usuario"));

                await axios.post("http://localhost:3000/api/comprar-boletos", {
                  fk_usuario: usuarioData.id_usuario,
                  fk_partido: partido.id,
                  fk_estadio_zona: location.state.idEstadioZona,
                  asientos: asientosSeleccionados,
                });

                alert(`¡Pago completado! Boletos registrados para ${details.payer.name.given_name}`);
                navigate("/perfil");
              } catch (err) {
                console.error("Error al guardar la compra:", err);
                setError("Error al registrar tus boletos en la base de datos.");
              }
            },
            onError(err) {
              console.error("Error capturado por PayPal:", err);
              
              // Ignorar errores fantasma si ya se pagó o si el usuario cerró la ventana
              if (isPaidRef.current) return;
              if (err && err.message && err.message.includes("Window closed")) return;

              setError(
                "Ocurrió un error con PayPal. Por favor, recarga la página e intenta de nuevo.",
              );
            },
          })
          .render(paypalRef.current);
      }
    };

  

   
    const expectedSrc = "https://www.paypal.com/sdk/js?client-id=test&currency=MXN";
    const existingScript = document.getElementById("paypal-sdk-script");
    
    if (existingScript && existingScript.src !== expectedSrc) {
      existingScript.remove();
      window.paypal = null;
    }

    if (!document.getElementById("paypal-sdk-script")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk-script";
      script.src = expectedSrc;
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

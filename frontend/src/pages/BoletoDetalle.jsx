import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCodeModule from "react-qr-code";
import Navbar from "../components/Navbar";
import "../CSS/inicio.css";


const QRCode = QRCodeModule.default || QRCodeModule;

const BoletoDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  const { compra } = location.state || {};

  if (!compra) {
    return (
      <div className="inicio-container">
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>No se encontró información del boleto.</h2>
          <button onClick={() => navigate("/perfil")} className="login" style={{ border: 'none', cursor: 'pointer', padding: '10px 20px', marginTop: '20px' }}>Volver al perfil</button>
        </div>
      </div>
    );
  }

  const qrData = JSON.stringify({
    id_boleto: compra.id,
    partido_id: compra.partido?.id || "Desconocido",
    asiento: compra.asiento,
    fecha: compra.partido?.fecha || "Sin fecha"
  });

  return (
    <div className="inicio-container">
      <Navbar />
      <div style={{ maxWidth: "500px", margin: "60px auto", padding: "40px", background: "white", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h2 style={{ marginBottom: "5px", color: "#2d3436" }}>Boleto Digital</h2>
        <p style={{ color: "#636e72", marginBottom: "25px" }}>Boleto digital oficial</p>
        
        <div style={{ margin: "20px auto", padding: "20px", background: "white", borderRadius: "12px", border: "1px solid #dfe6e9", display: "inline-block" }}>
          <QRCode value={qrData} size={200} />
        </div>

        <div style={{ textAlign: "left", background: "#f8f9fa", padding: "25px", borderRadius: "12px", color: "#444", fontSize: "16px", marginTop: "15px" }}>
          <p style={{ margin: "10px 0" }}><strong>Fecha:</strong> {compra.partido?.fecha ? new Date(compra.partido.fecha).toLocaleDateString("es-MX", { year: 'numeric', month: 'long', day: 'numeric'}) : "No disponible"}</p>
          <p style={{ margin: "10px 0" }}><strong>Hora:</strong> {compra.partido?.hora || "Por definir"}</p>
          <p style={{ margin: "10px 0" }}><strong>Asiento:</strong> {compra.asiento}</p>
          <p style={{ margin: "10px 0" }}><strong>Folio / ID:</strong> {compra.id}</p>
        </div>
      </div>
    </div>
  );
};

export default BoletoDetalle;
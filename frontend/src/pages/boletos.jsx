import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import "../CSS/boletos.css";

const Boletos = () => {
  const [partido, setPartido] = useState(null);
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [precioZona, setPrecioZona] = useState(0);
  const [idEstadioZona, setIdEstadioZona] = useState(null);
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/partidos/${id}`);
        setPartido(res.data);
      } catch (error) {
        console.error("Error al obtener partido:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerDatos();
  }, [id]);

  const comprarZona = async (nombreZona) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/detalles-zona`, {
        params: {
          id_estadio: partido.fk_estadio,
          tipo_zona: nombreZona,
        },
      });

      if (res.data) {
        setPrecioZona(parseFloat(res.data.precio));
        setIdEstadioZona(res.data.id);
        setZonaSeleccionada(nombreZona);
        setAsientosSeleccionados([]);
      }
    } catch (error) {
      alert("No se pudo cargar el precio de esta zona.");
    }
  };

  const toggleAsiento = (asiento) => {
    if (asientosSeleccionados.includes(asiento)) {
      setAsientosSeleccionados(
        asientosSeleccionados.filter((a) => a !== asiento),
      );
    } else {
      setAsientosSeleccionados([...asientosSeleccionados, asiento]);
    }
  };

  const procederAlPago = () => {
    const usuarioLogueado = localStorage.getItem("usuario");
    if (!usuarioLogueado) {
      alert("Debes iniciar sesión para comprar.");
      return navigate("/login");
    }

    navigate("/compra", {
      state: {
        asientosSeleccionados,
        total: asientosSeleccionados.length * precioZona,
        partido,
        idEstadioZona,
        precioUnitario: precioZona,
      },
    });
  };

  if (cargando)
    return (
      <div className="contenedor-pagina">
        <h2>Cargando...</h2>
      </div>
    );
  if (!partido)
    return (
      <div className="contenedor-pagina">
        <h2>Partido no encontrado</h2>
      </div>
    );

  return (
    <div className="boletos-container">
      <Navbar />

      <section className="info-partido">
        <h1>{partido.nombre}</h1>
        <p className="estadio">
          {partido.estadio?.nombre || "Estadio Seleccionado"}
        </p>
        <p className="fecha">
          {new Date(partido.fecha).toLocaleDateString()} · {partido.hora}
        </p>
      </section>

      <div className="contenedor-pagina">
        <section className="boletos">
        {!zonaSeleccionada ? (
            <div className="mapa-estadio">
              <div className="mapa">
                <img src="/MAP/A1.png" className="estadio-base" alt="Estadio" />

                {/* ZONAS*/}
                {['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 
                  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 
                  'G1', 'G2', 'G3', 'G4'].map((z) => (
                  <div key={z} className={`zona zona-${z.toLowerCase()}`} onClick={() => comprarZona(z)}>
                    <img src={`/MAP/${z}.png`} alt={z} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="seleccion-asientos" style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", maxWidth: "600px", margin: "0 auto" }}>
              <h3>Selecciona tus asientos en Zona {zonaSeleccionada}</h3>
              <p>Precio por asiento: ${precioZona} USD</p>
              
              <button onClick={() => setZonaSeleccionada(null)} className="login" style={{ marginBottom: "20px", background: "#666", border: "none", cursor: "pointer" }}>
                Volver al mapa
              </button>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", maxWidth: "350px", margin: "25px auto" }}>
                {["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5"].map((asiento) => (
                  <button
                    key={asiento}
                    onClick={() => toggleAsiento(asiento)}
                    style={{ 
                        padding: "12px", 
                        cursor: "pointer", 
                        backgroundColor: asientosSeleccionados.includes(asiento) ? "#00b894" : "#f1f2f6", 
                        color: asientosSeleccionados.includes(asiento) ? "white" : "#333", 
                        border: "1px solid #dcdde1", 
                        borderRadius: "6px", 
                        fontWeight: "bold" 
                    }}
                  >
                    {asiento}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0", color: "#2d3436" }}>
                Total: ${(asientosSeleccionados.length * precioZona).toFixed(2)} USD
              </p>
              
              <button 
                onClick={procederAlPago} 
                className="login" 
                disabled={asientosSeleccionados.length === 0} 
                style={{ 
                    border: "none", 
                    fontSize: "16px", 
                    cursor: asientosSeleccionados.length === 0 ? "not-allowed" : "pointer", 
                    padding: "14px 28px", 
                    width: "100%", 
                    maxWidth: "350px" 
                }}
              >
                Continuar al Pago
              </button>
            </div>
          )}
        </section>

        <footer>
          <p>© 2026 Viajero Mundial</p>
        </footer>
      </div>
    </div>
  );
};

export default Boletos;

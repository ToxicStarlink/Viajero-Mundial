import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [asientosOcupados, setAsientosOcupados] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

const asientosPorZona = {
  E: [
    "E-A1", "E-A2", "E-A3", "E-A4", "E-A5",
    "E-B1", "E-B2", "E-B3", "E-B4", "E-B5",
    "E-C1", "E-C2", "E-C3", "E-C4", "E-C5",
    "E-D1", "E-D2", "E-D3", "E-D4", "E-D5",
    "E-E1", "E-E2", "E-E3", "E-E4", "E-E5",
    "E-F1", "E-F2", "E-F3", "E-F4", "E-F5"
  ],

  F: [
    "F-A1", "F-A2", "F-A3", "F-A4", "F-A5",
    "F-B1", "F-B2", "F-B3", "F-B4", "F-B5",
    "F-C1", "F-C2", "F-C3", "F-C4", "F-C5",
    "F-D1", "F-D2", "F-D3", "F-D4", "F-D5"
  ],

  G: [
    "G-A1", "G-A2", "G-A3", "G-A4", "G-A5", 
    "G-B1", "G-B2", "G-B3", "G-B4", "G-B5"
  ]
};

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
        
        // Consultar asientos ocupados para bloquearlos
        const ocupadosRes = await axios.get(`http://localhost:3000/api/asientos-ocupados`, {
          params: {
            fk_partido: partido.id,
            fk_estadio_zona: res.data.id
          }
        });
        setAsientosOcupados(ocupadosRes.data);
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
                {asientosPorZona[zonaSeleccionada.charAt(0)]?.map((asiento) => {
                  const ocupado = asientosOcupados.includes(asiento);
                  const seleccionado = asientosSeleccionados.includes(asiento);
                  return (  
                  <button
                    key={asiento}
                    onClick={() => !ocupado && toggleAsiento(asiento)}
                    disabled={ocupado}
                    style={{ 
                        padding: "10.5px", 
                        cursor: ocupado ? "not-allowed" : "pointer", 
                        backgroundColor: ocupado ? "#dcdde1" : (seleccionado ? "#00b894" : "#f1f2f6"), 
                        color: ocupado ? "#7f8fa6" : (seleccionado ? "white" : "#333"), 
                        border: "1px solid #dcdde1", 
                        borderRadius: "6px", 
                        fontWeight: "bold",
                        opacity: ocupado ? 0.6 : 1
                    }}
                  >
                    {asiento}
                  </button>
                  );
                })}
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

import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "../CSS/boletos.css"; 

const Boletos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const precioPorBoleto = 150;

  const listaPartidos = [
    { id: "P001", equipos: "México vs España", lugar: "Estadio Azteca - Ciudad de México", fecha: "29 Junio 2026 · 18:00" },
    { id: "P002", equipos: "Argentina vs Alemania", lugar: "SoFi Stadium - Los Ángeles", fecha: "14 Junio 2026 · 18:00" },
    { id: "P003", equipos: "Brasil vs Francia", lugar: "BMO Field - Toronto", fecha: "16 Junio 2026 · 19:00" },
    { id: "P004", equipos: "Portugal vs Inglaterra", lugar: "AT&T Stadium - Dallas", fecha: "18 Junio 2026 · 17:00" },
    { id: "P005", equipos: "Italia vs Países Bajos", lugar: "Estadio Akron - Guadalajara", fecha: "20 Junio 2026 · 21:00" },
    { id: "P006", equipos: "Uruguay vs Colombia", lugar: "Hard Rock Stadium - Miami", fecha: "22 Junio 2026 · 18:30" },
    { id: "P007", equipos: "Ecuador vs Paraguay", lugar: "BMO Field - Toronto", fecha: "26 Junio 2026 · 17:00" },
    { id: "P008", equipos: "Austria vs Suiza", lugar: "Estadio Azteca - Ciudad de México", fecha: "29 Junio 2026 · 19:30" },
  ];

  const partido = listaPartidos.find((p) => p.id === id);

  if (!partido) {
    return (
      <div className="contenedor-pagina">
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>Partido no encontrado</h2>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/partidos" className="login">Volver a Partidos</Link>
        </div>
      </div>
    );
  }

  const comprarZona = (zona) => {
    setZonaSeleccionada(zona);
    setAsientosSeleccionados([])
  };

  const toggleAsiento = (asiento) => {
    if (asientosSeleccionados.includes(asiento)) {
      setAsientosSeleccionados(asientosSeleccionados.filter((a) => a !== asiento));
    } else {
      setAsientosSeleccionados([...asientosSeleccionados, asiento]);
    }
  };

  const procederAlPago = () => {
    navigate("/compra", {
      state: {
        asientosSeleccionados,
        total: asientosSeleccionados.length * precioPorBoleto,
        partido
      }
    });
  };

  return (
    <div className="boletos-container">
      <header className="header">
        <div className="logo">
          <Link to="/">Viajero Mundial</Link>
        </div>
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

      <section className="info-partido">
        <h1>{partido.equipos}</h1>
        <p className="estadio">{partido.lugar}</p>
        <p className="fecha">{partido.fecha}</p>
      </section>

      <div className="contenedor-pagina">
        <section className="boletos">
          {!zonaSeleccionada ? (
            <div className="mapa-estadio">
              <div className="mapa">
                {/* MAPA BASE */}
                <img src="/MAP/A1.png" className="estadio-base" alt="Estadio" />

                {/* ZONAS */}
                <div className="zona zona-e1" onClick={() => comprarZona('E1')}><img src="/MAP/E1.png" alt="E1" /></div>
                <div className="zona zona-e2" onClick={() => comprarZona('E2')}><img src="/MAP/E2.png" alt="E2" /></div>
                <div className="zona zona-e3" onClick={() => comprarZona('E3')}><img src="/MAP/E3.png" alt="E3" /></div>
                <div className="zona zona-e4" onClick={() => comprarZona('E4')}><img src="/MAP/E4.png" alt="E4" /></div>
                <div className="zona zona-e5" onClick={() => comprarZona('E5')}><img src="/MAP/E5.png" alt="E5" /></div>
                <div className="zona zona-e6" onClick={() => comprarZona('E6')}><img src="/MAP/E6.png" alt="E6" /></div>
                <div className="zona zona-e7" onClick={() => comprarZona('E7')}><img src="/MAP/E7.png" alt="E7" /></div>
                <div className="zona zona-e8" onClick={() => comprarZona('E8')}><img src="/MAP/E8.png" alt="E8" /></div>

                <div className="zona zona-f1" onClick={() => comprarZona('F1')}><img src="/MAP/F1.png" alt="F1" /></div>
                <div className="zona zona-f2" onClick={() => comprarZona('F2')}><img src="/MAP/F2.png" alt="F2" /></div>
                <div className="zona zona-f3" onClick={() => comprarZona('F3')}><img src="/MAP/F3.png" alt="F3" /></div>
                <div className="zona zona-f4" onClick={() => comprarZona('F4')}><img src="/MAP/F4.png" alt="F4" /></div>
                <div className="zona zona-f5" onClick={() => comprarZona('F5')}><img src="/MAP/F5.png" alt="F5" /></div>
                <div className="zona zona-f6" onClick={() => comprarZona('F6')}><img src="/MAP/F6.png" alt="F6" /></div>
                <div className="zona zona-f7" onClick={() => comprarZona('F7')}><img src="/MAP/F7.png" alt="F7" /></div>
                <div className="zona zona-f8" onClick={() => comprarZona('F8')}><img src="/MAP/F8.png" alt="F8" /></div>

                <div className="zona zona-g1" onClick={() => comprarZona('G1')}><img src="/MAP/G1.png" alt="G1" /></div>
                <div className="zona zona-g2" onClick={() => comprarZona('G2')}><img src="/MAP/G2.png" alt="G2" /></div>
                <div className="zona zona-g3" onClick={() => comprarZona('G3')}><img src="/MAP/G3.png" alt="G3" /></div>
                <div className="zona zona-g4" onClick={() => comprarZona('G4')}><img src="/MAP/G4.png" alt="G4" /></div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", maxWidth: "600px", margin: "0 auto" }}>
              <h3>Selecciona tus asientos en Zona {zonaSeleccionada}</h3>
              
              <button onClick={() => setZonaSeleccionada(null)} className="login" style={{ marginBottom: "20px", background: "#666", border: "none", cursor: "pointer" }}>
                Volver al mapa
              </button>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", maxWidth: "350px", margin: "25px auto" }}>
                {["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5"].map((asiento) => (
                  <button
                    key={asiento}
                    onClick={() => toggleAsiento(asiento)}
                    style={{ padding: "12px", cursor: "pointer", backgroundColor: asientosSeleccionados.includes(asiento) ? "#00b894" : "#f1f2f6", color: asientosSeleccionados.includes(asiento) ? "white" : "#333", border: "1px solid #dcdde1", borderRadius: "6px", fontWeight: "bold", transition: "0.2s" }}
                  >
                    {asiento}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: "20px", fontWeight: "bold", margin: "20px 0", color: "#2d3436" }}>
                Total a pagar: ${asientosSeleccionados.length * precioPorBoleto} USD
              </p>
              
              <button onClick={procederAlPago} className="login" disabled={asientosSeleccionados.length === 0} style={{ border: "none", fontSize: "16px", cursor: asientosSeleccionados.length === 0 ? "not-allowed" : "pointer", padding: "14px 28px", opacity: asientosSeleccionados.length === 0 ? 0.5 : 1, width: "100%", maxWidth: "350px" }}>
                Comprar boletos
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
import React from "react";
import { Link, useParams } from "react-router-dom";
import "../CSS/inicio.css";

const Boletos = () => {
  // Extraemos el parámetro 'id' de la URL (ej. P001, P002...)
  const { id } = useParams();

  // Reutilizamos la misma información de los partidos para mostrar los detalles correspondientes
  const listaPartidos = [
    { id: "P001", equipos: "México vs España", lugar: "Estadio Azteca - Ciudad de México", fecha: "29 Junio 2026 · 18:00", img: "/IMG/partido6.jpg" },
    { id: "P002", equipos: "Argentina vs Alemania", lugar: "SoFi Stadium - Los Ángeles", fecha: "14 Junio 2026 · 18:00", img: "/IMG/partido3.jpg" },
    { id: "P003", equipos: "Brasil vs Francia", lugar: "BMO Field - Toronto", fecha: "16 Junio 2026 · 19:00", img: "/IMG/partido1.jpg" },
    { id: "P004", equipos: "Portugal vs Inglaterra", lugar: "AT&T Stadium - Dallas", fecha: "18 Junio 2026 · 17:00", img: "/IMG/partido5.jpg" },
    { id: "P005", equipos: "Italia vs Países Bajos", lugar: "Estadio Akron - Guadalajara", fecha: "20 Junio 2026 · 21:00", img: "/IMG/partido4.jpg" },
    { id: "P006", equipos: "Uruguay vs Colombia", lugar: "Hard Rock Stadium - Miami", fecha: "22 Junio 2026 · 18:30", img: "/IMG/partido2.jpg" },
    { id: "P007", equipos: "Ecuador vs Paraguay", lugar: "BMO Field - Toronto", fecha: "26 Junio 2026 · 17:00", img: "/IMG/partido3.jpg" },
    { id: "P008", equipos: "Austria vs Suiza", lugar: "Estadio Azteca - Ciudad de México", fecha: "29 Junio 2026 · 19:30", img: "/IMG/partido1.jpg" },
  ];

  // Buscamos el partido que coincide con el ID actual de la URL
  const partido = listaPartidos.find((p) => p.id === id);

  // Si alguien entra a un ID que no existe, le mostramos esto:
  if (!partido) {
    return (
      <div className="inicio-container">
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>Partido no encontrado</h2>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/partidos" className="login">Volver a Partidos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="inicio-container">
      <header className="header">
        <div className="logo">
          <Link to="/">Viajero Mundial</Link>
        </div>
        <div className="menu-derecha">
          <nav className="nav">
            <Link to="/partidos">Partidos</Link>
            <Link to="/guia">Guía Turística</Link>
          </nav>
          <Link to="/login" className="login">
            Iniciar sesión
          </Link>
        </div>
      </header>

      <section className="eventos" style={{ marginTop: "20px", minHeight: "60vh" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "10px" }}>
          Boletos para {partido.equipos}
        </h2>
        <p className="subtitulo" style={{ textAlign: "center", marginBottom: "40px" }}>
          {partido.lugar} | {partido.fecha}
        </p>

        <div style={{ maxWidth: "800px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <img src={partido.img} alt={partido.equipos} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }} />
          
          <div style={{ textAlign: "center" }}>
            <h3>Mapa del Estadio y Selección de Asientos</h3>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              (Aquí integraremos tu lógica y diseño visual de selección de asientos en el futuro)
            </p>
            <button className="login" style={{ border: "none", fontSize: "16px", cursor: "pointer", padding: "12px 24px" }}>
              Continuar al Pago
            </button>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Viajero Mundial</p>
      </footer>
    </div>
  );
};

export default Boletos;
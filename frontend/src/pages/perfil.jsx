import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/inicio.css";

const Perfil = () => {
  const navigate = useNavigate();
  

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {

    setIsLoggedIn(false);
    navigate("/");
  };

  const usuario = {
    nombre: "Nombrerandom",
    apellido: "Apellidorandom",
    correo: "correorandom@gmail.com",
    usuario: "usariorandom"
  };

  // Historial de boletos comprados ficticio
  const historialCompras = [
    {
      id: "C001",
      equipos: "México vs España",
      fecha: "29 Junio 2026 · 18:00",
      asientos: "A1, A2",
      total: "$300 USD",
      img: "/IMG/partido6.jpg"
    },
    {
      id: "C002",
      equipos: "Argentina vs Alemania",
      fecha: "14 Junio 2026 · 18:00",
      asientos: "E1",
      total: "$150 USD",
      img: "/IMG/partido3.jpg"
    }
  ];

  return (
    <div className="inicio-container">
      <header className="header">
        <div className="logo"><Link to="/">Viajero Mundial</Link></div>
        <div className="menu-derecha">
          <nav className="nav">
            <Link to="/partidos">Partidos</Link>
            <Link to="/guia">Guía Turística</Link>
          </nav>
          <button onClick={handleLogout} className="login" style={{ cursor: "pointer", border: "none", fontSize: "16px", fontFamily: "inherit" }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="perfil" style={{ minHeight: "60vh" }}>
        <h2>Mi Perfil</h2>
        
        <div className="perfil-contenedor">
          <div className="perfil-datos">
            <h3>Datos Personales</h3>
            <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
            <p><strong>Usuario:</strong> {usuario.usuario}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 20px 0" }}>Historial de boletos</h3>
            <div className="contenedor-compras">
              {historialCompras.map((compra) => (
                <div className="compra-card" key={compra.id}>
                  <img src={compra.img} alt={compra.equipos} />
                  <div className="compra-info">
                    <h3>{compra.equipos}</h3>
                    <p>{compra.fecha}</p>
                    <p style={{ margin: "6px 0", color: "#333" }}>Asientos: {compra.asientos}</p>
                    <span>{compra.total}</span>
                  </div>
                </div>
              ))}
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

export default Perfil;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datosUsuario = localStorage.getItem("usuario");
    if (datosUsuario) {
      setUsuario(JSON.parse(datosUsuario));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Viajero Mundial</Link>
      </div>
      <div className="menu-derecha">
        <nav className="nav">
          <Link to="/partidos">Partidos</Link>
          <Link to="/guia">Guía Turística</Link>
        </nav>

        {usuario ? (
          <div
            className="user-menu"
            style={{ display: "flex", gap: "15px", alignItems: "center" }}
          >
            <Link to="/perfil" className="login">
              Mi perfil
            </Link>
            
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                cerrarSesion();
              }}
              className="login"
              style={{
                background: "#ff4d4d",
                cursor: "pointer",
              }}
            >
              Salir
            </a>
          </div>
        ) : (
          <Link to="/login" className="login">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// IMPORTANTE: Importamos guia.css para los estilos correctos
import "../CSS/guia.css";

const Guia = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Función para recrear el onClick="verPais('...')" que tenías en PHP
  const verPais = (pais) => {
    console.log(`Explorando destinos en: ${pais}`);
    // Aquí puedes agregar tu navigate para ir a una página específica
    // navigate(`/guia/${pais}`);
  };

  return (
    <>
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
            <Link to="/login" className="login">Iniciar sesión</Link>
          )}
        </div>
      </header>

      {/* Recreamos la estructura exacta del HTML de tu PHP */}
      <section className="guia">
        <h1>Guía Turística del Mundial 2026</h1>
        <p className="subtitulo">
          Explora los países anfitriones del Mundial 2026 y descubre sus ciudades,
          estadios y lugares turísticos.
        </p>

        <div className="contenedor-guia">

          {/* MEXICO */}
          <div className="guia-card">
            {/* Si la imagen no carga, asegúrate de que exista en tu carpeta /IMG/ */}
            <img src="/IMG/mexico.jpg" alt="México" />
            <div className="guia-info">
              <h3>🇲🇽 México</h3>
              <p>
                México será sede histórica del Mundial 2026.
                Ofrece cultura, gastronomía y estadios legendarios.
              </p>
              <ul>
                <li>Estadio Azteca — Ciudad de México</li>
                <li>Estadio BBVA — Monterrey</li>
                <li>Estadio Akron — Guadalajara</li>
              </ul>
              <button onClick={() => verPais('mexico')}>
                Explorar destinos
              </button>
            </div>
          </div>

          {/* USA */}
          <div className="guia-card">
            <img src="/IMG/usa.jpg" alt="Estados Unidos" />
            <div className="guia-info">
              <h3>🇺🇸 Estados Unidos</h3>
              <p>
                Estados Unidos tendrá la mayor cantidad de partidos
                y estadios modernos en ciudades icónicas.
              </p>
              <ul>
                <li>SoFi Stadium — Los Ángeles</li>
                <li>AT&T Stadium — Dallas</li>
                <li>MetLife Stadium — Nueva York</li>
              </ul>
              <button onClick={() => verPais('usa')}>
                Explorar destinos
              </button>
            </div>
          </div>

          {/* CANADA */}
          <div className="guia-card">
            <img src="/IMG/canada.jpg" alt="Canadá" />
            <div className="guia-info">
              <h3>🇨🇦 Canadá</h3>
              <p>
                Canadá aportará estadios modernos rodeados
                de paisajes naturales impresionantes.
              </p>
              <ul>
                <li>BC Place — Vancouver</li>
                <li>BMO Field — Toronto</li>
              </ul>
              <button onClick={() => verPais('canada')}>
                Explorar destinos
              </button>
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

export default Guia;
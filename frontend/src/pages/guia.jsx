import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

import "../CSS/guia.css";

const Guia = () => {
  const [paises, setPaises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/paises");
        setPaises(res.data);
      } catch (error) {
        alert("Error al cargar los destinos.");
        console.error("Error al traer países:", error);
      }
    };
    obtenerDatos();
  }, []);

  const verPais = (pais) => {
    console.log(`Explorando destinos en: ${pais.nombre}`);
  };

  const obtenerImagen = (nombre) => {
    if (nombre.toLowerCase().includes("méxico") || nombre.toLowerCase().includes("mexico")) return "/IMG/mexico.jpg";
    if (nombre.toLowerCase().includes("usa") || nombre.toLowerCase().includes("estados unidos")) return "/IMG/usa.jpg";
    if (nombre.toLowerCase().includes("canadá") || nombre.toLowerCase().includes("canada")) return "/IMG/canada.jpg";
    return "/IMG/info1.jpg";
  };

  return (
    <div className="guia-container">
      <Navbar />

      <section className="guia">
        <h1>Guía Turística del Mundial 2026</h1>
        <p className="subtitulo">
          Explora los países anfitriones del Mundial 2026 y descubre sus ciudades,
          estadios y lugares turísticos.
        </p>

        <div className="contenedor-guia">

          {paises.length > 0 ? (
            paises.map((pais) => {
              // Extraemos las ciudades y estadios fuera del bloque HTML para evitar errores de sintaxis en React
              const ciudades = pais.ciudades || pais.Ciudad || pais.ciudad || [];
              return (
                <div className="guia-card" key={pais.id}>
                  <img src={obtenerImagen(pais.nombre)} alt={pais.nombre} />
                  <div className="guia-info">
                    <h3>{pais.nombre}</h3>
                    <p>
                      Explora la cultura, gastronomía y los estadios en {pais.nombre}.
                    </p>
                    <ul>
                      {ciudades.slice(0, 3).map((ciudad) => {
                        const estadios = ciudad.estadios || ciudad.Estadio || ciudad.estadio || [];
                        return estadios.map((estadio) => (
                          <li key={estadio.id}>
                            {estadio.nombre} — {ciudad.nombre}
                          </li>
                        ));
                      })}
                    </ul>
                    <button onClick={() => verPais(pais)}>
                      Explorar destinos
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Cargando destinos...</p>
          )}
        </div>
      </section>

      <footer>
        <p>© 2026 Viajero Mundial</p>
      </footer>
    </div>
  );
};

export default Guia;
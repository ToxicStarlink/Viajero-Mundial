import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import "../CSS/partidos.css";

const Partidos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listaPartidos, setListaPartidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [fecha, setFecha] = useState("");
  const [estadio, setEstadio] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/partidos");
        setListaPartidos(res.data);
      } catch (error) {
        console.error("Error al traer partidos:", error);
      }
    };
    obtenerDatos();
  }, []);

  
  const partidosFiltrados = listaPartidos.filter((partido) => {
    const textoBuscado = busqueda.toLowerCase();
    const equipo1 = partido.equipo1?.nombre?.toLowerCase() || "";
    const equipo2 = partido.equipo2?.nombre?.toLowerCase() || "";
    const nombreEstadio = partido.estadio?.nombre?.toLowerCase() || "";
    
    // Filtro por texto (equipos)
    const coincideTexto = textoBuscado === "" || equipo1.includes(textoBuscado) || equipo2.includes(textoBuscado);
    
    // Filtro por fecha (cortamos a YYYY-MM-DD para comparar con el input type="date")
    const fechaPartido = partido.fecha ? partido.fecha.substring(0, 10) : "";
    const coincideFecha = fecha === "" || fechaPartido === fecha;
    
    // Filtro por estadio
    const coincideEstadio = estadio === "" || nombreEstadio.includes(estadio.toLowerCase());

    return coincideTexto && coincideFecha && coincideEstadio;
  });

  return (
    <div className="partidos-container">
      <Navbar isLoggedIn={isLoggedIn} />

      <section className="partidos">
        <h2>Boletos para Copa Mundial de Fútbol</h2>

        <div className="filtros">
          <input 
            type="text" 
            placeholder="Buscar por equipo o país..." 
            style={{flexGrow: 1}} 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <input 
            type="date" 
            aria-label="Fecha" 
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <select 
            aria-label="Estadios"
            value={estadio}
            onChange={(e) => setEstadio(e.target.value)}
          >
            <option value="">Todos los estadios</option>
            <option value="azteca">Estadio Azteca</option>
            <option value="bbva">Estadio BBVA</option>
            <option value="hard rock">Hard Rock Stadium</option>
          </select>
        </div>

        <div className="contenedor-partidos-lista">
          {partidosFiltrados.map((partido) => (
            <div className="partido" key={partido.id}>
              <div className="partido-info">
                <h3>{partido.equipo1?.nombre} vs {partido.equipo2?.nombre}</h3>
                <p>{partido.estadio?.nombre} - {partido.estadio?.ciudad?.nombre}</p>
                <p>
                  {new Date(partido.fecha).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })} · {partido.hora}
                </p>
              </div>
              <Link to={`/boletos/${partido.id}`}>
                <button>Ver Boletos</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2026 Viajero Mundial</p>
      </footer>
    </div>
  );
};

export default Partidos;
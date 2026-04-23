import React from "react";
import { Link } from "react-router-dom";

import "../CSS/partidos.css";

const Partidos = () => {

  const listaPartidos = [
    {
      id: "P001",
      equipos: "México vs España",
      lugar: "Estadio Azteca - Ciudad de México",
      fecha: "29 Junio 2026 · 18:00",
      img: "/IMG/partido6.jpg", 
    },
    {
      id: "P002",
      equipos: "Argentina vs Alemania",
      lugar: "SoFi Stadium - Los Ángeles",
      fecha: "14 Junio 2026 · 18:00",
      img: "/IMG/partido3.jpg",
    },
    {
      id: "P003",
      equipos: "Brasil vs Francia",
      lugar: "BMO Field - Toronto",
      fecha: "16 Junio 2026 · 19:00",
      img: "/IMG/partido1.jpg",
    },
    {
      id: "P004",
      equipos: "Portugal vs Inglaterra",
      lugar: "AT&T Stadium - Dallas",
      fecha: "18 Junio 2026 · 17:00",
      img: "/IMG/partido5.jpg",
    },
    {
      id: "P005",
      equipos: "Italia vs Países Bajos",
      lugar: "Estadio Akron - Guadalajara",
      fecha: "20 Junio 2026 · 21:00",
      img: "/IMG/partido4.jpg",
    },
    {
      id: "P006",
      equipos: "Uruguay vs Colombia",
      lugar: "Hard Rock Stadium - Miami",
      fecha: "22 Junio 2026 · 18:30",
      img: "/IMG/partido2.jpg",
    },
    {
      id: "P007",
      equipos: "Ecuador vs Paraguay",
      lugar: "BMO Field - Toronto",
      fecha: "26 Junio 2026 · 17:00",
      img: "/IMG/partido3.jpg", 
    },
    {
      id: "P008",
      equipos: "Austria vs Suiza",
      lugar: "Estadio Azteca - Ciudad de México",
      fecha: "29 Junio 2026 · 19:30",
      img: "/IMG/partido1.jpg",
    },
  ];

  return (
    <div className="partidos-container">
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

      <section className="partidos">
        <h2>Boletos para Copa Mundial de Fútbol</h2>

        <div className="filtros">
          <input type="text" placeholder="Buscar por equipo o país..." style={{flexGrow: 1}} />
          <input type="date" aria-label="Fecha" />
          <select aria-label="Estadios">
            <option value="">Todos los estadios</option>
            <option value="azteca">Estadio Azteca</option>
            <option value="sofi">SoFi Stadium</option>
            <option value="bmo">BMO Field</option>
            <option value="akron">Estadio Akron</option>
          </select>
        </div>

        <div className="contenedor-partidos-lista">
          {listaPartidos.map((partido) => (
            <div className="partido" key={partido.id}>
              <div className="partido-info">
                <h3>{partido.equipos}</h3>
                <p>{partido.lugar}</p>
                <p>{partido.fecha}</p>
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
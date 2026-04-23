import React from "react";
import { Link } from "react-router-dom";

import "../CSS/inicio.css";

const Inicio = () => {
  const partidosDestacados = [
    {
      id: 1,
      equipos: "Brasil vs Francia",
      lugar: "Ontario · Canadá",
      precio: "$120 USD",
      img: "/IMG/partido1.jpg",
    },
    {
      id: 2,
      equipos: "Uruguay vs Colombia",
      lugar: "Florida · USA",
      precio: "$150 USD",
      img: "/IMG/partido2.jpg",
    },
    {
      id: 3,
      equipos: "Argentina vs Alemania",
      lugar: "California · USA",
      precio: "$130 USD",
      img: "/IMG/partido3.jpg",
    },
  ];
  const proximosPartidos = [
    {
      id: 4,
      equipos: "España vs Italia",
      fecha: "2026-11-20",
      img: "/IMG/partido4.jpg",
    },
    {
      id: 5,
      equipos: "Inglaterra vs Portugal",
      fecha: "2026-11-22",
      img: "/IMG/partido5.jpg",
    },
    {
      id: 6,
      equipos: "México vs Japón",
      fecha: "2026-11-24",
      img: "/IMG/partido6.jpg",
    },
  ];

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

      <section className="hero" id="hero">
        <div className="hero-content">
          <h1>Boletos para el Mundial</h1>
          <p>
            ¡Encuentra, reserva y disfruta los mejores eventos con solo unos
            clics!
          </p>
        </div>
      </section>

      <section className="eventos">
        <h2>Partidos destacados</h2>
        <div className="contenedor-partidos">
          {partidosDestacados.map((partido) => (
            <div className="card" key={partido.id}>
              <img src={partido.img} alt={partido.equipos} />
              <div className="card-info">
                <h3>{partido.equipos}</h3>
                <p>{partido.lugar}</p>
                <span>{partido.precio}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section class="proximos">
        <h2>Próximos partidos del mundial</h2>
        <div class="contenedor-proximos">
          {proximosPartidos.map((partido) => (
            <div className="card" key={partido.id}>
              <img src={partido.img} alt={partido.equipos} />
              <div className="card-info">
                <h3>{partido.equipos}</h3>
                <p>{partido.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section class="beneficios">
        <div class="beneficios-contenedor">
          <div class="beneficios-texto">
            <h2>¿Por qué comprar con nosotros?</h2>

            <p>
              En <strong>Viajero Mundial</strong> ofrecemos una plataforma
              moderna, segura y confiable para adquirir boletos para los
              partidos más esperados del mundial. Nuestra prioridad es brindar a
              los aficionados una experiencia de compra rápida, transparente y
              sin complicaciones, garantizando siempre la autenticidad de cada
              boleto.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Viajero Mundial</p>
      </footer>
    </div>
  );
};

export default Inicio;

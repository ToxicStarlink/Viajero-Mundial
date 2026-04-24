import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import "../CSS/inicio.css";

const Inicio = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Hero de imagenes q cambian
  const heroImages = [
    "/IMG/Estadio1.jpg",
    "/IMG/Estadio2.jpg",
    "/IMG/Estadio3.jpg",
    "/IMG/Estadio4.jpg",
    "/IMG/Estadio5.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  //Datos de partidos destacados
  const [partidosDestacados, setPartidosDestacados] = useState([]);
  const [proximosPartidos, setProximosPartidos] = useState([]);

  //conexion
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/partidos");

        setPartidosDestacados(res.data.slice(0, 3));
        setProximosPartidos(res.data.slice(3, 6));
      } catch (error) {
        console.error("Error al traer partidos:", error);
      }
    };
    obtenerDatos();
  }, []);

  return (
    <div className="inicio-container">
      <Navbar isLoggedIn={isLoggedIn} />

      <section
        className="hero"
        id="hero"
        style={{ backgroundImage: `url('${heroImages[currentImage]}')` }}
      >
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
          {partidosDestacados.map((p) => (
            <div className="card" key={p.id}>
              <img src={`/IMG/partido${p.id}.jpg`} alt="Partido" />
              <div className="card-info">
                <h3>
                  {p.equipo1.nombre} vs {p.equipo2.nombre}
                </h3>
                <p>
                  {p.estadio.nombre} · {p.estadio.ciudad.nombre}
                </p>
                <span>Boletos Disponibles</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="proximos">
        <h2>Próximos partidos del mundial</h2>
        <div className="contenedor-proximos">
          {proximosPartidos.map((p) => (
            <div className="proximo-card" key={p.id}>
              <img src={`/IMG/partido${p.id}.jpg`} alt="Partido" />
              <div className="proximo-info">
                <h3>
                  {p.equipo1.nombre} vs {p.equipo2.nombre}
                </h3>
                <p>
                  {new Date(p.fecha).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <div className="tooltip">Más información pronto</div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="beneficios">
        <div className="beneficios-contenedor">
          <div className="beneficios-texto">
            <h2>¿Por qué comprar con nosotros?</h2>
            <p>
              En <strong>Viajero Mundial</strong> ofrecemos una plataforma
              moderna, segura y confiable para adquirir boletos para los
              partidos más esperados del mundial. Nuestra prioridad es brindar a
              los aficionados una experiencia de compra rápida, transparente y
              sin complicaciones, garantizando siempre la autenticidad de cada
              boleto.
            </p>
            <div className="beneficio">
              <h3>Compra segura</h3>
              <p>
                Nuestro sistema utiliza protocolos avanzados de seguridad
                digital y verificación de pagos, permitiendo que cada
                transacción sea protegida mediante tecnologías modernas de
                encriptación. Miles de aficionados ya confían en nuestra
                plataforma para adquirir sus entradas sin riesgos.
              </p>
            </div>

            <div className="beneficio">
              <h3>Boletos verificados</h3>
              <p>
                Cada boleto disponible en nuestra plataforma pasa por un proceso
                de validación para asegurar su autenticidad. Trabajamos con
                distribuidores confiables y proveedores autorizados para
                garantizar que los aficionados reciban entradas legítimas para
                cada partido del mundial.
              </p>
            </div>
            <div className="beneficio">
              <h3>Entrega digital inmediata</h3>
              <p>
                Una vez completada la compra, los boletos son enviados
                digitalmente de forma inmediata al correo electrónico del
                comprador. Esto permite acceder a los partidos sin retrasos y
                sin necesidad de recoger entradas físicas.
              </p>
            </div>
          </div>

          <div className="beneficios-imagen">
            <img src="/IMG/partido7.jpg" alt="Beneficios" />
          </div>
        </div>
      </section>

      <section className="noticias">
        <h2>Noticias del mundial</h2>
        <p className="subtitulo"></p>
        <div className="contenedor-noticias">
          <div className="noticia-card">
            <img src="/IMG/info1.jpg" alt="Noticia 1" />
            <div className="noticia-info">
              <h3>Se anuncian nuevas sedes para el Mundial 2030</h3>
              <p>
                La FIFA anunció oficialmente nuevas sedes que formarán parte del
                mundial, expandiendo la lista de ciudades anfitrionas y
                aumentando la capacidad para recibir a millones de aficionados.
              </p>
            </div>
          </div>

          <div className="noticia-card">
            <img src="/IMG/info2.jpg" alt="Noticia 2" />
            <div className="noticia-info">
              <h3>La FIFA revela el balón oficial del torneo</h3>
              <p>
                El nuevo balón oficial del torneo ha sido presentado con un
                diseño innovador inspirado en la velocidad del juego moderno y
                la tecnología de seguimiento utilizada durante los partidos.
              </p>
            </div>
          </div>

          <div className="noticia-card">
            <img src="/IMG/info3.jpg" alt="Noticia 3" />
            <div className="noticia-info">
              <h3>Los estadios que recibirán la final</h3>
              <p>
                Se han confirmado los estadios que competirán por albergar la
                gran final del mundial, destacando instalaciones modernas y
                recintos históricos del fútbol internacional.
              </p>
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

export default Inicio;

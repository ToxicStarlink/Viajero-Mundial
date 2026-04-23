import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../CSS/inicio.css";

const Inicio = () => {
  // Simulador del $_SESSION de PHP. Cambia a true para ver "Mi perfil"
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Arreglo con las imágenes del estadio que van a rotar
  const heroImages = [
    "/IMG/Estadio1.jpg",
    "/IMG/Estadio2.jpg",
    "/IMG/Estadio3.jpg",
    "/IMG/Estadio4.jpg",
    "/IMG/Estadio5.jpg"
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
    }, 4000); // Cambia de imagen cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  const partidosDestacados = [
    {
      id: 1,
      dataPartido: "mexico-brasil",
      equipos: "Brasil vs Francia",
      lugar: "Ontario · Canadá",
      precio: "$120 USD",
      img: "/IMG/partido1.jpg",
    },
    {
      id: 2,
      dataPartido: "argentina-francia",
      equipos: "Uruguay vs Colombia",
      lugar: "Florida · USA",
      precio: "$150 USD",
      img: "/IMG/partido2.jpg",
    },
    {
      id: 3,
      dataPartido: "espana-alemania",
      equipos: "Argentina vs Alemania",
      lugar: "California · USA",
      precio: "$130 USD",
      img: "/IMG/partido3.jpg",
    },
  ];

  // Datos actualizados según el PHP
  const proximosPartidos = [
    {
      id: 4,
      equipos: "Argentina vs Suiza",
      fecha: "10 Julio",
      img: "/IMG/partido4.jpg",
    },
    {
      id: 5,
      equipos: "Brasil vs Inglaterra",
      fecha: "16 Julio",
      img: "/IMG/partido5.jpg",
    },
    {
      id: 6,
      equipos: "México vs Brasil",
      fecha: "12 Julio",
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

          {/* Condicional que reemplaza el bloque de sesión de PHP */}
          {isLoggedIn ? (
            <Link to="/perfil" className="login">Mi perfil</Link>
          ) : (
            <Link to="/login" className="login">Iniciar sesión</Link>
          )}
        </div>
      </header>

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
          {partidosDestacados.map((partido) => (
            <div className="card" data-partido={partido.dataPartido} key={partido.id}>
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

      <section className="proximos">
        <h2>Próximos partidos del mundial</h2>
        <div className="contenedor-proximos">
          {proximosPartidos.map((partido) => (
            // Se cambió "card" por "proximo-card" para que coincida con el CSS
            <div className="proximo-card" key={partido.id}>
              <img src={partido.img} alt={partido.equipos} />
              <div className="proximo-info">
                <h3>{partido.equipos}</h3>
                <p>{partido.fecha}</p>
              </div>
              {/* Tooltip agregado */}
              <div className="tooltip">La informacion no ha sido dada</div>
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
          
          {/* Imagen de la sección de beneficios agregada */}
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
                La FIFA anunció oficialmente nuevas sedes que formarán parte del mundial,
                expandiendo la lista de ciudades anfitrionas y aumentando la capacidad
                para recibir a millones de aficionados.
              </p>
            </div>
          </div>

          <div className="noticia-card">
            <img src="/IMG/info2.jpg" alt="Noticia 2" />
            <div className="noticia-info">
              <h3>La FIFA revela el balón oficial del torneo</h3>
              <p>
                El nuevo balón oficial del torneo ha sido presentado con un diseño
                innovador inspirado en la velocidad del juego moderno y la tecnología
                de seguimiento utilizada durante los partidos.
              </p>
            </div>
          </div>

          <div className="noticia-card">
            <img src="/IMG/info3.jpg" alt="Noticia 3" />
            <div className="noticia-info">
              <h3>Los estadios que recibirán la final</h3>
              <p>
                Se han confirmado los estadios que competirán por albergar la gran final
                del mundial, destacando instalaciones modernas y recintos históricos
                del fútbol internacional.
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
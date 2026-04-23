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
            <div class="beneficio">
              <h3>Compra segura</h3>

              <p>
                Nuestro sistema utiliza protocolos avanzados de seguridad
                digital y verificación de pagos, permitiendo que cada
                transacción sea protegida mediante tecnologías modernas de
                encriptación. Miles de aficionados ya confían en nuestra
                plataforma para adquirir sus entradas sin riesgos.
              </p>
            </div>

            <div class="beneficio">
              <h3>Boletos verificados</h3>

              <p>
                Cada boleto disponible en nuestra plataforma pasa por un proceso
                de validación para asegurar su autenticidad. Trabajamos con
                distribuidores confiables y proveedores autorizados para
                garantizar que los aficionados reciban entradas legítimas para
                cada partido del mundial.
              </p>
            </div>
            <div class="beneficio">
              <h3>Entrega digital inmediata</h3>

              <p>
                Una vez completada la compra, los boletos son enviados
                digitalmente de forma inmediata al correo electrónico del
                comprador. Esto permite acceder a los partidos sin retrasos y
                sin necesidad de recoger entradas físicas.
              </p>
            </div>
          </div>
        </div>
      </section>

<section class="noticias">

<h2>Noticias del mundial</h2>

<p class="subtitulo"></p>

<div class="contenedor-noticias">


<div class="noticia-card">

<img src="/IMG/info1.jpg"/>

<div class="noticia-info">

<h3>Se anuncian nuevas sedes para el Mundial 2030</h3>

<p>
La FIFA anunció oficialmente nuevas sedes que formarán parte del mundial,
expandiendo la lista de ciudades anfitrionas y aumentando la capacidad
para recibir a millones de aficionados.
</p>

</div>

</div>


<div class="noticia-card">

<img src="/IMG/info2.jpg"/>

<div class="noticia-info">

<h3>La FIFA revela el balón oficial del torneo</h3>

<p>
El nuevo balón oficial del torneo ha sido presentado con un diseño
innovador inspirado en la velocidad del juego moderno y la tecnología
de seguimiento utilizada durante los partidos.
</p>

</div>

</div>


<div class="noticia-card">
    
<img src="/IMG/info3.jpg"/>

<div class="noticia-info">

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

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../CSS/inicio.css";

const Perfil = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [historialCompras, setHistorialCompras] = useState([]);
  useEffect(() => {

    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navigate("/login");
      return;
    }
    const userObj = JSON.parse(usuarioGuardado);
    setUsuario(userObj);

    const obtenerHistorial = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/usuarios/${userObj.id_usuario}/boletos`,
        );
        setHistorialCompras(res.data);
      } catch (error) {
        console.error("Error al traer historial de compras:", error);
      }
    };
    obtenerHistorial();
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="inicio-container">
      <Navbar />

      <section className="perfil" style={{ minHeight: "60vh" }}>
        <h2>Mi Perfil</h2>
        <div className="perfil-datos">
          <h3>Datos Personales</h3>
          <p>
            <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
          </p>
          <p>
            <strong>Correo:</strong> {usuario.correo}
          </p>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 20px 0" }}>Historial de boletos</h3>
          <div className="contenedor-compras">
            {historialCompras.length > 0 ? (
              historialCompras.map((compra) => (
                <Link
                  to={`/boleto/${compra.id}`}
                  state={{ compra }}
                  key={compra.id || compra.asiento}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="compra-card">
                    <img
                      src={compra.img || "/IMG/info3.jpg"}
                      alt={compra.partido?.nombre || "Partido"}
                    />
                    <div className="compra-info">
                      <h3>{compra.partido?.nombre || "Partido"}</h3>
                      <p>
                        {compra.partido?.fecha
                          ? new Date(compra.partido.fecha).toLocaleDateString(
                              "es-MX",
                            )
                          : "Fecha no disponible"}
                      </p>
                      <p style={{ margin: "6px 0", color: "#333" }}>
                        Asiento: {compra.asiento}
                      </p>
                      <span>
                        {compra.precio ? `$${compra.precio} USD` : "Pagado"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No has comprado boletos aún.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Perfil;

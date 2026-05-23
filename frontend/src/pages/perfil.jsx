import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../CSS/inicio.css";

const Perfil = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [historialCompras, setHistorialCompras] = useState([]);

  // Estados para la edición de perfil
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraena: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {

    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navigate("/login");
      return;
    }
    const userObj = JSON.parse(usuarioGuardado);
    setUsuario(userObj);
    setFormData({
      nombre: userObj.nombre || "",
      apellido: userObj.apellido || "",
      correo: userObj.correo || "",
      contraena: "" 
    });

    const obtenerHistorial = async () => {
      try {
        const userId = userObj.id_usuario || userObj.id;
        const res = await axios.get(
          `http://localhost:3000/api/usuarios/${userId}/boletos`,
        );
        setHistorialCompras(res.data);
      } catch (error) {
        console.error("Error al traer historial de compras:", error);
      }
    };
    obtenerHistorial();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      
      // Identificar de forma segura el identificador
      const userId = usuario.id_usuario || usuario.id; 
      const res = await axios.put(`http://localhost:3000/api/usuarios/${userId}`, formData);
      const updatedUser = res.data.usuario;
      setUsuario(updatedUser);
      localStorage.setItem("usuario", JSON.stringify(updatedUser)); // Guardar cambios en la sesión local
      setIsEditing(false);
      setFormData({ ...formData, contraena: "" });
      alert("¡Perfil actualizado con éxito!");
    } catch (err) {
      console.error("Detalle del error frontend:", err);
      setError(err.response?.data?.error || "Error de red: No se pudo conectar con el servidor.");
    }
  };

  if (!usuario) return null;

  return (
    <div className="inicio-container">
      <Navbar />

      <section className="perfil" style={{ minHeight: "60vh" }}>
        <h2>Mi Perfil</h2>
        <div className="perfil-datos">
          <h3>Datos Personales</h3>
          
          {!isEditing ? (
            <>
              <p>
                <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
              </p>
              <p>
                <strong>Correo:</strong> {usuario.correo}
              </p>
              <button 
                onClick={() => setIsEditing(true)} 
                style={{ border: 'none', cursor: 'pointer', padding: '10px 20px', marginTop: '15px', background: '#00c853', color: 'white', borderRadius: '6px', fontWeight: 'bold' }}>
                Editar Perfil
              </button>
            </>
          ) : (
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '350px', margin: '15px 0' }}>
              {error && <p style={{ color: '#d63031', fontSize: '14px', background: '#ffcccc', padding: '8px', borderRadius: '4px' }}>{error}</p>}
              
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                placeholder="Nombre" 
                required 
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
              />
              <input 
                type="text" 
                name="apellido" 
                value={formData.apellido} 
                onChange={handleChange} 
                placeholder="Apellido" 
                required 
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
              />
              <input 
                type="email" 
                name="correo" 
                value={formData.correo} 
                onChange={handleChange} 
                placeholder="Correo electrónico" 
                required 
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
              />
              <input 
                type="password" 
                name="contraena" 
                value={formData.contraena} 
                onChange={handleChange} 
                placeholder="Nueva Contraseña (opcional)" 
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
              />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <button type="submit" style={{ border: 'none', cursor: 'pointer', padding: '10px', flex: 1, backgroundColor: '#00c853', color: 'white', borderRadius: '6px', fontWeight: 'bold' }}>
                  Guardar
                </button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ border: 'none', cursor: 'pointer', padding: '10px', flex: 1, backgroundColor: '#636e72', color: 'white', borderRadius: '6px', fontWeight: 'bold' }}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
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

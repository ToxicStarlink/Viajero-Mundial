import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/login.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
    password: "",
    confirmar: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redireccionar al usuario

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, apellido, usuario, correo, password, confirmar } = formData;

    if (!nombre || !apellido || !usuario || !correo || !password || !confirmar) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    console.log("Datos listos para enviar al backend:", formData);
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    
    navigate("/login");
  };

  return (
    <div className="login-page-wrapper">
      <div className="logo">
        <Link to="/">Viajero Mundial</Link>
      </div>

      <div className="login-container">
        <h2>Crear cuenta</h2>

        {error && (
          <div style={{ background: "#f8d7da", color: "#721c24", padding: "10px 14px", borderRadius: "6px", marginBottom: "16px", border: "1px solid #f5c6cb", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
          <input type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} required />
          <input type="email" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmar" placeholder="Confirmar contraseña" value={formData.confirmar} onChange={handleChange} required />

          <button type="submit">Registrarse</button>
        </form>

        <div className="register">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/login.css";

const Registro = () => {
  // Estado para manejar todos los campos del formulario al mismo tiempo
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
    password: "",
    confirmar: "",
  });
  
  // Estado para manejar los mensajes de error (igual que tu variable $error en PHP)
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redireccionar al usuario

  // Función que actualiza el estado cada vez que el usuario escribe algo
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, apellido, usuario, correo, password, confirmar } = formData;

    // 1. Validar campos vacíos
    if (!nombre || !apellido || !usuario || !correo || !password || !confirmar) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // 2. Validar contraseñas
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Si todo está bien, limpiamos el error y simulamos el registro
    setError("");
    console.log("Datos listos para enviar al backend:", formData);
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    
    // Redirigimos automáticamente a la página de login
    navigate("/login");
  };

  return (
    <div className="login-page-wrapper">
      <div className="logo">
        <Link to="/">Viajero Mundial</Link>
      </div>

      <div className="login-container">
        <h2>Crear cuenta</h2>

        {/* Renderizado condicional del error: Solo aparece si hay un error */}
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
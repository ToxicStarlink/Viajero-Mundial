import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "../CSS/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post("http://localhost:3000/api/login", {
        correo: formData.correo,
        contraena: formData.password,
      });

      console.log("Login exitoso:", res.data);

      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      window.location.href = "/";
      
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="logo">
        <Link to="/">Viajero Mundial</Link>
      </div>

      <div className="login-container">
        <h2>Inicio de sesión</h2>

        {error && (
          <div
            style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "16px",
              border: "1px solid #f5c6cb",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        <div className="register">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

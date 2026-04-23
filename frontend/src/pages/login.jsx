import React from "react";
import { Link } from "react-router-dom";

import "../CSS/login.css"; 

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    console.log("Simulando inicio de sesión...");
  };

  return (
    <div className="login-page-wrapper">
      <div className="logo">
        <Link to="/">Viajero Mundial</Link>
      </div>

      <div className="login-container">
        <h2>Inicio de sesión</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" name="correo" placeholder="Correo electrónico" required autoComplete="email" />
          <input type="password" name="password" placeholder="Contraseña" required autoComplete="current-password" />
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

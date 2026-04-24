import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Viajero Mundial</Link>
      </div>
      <div className="menu-derecha">
        <nav className="nav">
          <Link to="/partidos">Partidos</Link>
          <Link to="/guia">Guía Turística</Link>
        </nav>

        {isLoggedIn ? (
          <Link to="/perfil" className="login">Mi perfil</Link>
        ) : (
          <Link to="/login" className="login">Iniciar sesión</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
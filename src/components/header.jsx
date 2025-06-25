import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ userName }) {
  // Usamos rutas absolutas para assets en /public
  const logoSrc = "/assets/img/logo_llantify1.png";
  const logoArc = "/assets/img/default-avatar.png";
  const avatarSrc = logoArc; 

  return (
    <header className="ll-header">
      <nav className="ll-nav-container">
        {/* Logo principal */}
        <div className="ll-logo">
          <Link to="/">
            <img src={logoSrc} alt="Llantify Logo" className="ll-logo-img" />
          </Link>
        </div>

        {/* Menú de navegación */}
        <ul className="ll-nav-list">
          <li><a href="home_page.html">Home</a></li>
          <li><Link to="/rutas">Rutas</Link></li>
          <li><a href="user_calendar.html">Calendario</a></li>
          <li><Link to="/historial">Historial</Link></li>
            <li><a href="user_activity.html">Actividad</a></li>
          
        </ul>

        {/* Avatar de usuario (default) */}
        <div className="ll-user-container">
          {userName && <span className="ll-user-name">{userName}</span>}
          <img src={avatarSrc} alt="Avatar" className="ll-avatar" />
        </div>
      </nav>
    </header>
  );
}

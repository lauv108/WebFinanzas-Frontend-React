import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

/**
 * COMPONENTE NAVBAR
 * 
 * Proporciona navegación entre las diferentes secciones de la aplicación.
 * Utiliza React Router (Link) para navegación sin recargar la página.
 */

function Navbar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: '📊 Dashboard' },
    { path: '/transacciones', label: '💰 Transacciones' },
    { path: '/presupuesto', label: '🎯 Presupuesto' },
    { path: '/resumen', label: '📈 Resumen' },
    { path: '/exportacion', label: '⬇️ Exportar' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>💳 WebFinanzas</h1>
          <p>Tu dinero, tu control</p>
        </div>

        <ul className="navbar-menu">
          {menuItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

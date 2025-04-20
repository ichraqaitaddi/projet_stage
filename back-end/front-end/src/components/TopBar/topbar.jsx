import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './topbar.css';

const Topbar = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('userData');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div className="logo">
        <img src="path_to_logo.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        {isAdmin && <li><Link to="/dashboard">Tableau de bord</Link></li>}
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">À propos</Link></li>

        {!userData ? (
          <li><Link to="/login">Connexion</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="logout-btn">Déconnexion</button></li>
        )}
      </ul>
    </div>
  );
};

export default Topbar;
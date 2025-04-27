import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './topbar.css';
import carredorLogo from './carredor.png'; // ajuste l'extension si besoin


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
        
        <img src={carredorLogo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        {isAdmin && <li><Link to="/dashboard">Tableau de bord</Link></li>}
        <li><Link to="/villas">Nos services</Link></li>
        <li><Link to="/tirage">Tirage au sort</Link></li>
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
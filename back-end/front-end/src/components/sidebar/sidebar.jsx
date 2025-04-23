import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="user-info">
        <img
          src="https://via.placeholder.com/80"
          alt="avatar"
          className="avatar"
        />
        <p className="email">utilisateur@example.com</p>
      </div>

      <ul className="sidebar-links">
        <li><Link to="/users">Utilisateurs</Link></li>
        <li><Link to="/settings">Paramètres</Link></li>
      </ul>

      <div className="logout-link">
        <Link to="/login">Déconnexion</Link>
      </div>
    </div>
  );
};

export default Sidebar;
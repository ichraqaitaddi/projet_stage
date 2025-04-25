import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="user-info">
        <h2 className="dashboard-title">DASHBOARD</h2>
      </div>

      <ul className="sidebar-links">
        <li>
          <Link to="/users">
            <FaUser style={{ marginRight: '8px' }} />
            Utilisateurs
          </Link>
        </li>
        <li>
          <Link to="/villaCrud">
            <FaHome style={{ marginRight: '8px' }} />
            Villa
          </Link>
        </li>
      </ul>

      <div className="logout-link">
        <Link to="/login">
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Déconnexion
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
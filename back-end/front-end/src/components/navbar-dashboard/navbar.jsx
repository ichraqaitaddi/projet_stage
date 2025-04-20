import React from 'react';
import './navbar-dashboard.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">LOGO</h1>
      </div>
      <div className="navbar-right">
        <img
          src="src\assets\user.jpg"
          alt="user"
          className="user-image"
        />
        <span className="user-name">Anas</span>
      </div>
    </nav>
  );
};

export default Navbar;
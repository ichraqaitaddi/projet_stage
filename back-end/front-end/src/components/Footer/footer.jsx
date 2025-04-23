import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Carre Dor</h3>
        <p>Vente de villas de luxe au Maroc. Élégance, confort et exclusivité à votre portée.</p>
        <div className="footer-links">
          <a href="/">Accueil</a>
          <a href="/nos-services">Services</a>
          <a href="/contact">Contact</a>
          <a href="/about">Tirage au sort</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Carre Dor. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;

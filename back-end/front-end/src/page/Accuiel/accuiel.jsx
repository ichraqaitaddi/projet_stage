import React, { useEffect, useState } from 'react';
import './accueil.css';
import Topbar from '../../components/TopBar/topbar';
import Footer from '../../components/Footer/footer';

const villas = [
  { id: 1, image: '/images/villa4.jpg', alt: 'Villa1' },
  { id: 2, image: '/images/6.avif', alt: 'Villa2' },
  { id: 3, image: '/images/villa5.jpg', alt: 'Villa3' },
];

function Accueil() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % villas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="accueil-container">
      <Topbar/>
      <div className="slider">
        <img src={villas[current].image} alt={villas[current].alt} className="slider-image" />
      </div>

      <div className="presentation">
        <h2>Bienvenue chez Carre Dor</h2>
        <p>
          Carre Dor est un bureau de vente spécialisé dans les villas de luxe au Maroc.
          Notre mission est de vous offrir des propriétés prestigieuses qui allient confort, raffinement et exclusivité.
        </p>
      </div>

      <div className="services-container">
        <h3>Nos Services</h3>
        <div className="services">
          <div className="service-card">
            <img src="/images/villa5.jpg" alt="Villas sur mesure" className="service-image" />
            <h4>Villas sur mesure</h4>
            <p>Des villas adaptées à vos goûts et besoins.</p>
          </div>
          <div className="service-card">
            <img src="/images/consultation.jpg" alt="Consultation en immobilier" className="service-image" />
            <h4>Consultation en immobilier</h4>
            <p>Nos experts vous accompagnent dans vos choix.</p>
          </div>
          <div className="service-card">
            <img src="/images/tirage.jpeg" alt="Tirage au sort" className="service-image" />
            <h4>Tirage au sort</h4>
            <p>Participez à nos tirages pour gagner une villa.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Accueil;


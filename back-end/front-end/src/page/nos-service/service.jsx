import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './service.css';
import Topbar from '../../components/TopBar/topbar';
import Footer from '../../components/Footer/footer';

function Service() {
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/villas')
      .then(response => {
        setVillas(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des villas :', error);
      });
  }, []);

  return (
    
    <div className="services-container">
        <Topbar/>
      <h2>Nos Villas</h2>
      <div className="services">
        {villas.map(villa => (
          <div key={villa.id} className="service-card">
            <img src={`http://localhost:8000/images/${villa.image}`} alt={villa.titre} className="service-image" />
            <h4>{villa.titre}</h4>
            <p>{villa.description}</p>
            <p><strong>Prix:</strong> {villa.prix} MAD</p>
            <p><strong>Adresse:</strong> {villa.adresse}</p>
          </div>
        ))}
       
      </div>
      <Footer/>
    </div>
  );
}

export default Service;

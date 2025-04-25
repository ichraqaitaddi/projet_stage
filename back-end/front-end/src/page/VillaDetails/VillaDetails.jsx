import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Topbar from '../../components/TopBar/topbar';
import Footer from '../../components/Footer/footer';
import './villaDetails.css';

function VillaDetails() {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/villas/${id}`)
      .then(response => {
        setVilla(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la villa :', error);
      });
  }, [id]);

  if (!villa) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="villa-details-container">
      <Topbar />
      <div className="villa-details">
        <img src={`http://localhost:8000/images/${villa.image}`} alt={villa.titre} />
        <h2>{villa.titre}</h2>
        <p>{villa.description}</p>
        <p><strong>Prix:</strong> {villa.prix} MAD</p>
        <p><strong>Adresse:</strong> {villa.adresse}</p>
      </div>
      <Footer />
    </div>
  );
}

export default VillaDetails;

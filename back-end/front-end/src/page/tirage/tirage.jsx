import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/TopBar/topbar';
import Footer from '../../components/Footer/footer';
import './tirage.css';
import axios from 'axios';

function Tirage() {
  const [selectedPack, setSelectedPack] = useState(null);
  const [villa, setVilla] = useState(null); 
  const navigate = useNavigate();

  const packs = [
    { id: 1, nombre: 1, prix: 50 },
    { id: 2, nombre: 5, prix: 200 },
    { id: 3, nombre: 10, prix: 350 },
  ];

  useEffect(() => {
    async function fetchVilla() {
      try {
        const response = await axios.get('http://localhost:8000/api/villa-tirage');
        console.log('Villa data:', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setVilla(response.data[0]); // ناخدو غير أول فيلا
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la villa:', error);
      }
    }

    fetchVilla();
  }, []);

  const handleAchat = (pack) => {
    setSelectedPack(pack);
    alert(`Vous avez acheté ${pack.nombre} clé(s) pour ${pack.prix} MAD.`);
  };

  const redirectToAchatPage = (pack) => {
    navigate('/acheter-cle', { state: { pack } });
  };

  return (
    <div className="tirage-container">
      <Topbar />

      <section className="tirage-hero">
        <div className="tirage-hero-content">
          <div className="tirage-hero-images">
            <img src="/src/page/tirage/img/tirage.jpg" alt="Image 1" className="img-normal" />
            <img src="/src/page/tirage/img/tirage2.jpg" alt="Image 2" className="img-tilt-left" />
            <img src="/src/page/tirage/img/tirage3.jpg" alt="Image 3" className="img-tilt-right" />
          </div>
          <div className="tirage-hero-text">
            <h1>Participez et Gagnez!</h1>
            <p>
              Achetez vos clés pour participer à notre tirage au sort exceptionnel et tentez de gagner des villas de rêve au Maroc.
            </p>
            <button onClick={() => redirectToAchatPage(null)}>Acheter des clés</button>
          </div>
        </div>
      </section>

      {/* ✅ Villa Section */}
      {villa && (
        <section className="villa-section">
          <div className="villa-content">
            <img src={`http://localhost:8000/storage/${villa.image_url}.jpg`} alt="Villa à Gagner" className="villa-image" />
            <div className="villa-description">
              <h2>{villa.titre}</h2>
              <p>{villa.description}</p>
            </div>
          </div>
        </section>
      )}

      <section className="packs-section">
        <div className="packs-title">
          <h2>Achetez vos Clés</h2>
        </div>
        <div className="packs">
          {packs.map((pack) => (
            <div className="pack-card" key={pack.id}>
              <img src="/src/page/tirage/img/cle.webp" alt={`${pack.nombre} Clé`} className="pack-image" />
              <h3>{pack.nombre} Clé(s)</h3>
              <p>{pack.prix} MAD</p>
              <button onClick={() => redirectToAchatPage(pack)}>Acheter</button>
            </div>
          ))}
        </div>
      </section>

      <section className="winners-section">
        <div className="winners-title">
          <h2>Ils ont déjà gagné !</h2>
        </div>
        <div className="winners-cards">
          <div className="winner-card">
            <img src="/src/page/tirage/img/p1.jpg" alt="Gagnant 1" />
            <h3>Ahmed B.</h3>
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Merci Carre Dor ! Grâce à vous, j'ai ma villa de rêve."</p>
          </div>

          <div className="winner-card">
            <img src="/src/page/tirage/img/p3.jpg" alt="Gagnant 2" />
            <h3>Salma K.</h3>
            <div className="stars">⭐⭐⭐⭐☆</div>
            <p>"Expérience incroyable, je recommande à tout le monde !"</p>
          </div>

          <div className="winner-card">
            <img src="/src/page/tirage/img/p2.jpg" alt="Gagnant 3" />
            <h3>Youssef M.</h3>
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Un tirage au sort transparent et sérieux, 100% satisfait."</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Tirage;

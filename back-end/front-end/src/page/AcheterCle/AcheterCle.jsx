import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosUtilisateurs } from '../../api/axios';
import Topbar from '../../components/TopBar/topbar';
import Footer from '../../components/Footer/footer';
import './AcheterCle.css';

function AcheterCle() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pack } = location.state || {};

  const [nombreCles, setNombreCles] = useState(pack ? pack.nombre : 1);
  const [prix, setPrix] = useState(50); // السعر الافتراضي
  const [maxReached, setMaxReached] = useState(false); // تتبع إذا الزبون وصل للحد الأقصى
  const [clesRestants, setClesRestants] = useState(100); // عدد المفاتيح المتبقية في المخزون

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/login');
    } else {
      checkAvailableKeys();
      checkIfCanBuy(userData.user.id);
    }
  }, [navigate]);

  const checkAvailableKeys = async () => {
    try {
      const response = await axiosUtilisateurs.get('/api/check-available-keys');
      setClesRestants(response.data.remainingKeys);
    } catch (error) {
      console.error('Error fetching remaining keys:', error);
      alert('حدث خطأ أثناء التحقق من المفاتيح المتبقية');
    }
  };

  const checkIfCanBuy = async (userId) => {
    try {
      const response = await axiosUtilisateurs.post('/api/check-if-can-buy', { user_id: userId });
      if (response.data.error) {
        setMaxReached(true); // إذا وصل الزبون للحد الأقصى
      } else {
        setMaxReached(false);
      }
    } catch (error) {
      console.error('Error checking if user can buy:', error);
      alert('حدث خطأ أثناء التحقق');
    }
  };

  async function acheter() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const response = await axiosUtilisateurs.post('/api/achats', {
        user_id: userData.user.id,
        nombre_cles: nombreCles,
      }, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      });

      console.log('Achat réussi:', response.data);
      alert(`تم شراء ${nombreCles} مفتاح(مفاتيح) بنجاح`);
      setClesRestants(clesRestants - nombreCles); // تحديث عدد المفاتيح المتبقية
    } catch (error) {
      console.error('Erreur lors de l\'achat:', error);
      alert('خطأ أثناء شراء المفاتيح');
    }
  }

  return (
    <div className="acheter-cle-container">
      <Topbar />

      <div className="acheter-cle-content">
        <h1>شراء المفاتيح</h1>

        <div className="cle-details">
          <img src="src\\page\\AcheterCle\\img\\cle.webp" alt="Clé" className="cle-image" />
          <div className="cle-info">
            <h2>{nombreCles} Clé(s)</h2>
            <p className="cle-prix">السعر: {prix} MAD</p>
            <p className="cles-restants">المفاتيح المتبقية: {clesRestants}</p>
          </div>
        </div>

        {/* عدد المفاتيح - input قابل للتغيير */}
        <div className="input-nombre">
          <label htmlFor="nombreCles">عدد المفاتيح:</label>
          <input
            type="number"
            id="nombreCles"
            min="1"
            max={clesRestants} // الحد الأقصى للمفاتيح المتاحة
            value={nombreCles}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 1 && value <= clesRestants) {
                setNombreCles(value);
              }
            }}
            style={{ marginLeft: '10px', width: '60px', textAlign: 'center' }}
            disabled={maxReached || clesRestants === 0}
          />
        </div>

        <button onClick={acheter} className="acheter-button" disabled={clesRestants === 0 || maxReached}>
          شراء
        </button>
        
        {clesRestants === 0 && <p className="max-reached-message">تم نفاد المفاتيح.</p>}
      </div>

      <Footer />
    </div>
  );
}

export default AcheterCle;

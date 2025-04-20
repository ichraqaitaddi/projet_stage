import React from 'react';
import './accueil.css';

function Accueil() {
  return (
    <div className="accueil-container">
      
      {/* Bannière avec texte de bienvenue */}
      <div className="top-banner">
        <div className="banner-overlay">
          <h1 className="banner-title">مرحبا بكم في منصتنا العقارية</h1>
          <p className="banner-subtitle">نساعدكم في إيجاد أفضل الفرص العقارية بسهولة وأمان</p>
        </div>
        <img src="/images/banner.jpg" alt="Top Banner" />
      </div>

      {/* Section Hero */}
      <section className="hero-section">
        <h2>خدماتنا</h2>
        <p>نقترح عليكم بيع، شراء أو تأجير العقارات بكل احترافية.</p>
      </section>

      {/* Section Consultation */}
      <section className="consultation-section">
        <h2>استشارة مجانية</h2>
        <p>اتصل بنا اليوم للحصول على استشارة مجانية مع خبرائنا في العقارات.</p>
        <button className="consultation-btn">احجز موعدك الآن</button>
      </section>

      {/* Section Contact */}
      <section className="contact-section">
        <h2>تواصل معنا</h2>
        <p>فريقنا متاح للرد على جميع استفساراتكم.</p>
      </section>

    </div>
  );
}

export default Accueil;
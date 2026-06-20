import React from 'react';
import { Shield, Sparkles, Handshake, Landmark, Trophy, Users } from 'lucide-react';

export default function AboutUs({ setActivePage }) {
  const values = [
    { icon: Shield, title: "Uncompromising Integrity", desc: "We maintain complete transparency in ownership records, legal registrations, pricing structures, and developer histories." },
    { icon: Sparkles, title: "Design Synergy", desc: "Leveraging our interior design studio roots, we ensure every space is structurally and aesthetically compatible with modern luxury living." },
    { icon: Handshake, title: "Client First Partnering", desc: "Our premium relationships team manages end-to-end site coordinates, document drafting, negotiation, and keys handover." },
    { icon: Landmark, title: "Bengaluru Legacy", desc: "Deeply embedded in Bangalore's real estate fabric, specializing in key zones like HSR Layout, Koramangala, and Indiranagar." }
  ];

  return (
    <div className="about-container animate-fade-in">
      {/* 1. HEADER */}
      <section className="about-header">
        <div className="container">
          <span className="accent-label text-center">Bespoke Realty</span>
          <h1 className="text-center font-large text-white">About BlueCraft Properties</h1>
          <p className="about-header-desc text-center">
            Merging elite property curation with state-of-the-art interior design craftsmanship. 
          </p>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section className="story-section">
        <div className="container grid-2 align-center">
          <div className="story-text-box">
            <span className="accent-label">Our Story</span>
            <h2>Redefining Property Curation in Bengaluru</h2>
            <p className="story-para">
              Founded as an extension of the renowned **BlueCraft Design Studio**, BlueCraft Properties emerged from a simple customer need: finding premium properties that are structurally sound and visually customisable.
            </p>
            <p className="story-para">
              Traditional real estate searches often end with spaces that do not align with modern luxury aesthetics. By integrating architectural insight directly into our listing portal, we pre-vet properties to ensure they match elite living standards.
            </p>
            <p className="story-para">
              Today, we operate a premium full-service real estate desk in HSR Layout, managing property acquisitions, developer sales, site inspections, and customized turnkey interior handovers in Bengaluru's finest neighborhoods.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <Trophy className="text-primary mb-1" size={24} />
                <span className="stat-num">₹ 450+ Cr</span>
                <span className="stat-label">Properties Transacted</span>
              </div>
              <div className="stat-item">
                <Users className="text-primary mb-1" size={24} />
                <span className="stat-num">500+</span>
                <span className="stat-label">Premium Families Settled</span>
              </div>
            </div>
          </div>
          <div className="story-image-box">
            <img src="/images/flat_property.png" alt="Modern Building Architecture" className="story-img" />
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="values-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Pillars of Excellence</h2>
            <p className="section-subtitle">The principles that drive our property matchmaking process.</p>
          </div>

          <div className="values-grid grid-2">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="value-card glass-panel">
                  <div className="value-icon-box">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="value-content">
                    <h3 className="value-title">{v.title}</h3>
                    <p className="value-desc">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="cta-section">
        <div className="container glass-panel cta-box text-center">
          <h2>Ready to Explore Signature Properties?</h2>
          <p>Browse our curated portfolio of residential flats, modern villas, and commercial hubs.</p>
          <button className="btn-primary mt-2" onClick={() => setActivePage('properties')}>
            View Curated Listings
          </button>
        </div>
      </section>

      <style>{`
        .about-container {
          padding-top: 80px;
        }

        .about-header {
          position: relative;
          background-image: url('/images/hero_bg.png');
          background-size: cover;
          background-position: center;
          padding: 7rem 0 6rem 0;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .about-header::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95));
          z-index: 1;
        }

        .about-header .container {
          position: relative !important;
          z-index: 10 !important;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .about-header {
            padding: 4.5rem 1rem 3.5rem 1rem;
          }
          .font-large {
            font-size: 2.2rem !important;
          }
        }

        .font-large {
          font-size: 3rem;
        }

        .text-white {
          color: white;
        }

        .about-header-desc {
          font-size: 1.15rem;
          color: #94A3B8;
          max-width: 600px;
          margin: 1rem auto 0;
          line-height: 1.6;
        }

        .story-section {
          padding: 6rem 0;
          background-color: white;
        }

        .story-text-box {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .story-para {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.7;
        }

        .stats-row {
          display: flex;
          gap: 3rem;
          margin-top: 1rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .mb-1 {
          margin-bottom: 0.25rem;
        }

        .story-image-box {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          height: 480px;
        }

        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Values section */
        .values-section {
          padding: 6rem 0;
          background-color: var(--bg-main);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .values-grid {
          margin-top: 3rem;
        }

        .value-card {
          padding: 2rem;
          border-radius: var(--radius-md);
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          transition: transform 0.2s ease;
        }

        .value-card:hover {
          transform: translateY(-3px);
        }

        .value-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .value-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .value-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
        }

        .value-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #475569;
        }

        /* Call to action */
        .cta-section {
          padding: 6rem 0;
          background-color: white;
        }

        .cta-box {
          padding: 4rem 2rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .cta-box h2 {
          font-size: 2rem;
          color: #0F172A;
        }

        .cta-box p {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 500px;
        }
      `}</style>
    </div>
  );
}

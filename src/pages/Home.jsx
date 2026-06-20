import React, { useState } from 'react';
import { Search, MapPin, Building, ShieldCheck, Sparkles, Star, Users, Quote, Map } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    name: "Karthik & Yesswini",
    location: "Koramangala, Bengaluru",
    initials: "KY",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    quote: "They utilized our space so efficiently without making it feel cluttered."
  },
  {
    id: 2,
    name: "Shambhuprasad & Geethika",
    location: "HSR Layout, Bengaluru",
    initials: "SG",
    gradient: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
    quote: "Wonderful decision, amazing work delivered."
  },
  {
    id: 3,
    name: "Mohan & Jyothi",
    location: "Whitefield, Bengaluru",
    initials: "MJ",
    gradient: "linear-gradient(135deg, #10B981 0%, #047857 100%)",
    quote: "High-quality work and timely responses."
  },
  {
    id: 4,
    name: "Venki & Devi",
    location: "Indiranagar, Bengaluru",
    initials: "VD",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
    quote: "Great design options and smooth experience."
  },
  {
    id: 5,
    name: "Dhamodhar & Navaneetha",
    location: "Jayanagar, Bengaluru",
    initials: "DN",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    quote: "Wonderful decision, amazing work delivered."
  }
];

export default function Home({ setActivePage, setGlobalSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('All Cities');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setGlobalSearch({
      keyword: searchQuery,
      city: cityFilter === 'All Cities' ? '' : cityFilter
    });
    setActivePage('properties');
  };

  const handleServiceClick = (type) => {
    setGlobalSearch({
      keyword: '',
      city: '',
      typeFilter: type // 'Apartment', 'Villa', 'Commercial'
    });
    setActivePage('properties');
  };

  return (
    <div className="home-container animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="container hero-content-wrapper">
          <div className="hero-text-box">
            <span className="hero-subtitle animate-fade-in-up">Crafting Luxury Real Estate</span>
            <h1 className="hero-title animate-fade-in-up">Find Your Next Signature Space</h1>
            <p className="hero-desc animate-fade-in-up">
              Discover premium apartments, bespoke villas, and high-yielding commercial properties in Bengaluru's finest neighborhoods, curated with structural perfection and custom interiors.
            </p>
          </div>

          {/* Premium Hero Search Bar */}
          <form className="hero-search-bar glass-panel animate-fade-in-up" onSubmit={handleHeroSearch}>
            <div className="search-col city-select-col">
              <label className="search-label">Location</label>
              <select 
                className="search-select"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="All Cities">All Cities</option>
                <option value="Sarjapur">Sarjapur</option>
                <option value="Chandapura">Chandapura</option>
                <option value="HSR Layout">HSR Layout</option>
                <option value="Koramangala">Koramangala</option>
                <option value="Indiranagar">Indiranagar</option>
                <option value="Whitefield">Whitefield</option>
              </select>
            </div>
            
            <div className="search-col input-col">
              <label className="search-label">Search</label>
              <input
                type="text"
                placeholder="Search for locality, landmark, project..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button type="submit" className="hero-search-btn">
              <Search size={18} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="services-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">We provide comprehensive, high-end real estate solutions.</p>
          </div>

          <div className="services-grid grid-4">
            {/* Flat card */}
            <div className="service-card glass-panel">
              <div className="service-icon-box bg-blue">
                <Building size={28} className="text-primary" />
              </div>
              <h3 className="service-card-title">Buy a Flat</h3>
              <p className="service-card-desc">Find a luxury flat that fits your lifestyle, budget, and connectivity requirements in Bengaluru.</p>
              <button className="service-btn" onClick={() => handleServiceClick('Apartment')}>
                <span>FIND FLATS</span>
              </button>
            </div>

            {/* Villa card */}
            <div className="service-card glass-panel">
              <div className="service-icon-box bg-green">
                <Sparkles size={28} className="text-green" />
              </div>
              <h3 className="service-card-title">Buy a Villa</h3>
              <p className="service-card-desc">Explore our signature series of architectural villas featuring private pools, security, and smart features.</p>
              <button className="service-btn" onClick={() => handleServiceClick('Villa')}>
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Commercial card */}
            <div className="service-card glass-panel">
              <div className="service-icon-box bg-amber">
                <Building size={28} className="text-amber" />
              </div>
              <h3 className="service-card-title">Buy Commercial</h3>
              <p className="service-card-desc">Invest in grade-A commercial complexes, retail units, and office spaces with prime layout exposures.</p>
              <button className="service-btn" onClick={() => handleServiceClick('Commercial')}>
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Plot card */}
            <div className="service-card glass-panel">
              <div className="service-icon-box bg-purple">
                <Map size={28} className="text-purple" />
              </div>
              <h3 className="service-card-title">Buy a Plot</h3>
              <p className="service-card-desc">Secure premium plotted developments in high-growth corridors for custom homes or secure investment.</p>
              <button className="service-btn" onClick={() => handleServiceClick('Plots')}>
                <span>EXPLORE PLOTS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYNERGY SECTION (About & Architecture) */}
      <section className="synergy-section">
        <div className="container grid-2 align-center">
          <div className="synergy-image-box">
            <img src="/images/villa_property.png" alt="Luxury Villa Design" className="synergy-img" />
            <div className="synergy-badge glass-panel">
              <Sparkles size={22} className="text-accent" />
              <div>
                <strong>Bespoke Quality</strong>
                <span>Design Studio Backed</span>
              </div>
            </div>
          </div>
          <div className="synergy-text-box">
            <span className="accent-label">The BlueCraft Advantage</span>
            <h2 className="section-title">Where Fine Real Estate Meets Elite Architecture</h2>
            <p className="section-desc">
              BlueCraft Properties is not just an ordinary listing portal. In close partnership with **BlueCraft Design Studio**, we offer a unified turnkey solution. 
            </p>
            <p className="section-desc">
              Every property listed here can be customized with premium luxury interiors. Our design teams coordinate directly with project developers to ensure smooth turnkey execution.
            </p>
            <div className="advantage-list">
              <div className="advantage-item">
                <ShieldCheck className="text-primary" size={24} />
                <div>
                  <h4>Vetted Premium Listings</h4>
                  <p>Only verified modern properties in Bengaluru's high-demand zones are featured.</p>
                </div>
              </div>
              <div className="advantage-item">
                <Sparkles className="text-primary" size={24} />
                <div>
                  <h4>Interior Design Integrations</h4>
                  <p>Receive pre-consulted modular design blueprints by BlueCraft Design Studio.</p>
                </div>
              </div>
            </div>
            <button className="btn-primary" onClick={() => setActivePage('about')}>Learn More About Us</button>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM TESTIMONIALS SECTION */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="accent-label">Client Reviews</span>
            <h2 className="section-title">Synergy in Action: Client Voices</h2>
            <p className="section-subtitle">Real experiences from clients who completed turnkey interior handovers in partnership with BlueCraft Design Studio.</p>
          </div>

          <div className="testimonials-grid">
            {/* First 3 Testimonials */}
            {testimonialsData.slice(0, 3).map((item) => (
              <div key={item.id} className="premium-testimonial-card glass-panel animate-fade-in-up" style={{ animationDelay: `${item.id * 0.1}s` }}>
                <Quote className="quote-bg-icon" size={70} />
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />)}
                </div>
                <p className="testimonial-text">"{item.quote}"</p>
                <div className="testimonial-footer-row">
                  <div className="initials-avatar" style={{ background: item.gradient }}>
                    {item.initials}
                  </div>
                  <div className="author-meta">
                    <h5 className="author-name">{item.name}</h5>
                    <div className="author-loc">
                      <MapPin size={12} className="text-primary" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                <span className="client-badge">Turnkey Review</span>
              </div>
            ))}
            
            {/* Centered Remaining 2 Testimonials */}
            <div className="testimonial-row-2">
              {testimonialsData.slice(3, 5).map((item) => (
                <div key={item.id} className="premium-testimonial-card glass-panel animate-fade-in-up" style={{ animationDelay: `${item.id * 0.1}s` }}>
                  <Quote className="quote-bg-icon" size={70} />
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />)}
                  </div>
                  <p className="testimonial-text">"{item.quote}"</p>
                  <div className="testimonial-footer-row">
                    <div className="initials-avatar" style={{ background: item.gradient }}>
                      {item.initials}
                    </div>
                    <div className="author-meta">
                      <h5 className="author-name">{item.name}</h5>
                      <div className="author-loc">
                        <MapPin size={12} className="text-primary" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className="client-badge">Turnkey Review</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-container {
          padding-top: 80px; /* Offset fixed nav */
        }

        /* Hero styling */
        .hero-section {
          position: relative;
          height: 620px;
          background-image: url('/images/hero_bg.png');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 82, 186, 0.4) 100%);
          z-index: 1;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .hero-text-box {
          max-width: 700px;
        }

        .hero-subtitle {
          color: var(--accent);
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .hero-title {
          font-size: 3.5rem;
          color: white;
          line-height: 1.15;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }

        .hero-desc {
          font-size: 1.15rem;
          color: #E2E8F0;
          line-height: 1.6;
        }

        .hero-search-bar {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border-radius: var(--radius-lg);
          gap: 0.5rem;
          max-width: 900px;
        }

        @media (max-width: 640px) {
          .hero-search-bar {
            flex-direction: column;
            align-items: stretch;
            padding: 1.25rem;
            border-radius: var(--radius-md);
          }
        }

        .search-col {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 1rem;
          gap: 0.25rem;
        }

        .city-select-col {
          border-right: 1px solid var(--border-color);
          width: 200px;
        }

        .input-col {
          flex: 1;
        }

        @media (max-width: 640px) {
          .city-select-col {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            width: 100%;
          }
        }

        .search-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .search-select, .search-input {
          border: none;
          background: transparent;
          font-size: 0.95rem;
          font-weight: 600;
          outline: none;
          color: var(--text-dark);
          width: 100%;
        }

        .search-input::placeholder {
          color: #94A3B8;
        }

        .hero-search-btn {
          background-color: var(--primary);
          color: white;
          height: 56px;
          padding: 0 1.75rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(15, 82, 186, 0.2);
        }

        .hero-search-btn:hover {
          background-color: var(--primary-hover);
          transform: translateY(-1px);
        }

        /* Services section */
        .services-section {
          padding: 6rem 0;
          background-color: var(--bg-main);
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .text-center {
          text-align: center;
        }

        .section-title {
          font-size: 2.25rem;
          color: #0F172A;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .section-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
        }

        .service-card {
          padding: 3rem 2rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .service-icon-box {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .bg-blue { background-color: var(--primary-light); }
        .bg-green { background-color: #DEF7EC; }
        .bg-amber { background-color: #FEF3C7; }
        .bg-purple { background-color: #F3E8FF; }

        .text-green { color: #10B981; }
        .text-amber { color: #F59E0B; }
        .text-purple { color: #9333EA; }

        .service-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0F172A;
        }

        .service-card-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .service-btn {
          margin-top: 1rem;
          padding: 0.6rem 1.5rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--primary);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }

        .service-btn:hover {
          background-color: var(--primary);
          color: white;
        }

        /* Synergy Section */
        .synergy-section {
          padding: 6rem 0;
          background-color: white;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .align-center {
          align-items: center;
        }

        .synergy-image-box {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          height: 450px;
        }

        .synergy-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .synergy-badge {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          padding: 1rem 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .synergy-badge strong {
          display: block;
          font-size: 0.95rem;
          color: #0F172A;
        }

        .synergy-badge span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .synergy-text-box {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .accent-label {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary);
          letter-spacing: 0.1em;
        }

        .section-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #475569;
        }

        .advantage-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .advantage-item {
          display: flex;
          gap: 1rem;
        }

        .advantage-item h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 0.15rem;
        }

        .advantage-item p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        /* Testimonials */
        .testimonials-section {
          padding: 6rem 0;
          background-color: var(--bg-main);
          position: relative;
          overflow: hidden;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .testimonial-row-2 {
          grid-column: span 3;
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .testimonial-row-2 {
            grid-column: span 2;
            flex-direction: column;
            gap: 2rem;
            align-items: stretch;
          }
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .testimonial-row-2 {
            grid-column: span 1;
          }
        }

        .premium-testimonial-card {
          padding: 2.5rem 2rem 2.25rem 2rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.03);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .premium-testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 30px -4px rgba(15, 82, 186, 0.08);
          border-color: rgba(15, 82, 186, 0.3) !important;
        }

        .quote-bg-icon {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          color: var(--primary);
          opacity: 0.06;
          pointer-events: none;
          transition: transform 0.3s ease;
        }

        .premium-testimonial-card:hover .quote-bg-icon {
          transform: scale(1.1) rotate(-8deg);
          opacity: 0.1;
        }

        .stars-row {
          display: flex;
          gap: 0.2rem;
          margin-bottom: 0.25rem;
        }

        .testimonial-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #334155;
          font-weight: 500;
          position: relative;
          z-index: 2;
        }

        .testimonial-footer-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
          border-top: 1px dashed var(--border-color);
          padding-top: 1.25rem;
        }

        .initials-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.95rem;
          font-weight: 800;
          box-shadow: var(--shadow-sm);
        }

        .author-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .author-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0F172A;
        }

        .author-loc {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .author-loc svg {
          color: var(--primary);
        }

        .client-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748B;
          background-color: #F1F5F9;
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-sm);
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}

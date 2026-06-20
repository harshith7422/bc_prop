import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function ContactUs() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'Buy Property',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="contact-container animate-fade-in">
      {/* 1. HEADER */}
      <section className="contact-header">
        <div className="container">
          <span className="accent-label text-center">Get In Touch</span>
          <h1 className="text-center text-white">We'd Love to Hear From You</h1>
          <p className="contact-header-desc text-center">
            Whether looking to buy, list a property, or coordinate turnkey design solutions, our expert team in HSR Layout is ready to assist.
          </p>
        </div>
      </section>

      {/* 2. MAIN LAYOUT */}
      <section className="contact-body-section">
        <div className="container contact-grid">
          
          {/* CONTACT INFO (Left) */}
          <div className="contact-info-col">
            <h2 className="section-title">Office Headquarters</h2>
            <p className="col-desc">Drop by our main office in Sector 2, HSR Layout. We are open Monday to Saturday, 9:00 AM to 6:00 PM.</p>

            <div className="info-cards-stack">
              <div className="info-card glass-panel">
                <MapPin size={28} className="text-primary" />
                <div className="info-card-text">
                  <h4>Office Address</h4>
                  <p>Club Circle 754/1, 19th Main, 22nd Cross Rd, Sector 2, HSR Layout, Bengaluru, KA - 560102</p>
                </div>
              </div>

              <div className="info-card glass-panel">
                <Phone size={28} className="text-primary" />
                <div className="info-card-text">
                  <h4>Call Sales</h4>
                  <p><a href="tel:+919886933999">+91 98869 33999</a></p>
                  <p className="text-muted">Direct hotline for property inquiries</p>
                </div>
              </div>

              <div className="info-card glass-panel">
                <Mail size={28} className="text-primary" />
                <div className="info-card-text">
                  <h4>Email Inquiries</h4>
                  <p><a href="mailto:Sales@bluecraftproperties.com">Sales@bluecraftproperties.com</a></p>
                </div>
              </div>

              <div className="info-card glass-panel">
                <Clock size={28} className="text-primary" />
                <div className="info-card-text">
                  <h4>Business Hours</h4>
                  <p>Mon - Sat: 9:00 AM to 6:00 PM</p>
                  <p>Sunday: Closed (Available via email)</p>
                </div>
              </div>
            </div>

            {/* SVG Office Mini Map Layout */}
            <div className="office-mini-map glass-panel">
              <div className="map-badge">Office Blueprint Location</div>
              <svg viewBox="0 0 400 220" className="mini-map-svg">
                {/* Grid */}
                <defs>
                  <pattern id="mini-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mini-grid)" rx="8" />

                {/* Roads */}
                <path d="M 0 110 L 400 110" stroke="#E2E8F0" strokeWidth="24" strokeLinecap="round" />
                <path d="M 120 0 L 120 220" stroke="#E2E8F0" strokeWidth="20" strokeLinecap="round" />
                <path d="M 300 0 L 300 220" stroke="#E2E8F0" strokeWidth="16" strokeLinecap="round" />

                {/* Road Labels */}
                <text x="50" y="114" fill="#94A3B8" fontSize="8" fontWeight="600">19TH MAIN ROAD</text>
                <text x="114" y="40" fill="#94A3B8" fontSize="8" fontWeight="600" transform="rotate(90, 114, 40)">22ND CROSS RD</text>
                <text x="340" y="145" fill="#0F52BA" fontSize="9" fontWeight="700">HSR CLUB CIRCLE</text>

                {/* Circle intersection */}
                <circle cx="300" cy="110" r="28" fill="#CBD5E1" stroke="#E2E8F0" strokeWidth="4" />

                {/* Office Pin */}
                <g className="office-pin" style={{ transform: 'translate(140px, 90px)' }}>
                  <circle cx="0" cy="0" r="16" fill="#0F52BA" opacity="0.2" className="mini-ping" />
                  <path d="M 0 0 C -4 -4 -4 -10 0 -12 C 4 -10 4 -4 0 0 Z" fill="#0F52BA" stroke="white" strokeWidth="1" />
                  <circle cx="0" cy="-7" r="2" fill="white" />
                </g>

                <text x="140" y="72" fill="#0F52BA" fontSize="10" fontWeight="700" textAnchor="middle">
                  BlueCraft Properties HQ
                </text>
              </svg>
            </div>
          </div>

          {/* CONTACT FORM (Right) */}
          <div className="contact-form-col">
            <div className="form-card glass-panel">
              <h3 className="form-title">Send a Direct Message</h3>
              <p className="form-subtitle">Fill in the fields below, and our relations desk will reach out within 2 hours.</p>

              {formSubmitted ? (
                <div className="contact-success-screen animate-fade-in">
                  <CheckCircle size={56} className="success-icon" />
                  <h3>Message Dispatched!</h3>
                  <p>Thank you, <strong>{formData.name}</strong>. A service ticket has been created. A dedicated manager will contact you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> shortly.</p>
                  <button className="btn-primary mt-2" onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', phone: '', purpose: 'Buy Property', message: '' }); }}>
                    <span>Send Another Message</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="actual-contact-form">
                  <div className="form-input-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Purpose of Contact</label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Buy Property">I want to Buy a Property</option>
                      <option value="Sell Property">I want to List/Sell a Property</option>
                      <option value="Interior Design">I want Turnkey Interior Designs</option>
                      <option value="General Query">General Inquiry</option>
                    </select>
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Detailed Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Tell us about the property type, BHK preference, budget, or general requirements..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="form-input text-area"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <span>Submit Query</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .contact-container {
          padding-top: 80px;
        }

        .contact-header {
          position: relative;
          background-image: url('/images/villa_property.png');
          background-size: cover;
          background-position: center;
          padding: 7rem 0 6rem 0;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .contact-header::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95));
          z-index: 1;
        }

        .contact-header .container {
          position: relative !important;
          z-index: 10 !important;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .contact-header {
            padding: 4.5rem 1rem 3.5rem 1rem;
          }
        }

        .contact-header-desc {
          font-size: 1.15rem;
          color: #94A3B8;
          max-width: 600px;
          margin: 1rem auto 0;
          line-height: 1.6;
        }

        .contact-body-section {
          padding: 6rem 0;
          background-color: var(--bg-main);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .col-desc {
          margin-bottom: 2rem;
          font-size: 1.05rem;
          color: var(--text-muted);
        }

        .info-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .info-card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }

        .info-card-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .info-card-text h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F172A;
        }

        .info-card-text p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #475569;
        }

        .info-card-text a {
          font-weight: 700;
          color: var(--primary);
        }

        .info-card-text a:hover {
          color: var(--primary-hover);
        }

        .office-mini-map {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          padding: 0.5rem;
          background-color: white;
        }

        .map-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: rgba(15, 23, 42, 0.9);
          color: white;
          padding: 0.35rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          z-index: 5;
        }

        .mini-map-svg {
          width: 100%;
          height: auto;
          background-color: #F8FAFC;
          border-radius: var(--radius-sm);
        }

        .mini-ping {
          animation: mini-ping-anim 2s infinite;
          transform-origin: center;
        }

        @keyframes mini-ping-anim {
          0% { r: 6; opacity: 0.8; }
          100% { r: 18; opacity: 0; }
        }

        /* Form Card */
        .form-card {
          padding: 3rem 2rem;
          border-radius: var(--radius-lg);
        }

        @media (max-width: 640px) {
          .form-card {
            padding: 2rem 1.25rem;
          }
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 0.25rem;
        }

        .form-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .actual-contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #475569;
          letter-spacing: 0.05em;
        }

        .contact-success-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          padding: 3rem 1rem;
        }

        .contact-success-screen h3 {
          font-size: 1.6rem;
          color: #0F172A;
        }

        .contact-success-screen p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #475569;
          max-width: 360px;
        }
      `}</style>
    </div>
  );
}

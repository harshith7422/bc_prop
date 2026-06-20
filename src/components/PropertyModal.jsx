import React, { useState, useEffect } from 'react';
import { X, MapPin, Calculator, PhoneCall, Mail, User, Shield, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function PropertyModal({ property, onClose }) {
  // Lead form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: `Hi, I am interested in "${property.title}" listed for ${property.price}. Please share more details.` });

  // Gallery state
  const [activeImage, setActiveImage] = useState(property.image || (property.images && property.images[0]));

  useEffect(() => {
    setActiveImage(property.image || (property.images && property.images[0]));
    setFormData(prev => ({
      ...prev,
      message: `Hi, I am interested in "${property.title}" listed for ${property.price}. Please share more details.`
    }));
  }, [property]);

  // Mortgage Calculator states
  const parsePrice = (priceStr) => {
    // Helper to extract numeric value in lakhs/crores from string
    // e.g. "₹ 2.45 Cr" -> 2.45 Cr -> 24,500,000
    // "₹ 85 Lakh" -> 85 Lakh -> 8,500,000
    let numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (priceStr.toLowerCase().includes('cr')) {
      return numeric * 10000000;
    } else if (priceStr.toLowerCase().includes('lakh')) {
      return numeric * 100000;
    }
    return 10000000; // default 1 crore
  };

  const propertyValue = parsePrice(property.price);
  const [principal, setPrincipal] = useState(Math.round(propertyValue * 0.8)); // 80% loan default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenure, setTenure] = useState(20); // 20 years default
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Formula: EMI = [P x R x (1+R)^N]/[((1+R)^N)-1]
    const p = principal;
    const r = (interestRate / 12) / 100;
    const n = tenure * 12;

    if (r === 0) {
      setMonthlyPayment(Math.round(p / n));
      return;
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(Math.round(emi));
  }, [principal, interestRate, tenure]);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Auto close/reset alert in a bit
    }, 4000);
  };

  // Format currency helpers
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-container glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        
        {/* MODAL HEADER */}
        <div className="modal-header">
          <div className="header-info">
            <span className="modal-type-badge">{property.type}</span>
            <h2 className="modal-title">{property.title}</h2>
            <div className="modal-location">
              <MapPin size={16} className="text-primary" />
              <span>{property.location}</span>
            </div>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close details">
            <X size={24} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="modal-body">
          {/* LEFT COLUMN: Media & Info */}
          <div className="modal-left-col">
            <div className="modal-image-wrapper">
              <img src={activeImage} alt={property.title} className="modal-image" />
              <div className="modal-image-overlay">
                <span className="price-tag">{property.price}</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {property.images && property.images.length > 0 && (
              <div className="gallery-thumbnails">
                {property.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail-btn ${activeImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${property.title} View ${idx + 1}`} className="thumbnail-img" />
                  </button>
                ))}
              </div>
            )}

            {/* Property Description */}
            <div className="modal-details-section">
              <h3 className="section-title">Property Description</h3>
              <p className="property-desc">
                {property.description}
              </p>
            </div>

            {/* Premium Specifications */}
            <div className="modal-details-section">
              <h3 className="section-title">Premium Specifications</h3>
              <div className="specs-grid">
                <div className="spec-card">
                  <span className="spec-label">Configuration</span>
                  <span className="spec-val">{property.bhk ? `${property.bhk} BHK` : 'N/A'}</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Salable Area</span>
                  <span className="spec-val">{property.area} Sq Ft</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Developer</span>
                  <span className="spec-val">{property.developer || 'Quambiant Developers'}</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Project Scale</span>
                  <span className="spec-val">{property.scale}</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Launch Date</span>
                  <span className="spec-val">{property.launchDate}</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Est. Completion</span>
                  <span className="spec-val">{property.completionDate}</span>
                </div>
              </div>
            </div>

            {/* INVESTMENT PRICING ADVANTAGE */}
            <div className="modal-details-section pricing-advantage-section">
              <h3 className="section-title flex-align">
                <TrendingUp size={18} className="text-primary" />
                <span>Investor Pricing Model (2X Upside)</span>
              </h3>
              <div className="pricing-grid">
                <div className="pricing-card investment-price">
                  <span className="price-type-label">Current Investor Rate</span>
                  <span className="price-val-big">{property.investmentRate}</span>
                  <span className="price-desc-small">Early spot pricing (Capped capacity)</span>
                </div>
                <div className="pricing-card retail-price">
                  <span className="price-type-label">Projected Retail Launch</span>
                  <span className="price-val-big">{property.retailRate}</span>
                  <span className="price-desc-small">Sept 2026 launch valuation</span>
                </div>
              </div>
              <div className="pricing-bar-comparison">
                <div className="bar-label">
                  <span>~50% Direct Price Advantage Secured before Retail Launch</span>
                  <span className="upside-percentage">100% Growth (2X Upside)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill animate-bar-grow" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>

            {/* INCLUSIONS & EXCLUSIONS */}
            <div className="modal-details-section">
              <h3 className="section-title">Inclusions & Exclusions</h3>
              <div className="inc-exc-grid">
                <div className="checklist-card inclusions-card">
                  <h4 className="checklist-card-title text-success flex-align">
                    <CheckCircle size={16} />
                    <span>Included in Pricing</span>
                  </h4>
                  <ul className="checklist-list">
                    {(property.inclusions || []).map((item, idx) => (
                      <li key={idx} className="checklist-item">
                        <span className="bullet-dot bg-success"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="checklist-card exclusions-card">
                  <h4 className="checklist-card-title text-error flex-align">
                    <X size={16} />
                    <span>Excluded (Standard Charges)</span>
                  </h4>
                  <ul className="checklist-list">
                    {(property.exclusions || []).map((item, idx) => (
                      <li key={idx} className="checklist-item">
                        <span className="bullet-dot bg-error"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* INVESTMENT PROCESS STEPPER */}
            <div className="modal-details-section">
              <h3 className="section-title">Investment Process Timeline</h3>
              <div className="stepper-timeline">
                {(property.investmentProcess || []).map((stepInfo, idx) => (
                  <div key={idx} className="stepper-step animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                    <div className="step-badge-col">
                      <div className="step-badge">{idx + 1}</div>
                      {idx < property.investmentProcess.length - 1 && <div className="step-connector"></div>}
                    </div>
                    <div className="step-content-col">
                      <h4 className="step-title">{stepInfo.title}</h4>
                      <p className="step-desc">{stepInfo.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RETAIN VS RESELL STRATEGY */}
            <div className="modal-details-section">
              <h3 className="section-title">Investment Strategy: Retain vs Resell</h3>
              <div className="strategy-grid">
                <div className="strategy-card strategy-retain">
                  <h4 className="strategy-title-sub">Option A: Retaining</h4>
                  <ul className="strategy-list">
                    {(property.retainVsResell?.retaining || []).map((item, idx) => (
                      <li key={idx} className="strategy-item">
                        <span className="strategy-bullet">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="strategy-card strategy-resell">
                  <h4 className="strategy-title-sub">Option B: Reselling</h4>
                  <ul className="strategy-list">
                    {(property.retainVsResell?.reselling || []).map((item, idx) => (
                      <li key={idx} className="strategy-item">
                        <span className="strategy-bullet">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* EXIT ASSURANCE GUARANTEE */}
            {property.exitAssurance && property.exitAssurance.principalSecurity && (
              <div className="modal-details-section exit-assurance-section">
                <div className="exit-assurance-header">
                  <Shield size={24} className="text-gold" fill="rgba(212, 175, 55, 0.15)" />
                  <div>
                    <h3 className="section-title text-gold">Exit Assurance Guarantee</h3>
                    <p className="exit-subtitle">Premium Portfolio Downside Protection & High Liquidity Plan</p>
                  </div>
                </div>
                <div className="exit-assurance-grid">
                  <div className="exit-card">
                    <span className="exit-card-label">Principal Security</span>
                    <span className="exit-card-val">{property.exitAssurance?.principalSecurity}</span>
                  </div>
                  <div className="exit-card">
                    <span className="exit-card-label">Assured Return</span>
                    <span className="exit-card-val text-success">{property.exitAssurance?.assuredReturn}</span>
                  </div>
                  <div className="exit-card">
                    <span className="exit-card-label">Exit Window</span>
                    <span className="exit-card-val">{property.exitAssurance?.exitWindow}</span>
                  </div>
                  <div className="exit-card">
                    <span className="exit-card-label">Liquidity / Notice</span>
                    <span className="exit-card-val">{property.exitAssurance?.liquidity}</span>
                  </div>
                </div>
                <div className="exit-assurance-footer">
                  <div className="flex-align">
                    <Sparkles size={16} className="text-gold" />
                    <span><strong>Upside Clause:</strong> {property.exitAssurance?.upsideOption}</span>
                  </div>
                </div>
              </div>
            )}

            {/* WHY LOCATION CORRIDOR? */}
            <div className="modal-details-section">
              <h3 className="section-title">
                Why Invest in the {property.location.includes('Sarjapur') ? 'Sarjapur' : 'Chandapura-Anekal'} Corridor?
              </h3>
              <div className="sarjapur-bullets-grid">
                {(property.whyLocation || []).map((bullet, idx) => (
                  <div key={idx} className="sarjapur-bullet-item">
                    <CheckCircle size={16} className="text-primary-light" fill="rgba(var(--primary-rgb), 0.1)" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Widgets */}
          <div className="modal-right-col">
            {/* Lead Booking Form */}
            <div className="widget-card form-widget">
              <h3 className="widget-title">Contact Agent / Book Visit</h3>
              {formSubmitted ? (
                <div className="form-success-container animate-fade-in">
                  <CheckCircle size={48} className="success-icon" />
                  <h4>Inquiry Sent!</h4>
                  <p>Thank you, {formData.name}. Our premium relationship manager for {property.location.includes('Sarjapur') ? 'Sarjapur' : 'HSR Layout'} will call you shortly on your number {formData.phone} to coordinate the site visit.</p>
                  <button className="btn-primary mt-2" onClick={() => setFormSubmitted(false)}>Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="input-group">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="form-input has-icon"
                    />
                  </div>
                  <div className="input-group">
                    <Mail size={16} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="form-input has-icon"
                    />
                  </div>
                  <div className="input-group">
                    <PhoneCall size={16} className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="form-input has-icon"
                    />
                  </div>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleFormChange}
                    className="form-input text-area"
                    placeholder="Describe your requirement..."
                  ></textarea>

                  <button type="submit" className="btn-primary w-full">Request Site Visit</button>
                </form>
              )}
            </div>

            {/* Mortgage Calculator Widget */}
            <div className="widget-card calc-widget">
              <div className="calc-header">
                <Calculator size={18} className="text-primary" />
                <h3 className="widget-title">Home Loan Estimator</h3>
              </div>
              <div className="calc-body">
                <div className="calc-input-row">
                  <div className="calc-label-row">
                    <span>Loan Amount</span>
                    <span className="calc-value">{formatCurrency(principal)}</span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(propertyValue * 0.4)}
                    max={Math.round(propertyValue * 0.9)}
                    step={100000}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="range-bounds">
                    <span>Min (40%)</span>
                    <span>Max (90%)</span>
                  </div>
                </div>

                <div className="calc-input-row">
                  <div className="calc-label-row">
                    <span>Interest Rate</span>
                    <span className="calc-value">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="range-bounds">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div className="calc-input-row">
                  <div className="calc-label-row">
                    <span>Loan Tenure</span>
                    <span className="calc-value">{tenure} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="range-bounds">
                    <span>5 yrs</span>
                    <span>30 yrs</span>
                  </div>
                </div>

                <div className="calc-result">
                  <span className="emi-label">Estimated Monthly EMI</span>
                  <span className="emi-value">{formatCurrency(monthlyPayment)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 0.5rem;
          }
        }

        .modal-container {
          background-color: white;
          width: 100%;
          max-width: 1100px;
          border-radius: var(--radius-lg);
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-premium);
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .modal-container {
            max-height: 100vh;
            border-radius: 0;
          }
        }

        .modal-header {
          padding: 2rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          position: relative;
        }

        @media (max-width: 768px) {
          .modal-header {
            padding: 1.25rem;
          }
        }

        .header-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .modal-type-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary);
          letter-spacing: 0.05em;
        }

        .modal-title {
          font-size: 1.6rem;
          color: #0F172A;
          line-height: 1.2;
        }

        .modal-location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .btn-close {
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .btn-close:hover {
          background-color: #F1F5F9;
          color: var(--text-dark);
          transform: rotate(90deg);
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1.6fr 1.1fr;
          padding: 2rem;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .modal-body {
            grid-template-columns: 1fr;
            padding: 1.25rem;
            gap: 1.5rem;
          }
        }

        .modal-left-col, .modal-right-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .modal-image-wrapper {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 768px) {
          .modal-image-wrapper {
            height: 240px;
          }
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-image-overlay {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          z-index: 2;
        }

        .price-tag {
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
          background-color: var(--primary);
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-lg);
          border: 2px solid white;
        }

        .modal-details-section {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
        }

        .modal-details-section:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .property-desc {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.7;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .spec-card {
          padding: 1rem;
          background-color: #F8FAFC;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .spec-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .spec-val {
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
        }

        .craft-note-card {
          padding: 1.25rem;
          background-color: var(--accent-light);
          border-left: 4px solid var(--accent);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #0369A1;
        }

        .amenities-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #475569;
        }

        .widget-card {
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .widget-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 1.25rem;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
        }

        .form-input.has-icon {
          padding-left: 2.75rem;
        }

        .text-area {
          resize: none;
        }

        .w-full {
          width: 100%;
        }

        .mt-2 {
          margin-top: 1rem;
        }

        .form-success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          padding: 1rem 0;
        }

        .success-icon {
          color: #10B981;
        }

        .form-success-container h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0F172A;
        }

        .form-success-container p {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .calc-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .calc-header .widget-title {
          margin-bottom: 0;
        }

        .calc-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .calc-input-row {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .calc-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
        }

        .calc-value {
          color: var(--primary);
          font-weight: 700;
        }

        .calc-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: var(--radius-full);
          background: #E2E8F0;
          outline: none;
        }

        .calc-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: var(--shadow-sm);
          transition: transform 0.1s ease;
        }

        .calc-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .range-bounds {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .calc-result {
          background-color: var(--primary-light);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
          margin-top: 0.5rem;
        }

        .emi-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
        }

        .emi-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        /* GALLERY THUMBNAILS */
        .gallery-thumbnails {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .thumbnail-btn {
          width: 80px;
          height: 60px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid transparent;
          opacity: 0.6;
          transition: all 0.2s ease;
          padding: 0;
          cursor: pointer;
        }

        .thumbnail-btn:hover {
          opacity: 0.9;
        }

        .thumbnail-btn.active {
          border-color: var(--primary);
          opacity: 1;
          box-shadow: var(--shadow-sm);
        }

        .thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* PRICING ADVANTAGE */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
        }

        .pricing-card {
          padding: 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          border: 1px solid var(--border-color);
        }

        .investment-price {
          background-color: var(--primary-light);
          border-color: rgba(var(--primary-rgb), 0.15);
        }

        .retail-price {
          background-color: #F8FAFC;
        }

        .price-type-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-val-big {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        .investment-price .price-val-big {
          color: #0F172A;
        }

        .price-desc-small {
          font-size: 0.75rem;
          color: #64748B;
        }

        .pricing-bar-comparison {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
        }

        .upside-percentage {
          color: #10B981;
          font-weight: 700;
        }

        .bar-track {
          width: 100%;
          height: 8px;
          background-color: #E2E8F0;
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, #10B981 100%);
          border-radius: var(--radius-full);
        }

        /* INCLUSIONS & EXCLUSIONS */
        .inc-exc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .inc-exc-grid {
            grid-template-columns: 1fr;
          }
        }

        .checklist-card {
          padding: 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: #FAFAFA;
        }

        .checklist-card-title {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .text-success {
          color: #10B981;
        }

        .text-error {
          color: #EF4444;
        }

        .checklist-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.4;
        }

        .bullet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 0.4rem;
          flex-shrink: 0;
        }

        .bg-success { background-color: #10B981; }
        .bg-error { background-color: #EF4444; }

        /* STEPPER TIMELINE */
        .stepper-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
        }

        .stepper-step {
          display: flex;
          gap: 1rem;
        }

        .step-badge-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .step-connector {
          width: 2px;
          flex: 1;
          background-color: #E2E8F0;
          margin: 0.5rem 0;
        }

        .step-content-col {
          padding-bottom: 0.75rem;
        }

        .step-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 0.25rem;
        }

        .step-desc {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.5;
        }

        /* STRATEGY */
        .strategy-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .strategy-grid {
            grid-template-columns: 1fr;
          }
        }

        .strategy-card {
          padding: 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .strategy-retain {
          background-color: #F8FAFC;
          border-left: 4px solid var(--primary);
        }

        .strategy-resell {
          background-color: #F8FAFC;
          border-left: 4px solid #10B981;
        }

        .strategy-title-sub {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 0.75rem;
        }

        .strategy-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .strategy-item {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.5;
          display: flex;
          gap: 0.4rem;
        }

        .strategy-bullet {
          color: var(--primary);
          font-weight: 700;
        }

        .strategy-resell .strategy-bullet {
          color: #10B981;
        }

        /* EXIT ASSURANCE GUARANTEE */
        .exit-assurance-section {
          background: linear-gradient(135deg, #FFFDF5 0%, #FFF9E6 100%);
          border: 1px solid #F1E3B0 !important;
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .exit-assurance-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .text-gold {
          color: #D4AF37;
        }

        .exit-subtitle {
          font-size: 0.75rem;
          color: #8A7320;
          font-weight: 600;
          margin-top: 0.15rem;
        }

        .exit-assurance-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .exit-assurance-grid {
            grid-template-columns: 1fr;
          }
        }

        .exit-card {
          background-color: white;
          padding: 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid #F6ECD2;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .exit-card-label {
          font-size: 0.7rem;
          color: #8A7320;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .exit-card-val {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
        }

        .exit-assurance-footer {
          border-top: 1px dashed #F1E3B0;
          padding-top: 1rem;
          font-size: 0.85rem;
          color: #78631A;
          line-height: 1.5;
        }

        /* WHY SARJAPUR BULLETS */
        .sarjapur-bullets-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sarjapur-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.5;
        }

        .sarjapur-bullet-item svg {
          margin-top: 0.15rem;
          flex-shrink: 0;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}

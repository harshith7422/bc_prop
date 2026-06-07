import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Logo & About */}
          <div className="footer-col brand-col">
            <div className="footer-logo" onClick={() => handleNavClick('home')}>
              <svg viewBox="0 0 100 100" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 12L15 42H28V85H72V42H85L50 12Z" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M38 52C42 48 48 48 52 52L62 62C66 66 72 66 75 62" stroke="#00A8E8" strokeWidth="6" strokeLinecap="round" />
                <circle cx="50" cy="70" r="6" fill="#00A8E8" />
              </svg>
              <span className="logo-title">BlueCraft Properties</span>
            </div>
            <p className="brand-desc">
              BlueCraft Properties is a premium real estate portal, offering bespoke residential flats, signature villas, and high-value commercial properties. Leveraging the premium craftsmanship of BlueCraft Design Studio, we deliver comprehensive turnkey realty and design solutions.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/bluecraftdesignstudio/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/blue_craft_design_studio/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://x.com/BlueCraft9999" target="_blank" rel="noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/blue-craft-design-studio/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNavClick('home')}>Home Page</button></li>
              <li><button onClick={() => handleNavClick('properties')}>Browse Properties</button></li>
              <li><button onClick={() => handleNavClick('about')}>About BlueCraft</button></li>
              <li><button onClick={() => handleNavClick('contact')}>Contact Us</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Details</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={22} className="text-primary-light" />
                <span>
                  Club Circle 754/1, 19th Main,<br />
                  22nd Cross Rd, Sector 2, HSR Layout,<br />
                  Bengaluru, Karnataka - 560102
                </span>
              </li>
              <li>
                <Phone size={18} className="text-primary-light" />
                <a href="tel:+919886933999">+91 98869 33999</a>
              </li>
              <li>
                <Mail size={18} className="text-primary-light" />
                <a href="mailto:Sales@bluecraftproperties.com">Sales@bluecraftproperties.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4 className="footer-heading">Stay Updated</h4>
            <p className="newsletter-text">Subscribe to our newsletter for exclusive property listings and modern home design tips.</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Newsletter!'); e.target.reset(); }}>
              <input type="email" placeholder="Your Email Address" className="newsletter-input" required />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BlueCraft Properties. All rights reserved. | Developed in coordination with BlueCraft Design Studio.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--dark-bg);
          color: #94A3B8;
          padding: 5rem 0 2rem;
          border-top: 4px solid var(--primary);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .brand-col {
          gap: 1.5rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .logo-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.01em;
        }

        .brand-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #94A3B8;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          color: white;
          transition: all 0.2s ease;
        }

        .social-links a:hover {
          background-color: var(--primary);
          transform: translateY(-3px);
        }

        .footer-heading {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background-color: var(--accent);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links button {
          color: #94A3B8;
          font-size: 0.95rem;
          text-align: left;
          transition: color 0.2s ease;
        }

        .footer-links button:hover {
          color: white;
          transform: translateX(3px);
        }

        .contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-list li {
          display: flex;
          gap: 0.75rem;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .contact-list a {
          color: #94A3B8;
          transition: color 0.2s ease;
        }

        .contact-list a:hover {
          color: white;
        }

        .text-primary-light {
          color: var(--accent);
          flex-shrink: 0;
        }

        .newsletter-text {
          font-size: 0.9rem;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .newsletter-input {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          outline: none;
          font-size: 0.9rem;
        }

        .newsletter-input:focus {
          border-color: var(--accent);
        }

        .newsletter-btn {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background-color: var(--primary);
          color: white;
          font-weight: 600;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(15, 82, 186, 0.2);
        }

        .newsletter-btn:hover {
          background-color: var(--primary-hover);
        }

        .footer-bottom {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 0.85rem;
        }
      `}</style>
    </footer>
  );
}

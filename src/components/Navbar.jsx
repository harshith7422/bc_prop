import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Building2, BookOpen, Mail } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'about', label: 'About Us', icon: BookOpen },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  const handleLinkClick = (id) => {
    setActivePage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-logo" onClick={() => handleLinkClick('home')}>
          <div className="logo-icon">
            <img src="/logo.png" alt="BlueCraft Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <div className="logo-text">
            <span className="brand-blue">BlueCraft</span>
            <span className="brand-gray">Properties</span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="nav-menu">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                className={`nav-item ${activePage === link.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(link.id)}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </button>
            );
          })}

        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="mobile-toggle">
          <button className="btn-menu" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="drawer-content">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  className={`drawer-item ${activePage === link.id ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.id)}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Styling specific to navbar */}
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 1000;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          transition: height 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .navbar-scrolled {
          height: 70px;
          box-shadow: var(--shadow-md);
          background-color: #ffffff;
        }

        @media (max-width: 768px) {
          .navbar {
            background-color: #ffffff;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        }

        .navbar-container {
          max-width: var(--max-width);
          height: 100%;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 1.25rem;
          }
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          display: flex;
          gap: 0.25rem;
          letter-spacing: -0.02em;
        }

        .brand-blue {
          color: var(--primary);
        }

        .brand-gray {
          color: var(--text-dark);
          font-weight: 500;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .nav-item.active {
          color: white;
          background-color: var(--primary);
        }

        .mobile-toggle {
          display: none;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex;
          }
        }

        .btn-menu {
          color: var(--text-dark);
          padding: 0.5rem;
          background: #f1f5f9;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .btn-menu:hover {
          background: #e2e8f0;
        }

        .mobile-drawer {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ffffff;
          z-index: 999;
          border-top: 1px solid var(--border-color);
          overflow-y: auto;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .navbar-scrolled + .mobile-drawer {
          top: 70px;
        }

        .drawer-content {
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          gap: 1rem;
        }

        .drawer-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-dark);
          text-align: left;
          background-color: #f8fafc;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .drawer-item:hover {
          background-color: #f1f5f9;
          border-color: #e2e8f0;
        }

        .drawer-item.active {
          color: white;
          background-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
      `}</style>
    </nav>
  );
}

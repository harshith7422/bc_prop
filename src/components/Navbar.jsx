import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Building2, BookOpen, Mail, Heart } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, favoritesCount, onOpenFavorites }) {
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
            <svg viewBox="0 0 100 100" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 12L15 42H28V85H72V42H85L50 12Z" stroke="#0F52BA" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M38 52C42 48 48 48 52 52L62 62C66 66 72 66 75 62" stroke="#00A8E8" strokeWidth="6" strokeLinecap="round" />
              <circle cx="50" cy="70" r="6" fill="#0F52BA" />
            </svg>
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

          {/* Favorites Badge */}
          <button className="nav-favorites-btn" onClick={onOpenFavorites} aria-label="View Favorites">
            <Heart size={20} className={favoritesCount > 0 ? 'fill-red text-red animate-pulse-like' : ''} />
            {favoritesCount > 0 && <span className="favorites-badge">{favoritesCount}</span>}
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="mobile-toggle">
          <button className="nav-favorites-btn mr-2" onClick={onOpenFavorites} aria-label="View Favorites">
            <Heart size={20} className={favoritesCount > 0 ? 'fill-red text-red' : ''} />
            {favoritesCount > 0 && <span className="favorites-badge">{favoritesCount}</span>}
          </button>
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
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .navbar-scrolled {
          height: 70px;
          box-shadow: var(--shadow-md);
          background-color: rgba(255, 255, 255, 0.95);
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
            padding: 0 1rem;
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

        .nav-favorites-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
          color: var(--text-dark);
        }

        .nav-favorites-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #EF4444;
        }

        .favorites-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: #EF4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          min-width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .fill-red {
          fill: #EF4444;
        }

        .text-red {
          color: #EF4444;
        }

        .animate-pulse-like {
          animation: pulse-subtle 1.5s infinite;
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
          padding: 0.25rem;
        }

        .mobile-drawer {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          z-index: 999;
          border-top: 1px solid var(--border-color);
        }

        .navbar-scrolled + .mobile-drawer {
          top: 70px;
        }

        .drawer-content {
          display: flex;
          flex-direction: column;
          padding: 2rem 1rem;
          gap: 1rem;
        }

        .drawer-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-dark);
          text-align: left;
        }

        .drawer-item:hover {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .drawer-item.active {
          color: white;
          background-color: var(--primary);
        }

        .mr-2 {
          margin-right: 0.5rem;
        }
      `}</style>
    </nav>
  );
}

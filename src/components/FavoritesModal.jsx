import React from 'react';
import { X, Trash2, Heart, ArrowRight } from 'lucide-react';
import { propertiesData } from '../data/properties';

export default function FavoritesModal({ isOpen, onClose, favorites, onToggleFavorite, onSelectProperty }) {
  if (!isOpen) return null;

  // Filter properties in favorites list
  const favoritedProperties = propertiesData.filter(p => favorites.includes(p.id));

  return (
    <div className="fav-overlay animate-fade-in" onClick={onClose}>
      <div className="fav-drawer glass-panel" onClick={e => e.stopPropagation()}>
        <div className="fav-header">
          <div className="fav-title-row">
            <Heart size={20} fill="#EF4444" stroke="#EF4444" className="animate-pulse-like" />
            <h3>Saved Properties</h3>
            <span className="fav-count">({favoritedProperties.length})</span>
          </div>
          <button className="btn-close-fav" onClick={onClose} aria-label="Close saved properties">
            <X size={22} />
          </button>
        </div>

        <div className="fav-body">
          {favoritedProperties.length === 0 ? (
            <div className="fav-empty-state">
              <Heart size={40} className="text-muted mb-1" />
              <h4>No Properties Saved Yet</h4>
              <p>Click the heart icon on any property card to save it here for quick review.</p>
            </div>
          ) : (
            <div className="fav-list">
              {favoritedProperties.map((prop) => (
                <div key={prop.id} className="fav-item glass-panel">
                  <img src={prop.image} alt={prop.title} className="fav-item-img" />
                  <div className="fav-item-details">
                    <span className="fav-item-type">{prop.type}</span>
                    <h4 className="fav-item-title" onClick={() => { onSelectProperty(prop); onClose(); }}>
                      {prop.title}
                    </h4>
                    <span className="fav-item-price">{prop.price}</span>
                    <div className="fav-item-actions">
                      <button className="btn-view-fav" onClick={() => { onSelectProperty(prop); onClose(); }}>
                        <span>Open Details</span>
                        <ArrowRight size={12} />
                      </button>
                      <button className="btn-delete-fav" onClick={() => onToggleFavorite(prop.id)} title="Remove Saved Property">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .fav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1080;
          display: flex;
          justify-content: flex-end;
        }

        .fav-drawer {
          background-color: white;
          width: 100%;
          max-width: 400px;
          height: 100vh;
          box-shadow: var(--shadow-premium);
          display: flex;
          flex-direction: column;
          animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .fav-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .fav-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .fav-title-row h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0F172A;
        }

        .fav-count {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .btn-close-fav {
          color: var(--text-muted);
          padding: 0.25rem;
          border-radius: 50%;
        }

        .btn-close-fav:hover {
          background-color: #F1F5F9;
          color: var(--text-dark);
        }

        .fav-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .fav-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          padding-top: 5rem;
        }

        .fav-empty-state h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0F172A;
        }

        .fav-empty-state p {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-muted);
          max-width: 250px;
        }

        .fav-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .fav-item {
          padding: 0.5rem;
          border-radius: var(--radius-md);
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .fav-item-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: var(--radius-sm);
        }

        .fav-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
        }

        .fav-item-type {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary);
        }

        .fav-item-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .fav-item-title:hover {
          color: var(--primary);
        }

        .fav-item-price {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1F2937;
        }

        .fav-item-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.25rem;
        }

        .btn-view-fav {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .btn-view-fav:hover {
          color: var(--primary-hover);
        }

        .btn-delete-fav {
          color: var(--text-muted);
          padding: 0.25rem;
          border-radius: 4px;
        }

        .btn-delete-fav:hover {
          color: #EF4444;
          background-color: #FEE2E2;
        }

        .mb-1 {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import { Heart, MapPin, BedDouble, Expand, ArrowRight } from 'lucide-react';

export default function PropertyCard({ property, onSelect, isFavorite, onToggleFavorite }) {
  // Determine badge type
  const getBadgeClass = (status) => {
    if (status.toLowerCase().includes('ready')) return 'badge-ready';
    if (status.toLowerCase().includes('construction')) return 'badge-construction';
    return 'badge-plots';
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  return (
    <div className="property-card glass-panel animate-fade-in-up" onClick={() => onSelect(property)}>
      <div className="property-image-container">
        <img src={property.image} alt={property.title} className="property-card-image" />
        <span className={`badge property-badge ${getBadgeClass(property.status)}`}>
          {property.status}
        </span>
        <button
          className={`property-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          <Heart size={18} fill={isFavorite ? '#EF4444' : 'none'} stroke={isFavorite ? '#EF4444' : 'white'} />
        </button>
      </div>

      <div className="property-card-content">
        <div className="property-card-type-row">
          <span className="property-card-type">{property.type}</span>
          <span className="property-card-bhk">{property.bhk ? `${property.bhk} BHK` : 'Commercial'}</span>
        </div>

        <h3 className="property-card-title">{property.title}</h3>

        <div className="property-card-location">
          <MapPin size={14} className="text-primary" />
          <span>{property.location}</span>
        </div>

        <div className="property-card-features">
          <div className="feature-item">
            <BedDouble size={16} />
            <span>{property.bhk ? `${property.bhk} Beds` : 'N/A'}</span>
          </div>
          <div className="feature-item">
            <Expand size={16} />
            <span>{property.area} Sq Ft</span>
          </div>
        </div>

        <div className="property-card-footer">
          <div className="property-price-container">
            <span className="price-label">Price Range</span>
            <span className="property-price">{property.price}</span>
          </div>
          <button className="property-action-btn" onClick={(e) => { e.stopPropagation(); onSelect(property); }}>
            <span>Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .property-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .property-image-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .property-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .property-card:hover .property-card-image {
          transform: scale(1.08);
        }

        .property-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
          box-shadow: var(--shadow-sm);
        }

        .property-fav-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
        }

        .property-fav-btn:hover {
          background-color: rgba(255, 255, 255, 0.9);
          transform: scale(1.1);
        }

        .property-fav-btn.active {
          background-color: white;
          border-color: #FEE2E2;
        }

        .property-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.75rem;
        }

        .property-card-type-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .property-card-type {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .property-card-bhk {
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #F1F5F9;
          color: #475569;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .property-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.3;
          /* Multi line truncate */
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .property-card-location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .property-card-features {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          border-top: 1px dashed var(--border-color);
          border-bottom: 1px dashed var(--border-color);
          padding: 0.75rem 0;
          margin: 0.25rem 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #475569;
        }

        .property-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .property-price-container {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .property-price {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--primary);
        }

        .property-action-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.4rem 0.8rem;
          background-color: var(--primary-light);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .property-action-btn:hover {
          background-color: var(--primary);
          color: white;
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}

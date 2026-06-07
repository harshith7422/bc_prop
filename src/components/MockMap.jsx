import React, { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Navigation, Home } from 'lucide-react';

export default function MockMap({ properties, onPropertySelect, selectedPropertyId }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredPin, setHoveredPin] = useState(null);

  // Map coordinate projections for major Bangalore areas to fit SVG viewBox (0 0 800 500)
  const areaCoordinates = {
    'HSR Layout': { x: 380, y: 340 },
    'Indiranagar': { x: 420, y: 180 },
    'Whitefield': { x: 680, y: 160 },
    'Koramangala': { x: 340, y: 280 },
    'Jayanagar': { x: 220, y: 320 },
    'Electronic City': { x: 480, y: 440 },
    'Hebbal': { x: 360, y: 80 },
    'MG Road': { x: 350, y: 200 },
    'Sarjapur': { x: 550, y: 360 },
    'Chandapura': { x: 440, y: 410 }
  };

  // Helper to map property to coordinate based on location keyword or random offset
  const getPropertyCoordinates = (prop) => {
    const defaultCoords = { x: 400, y: 250 };
    let base = null;
    
    for (const area in areaCoordinates) {
      if (prop.location.toLowerCase().includes(area.toLowerCase())) {
        base = areaCoordinates[area];
        break;
      }
    }
    
    if (!base) {
      // fallback based on name hashing to stay consistent
      const hash = prop.id * 12345;
      base = {
        x: 150 + (hash % 500),
        y: 100 + (hash % 300)
      };
    }
    
    // Add small consistent offset based on ID so pins don't overlap completely
    const offsetHashX = (prop.id * 31) % 40 - 20;
    const offsetHashY = (prop.id * 73) % 40 - 20;
    
    return {
      x: base.x + offsetHashX,
      y: base.y + offsetHashY
    };
  };

  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.25, 2));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
    }
  };

  return (
    <div className="mock-map-wrapper">
      {/* Map Control Bar */}
      <div className="map-controls">
        <div className="controls-group">
          <button className="control-btn" onClick={() => handleZoom('in')} title="Zoom In"><ZoomIn size={18} /></button>
          <button className="control-btn" onClick={() => handleZoom('out')} title="Zoom Out"><ZoomOut size={18} /></button>
        </div>
        <div className="map-legend">
          <div className="legend-item"><span className="legend-dot dot-flat"></span><span>Flat</span></div>
          <div className="legend-item"><span className="legend-dot dot-villa"></span><span>Villa</span></div>
          <div className="legend-item"><span className="legend-dot dot-commercial"></span><span>Commercial</span></div>
        </div>
        <div className="map-status">
          <Navigation size={14} className="text-accent animate-spin-slow" />
          <span>Live SVG Blueprint Map</span>
        </div>
      </div>

      {/* Main Map SVG Container */}
      <div className="svg-container">
        <svg
          viewBox="0 0 800 500"
          className="map-svg"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Grid lines background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Styled roads / arteries */}
          <g stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" opacity="0.6">
            {/* Outer Ring Road */}
            <path d="M 100 250 Q 200 450 400 450 T 700 250 Q 600 50 400 50 T 100 250 Z" fill="none" />
            {/* Major intersecting roads */}
            <line x1="400" y1="50" x2="400" y2="450" />
            <line x1="100" y1="250" x2="700" y2="250" strokeWidth="8" stroke="#E2E8F0" />
            <line x1="200" y1="100" x2="600" y2="400" />
          </g>

          {/* District Boundary Circles */}
          <g opacity="0.15" fill="none" stroke="#0F52BA" strokeWidth="2" strokeDasharray="5,5">
            {Object.entries(areaCoordinates).map(([name, coords]) => (
              <circle key={name} cx={coords.x} cy={coords.y} r="60" />
            ))}
          </g>

          {/* District Labels */}
          <g className="district-labels" fill="#64748B" fontSize="12" fontWeight="600" letterSpacing="0.05em">
            {Object.entries(areaCoordinates).map(([name, coords]) => (
              <text key={name} x={coords.x} y={coords.y - 12} textAnchor="middle">
                {name}
              </text>
            ))}
          </g>

          {/* Property Pins */}
          {properties.map((prop) => {
            const coords = getPropertyCoordinates(prop);
            const isSelected = selectedPropertyId === prop.id;
            const isHovered = hoveredPin === prop.id;
            
            // Pin Color scheme based on type
            let color = '#3B82F6'; // Flat / Apartment (Blue)
            if (prop.type.toLowerCase() === 'villa') color = '#10B981'; // Villa (Green)
            if (prop.type.toLowerCase().includes('commercial')) color = '#F59E0B'; // Commercial (Amber)
            if (prop.type.toLowerCase().includes('plot')) color = '#EC4899'; // Plot (Pink)

            return (
              <g
                key={prop.id}
                className={`map-pin-g ${isSelected ? 'selected' : ''}`}
                onClick={() => onPropertySelect(prop)}
                onMouseEnter={() => setHoveredPin(prop.id)}
                onMouseLeave={() => setHoveredPin(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Ping wave effect for selected or hovered pin */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="22"
                    fill={color}
                    opacity="0.3"
                    className="ping-circle"
                  />
                )}

                {/* Base shadow */}
                <ellipse cx={coords.x} cy={coords.y + 4} rx="6" ry="2" fill="black" opacity="0.2" />

                {/* Pin shape */}
                <path
                  d={`M ${coords.x} ${coords.y} 
                     C ${coords.x - 8} ${coords.y - 8} ${coords.x - 8} ${coords.y - 20} ${coords.x} ${coords.y - 24} 
                     C ${coords.x + 8} ${coords.y - 20} ${coords.x + 8} ${coords.y - 8} ${coords.x} ${coords.y} Z`}
                  fill={color}
                  stroke="white"
                  strokeWidth="1.5"
                  className="pin-path"
                />

                {/* Inner dot */}
                <circle cx={coords.x} cy={coords.y - 14} r="4.5" fill="white" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating property card popup on hover/select */}
      {properties.map((prop) => {
        const isSelected = selectedPropertyId === prop.id;
        const isHovered = hoveredPin === prop.id;
        if (!isSelected && !isHovered) return null;

        const coords = getPropertyCoordinates(prop);
        const mapWrapper = document.querySelector('.mock-map-wrapper');
        const mapWidth = mapWrapper ? mapWrapper.clientWidth : 800;
        
        // Calculate card percentage positioning to keep it responsive
        const leftPercent = (coords.x / 800) * 100;
        const topPercent = ((coords.y - 45) / 500) * 100;

        return (
          <div
            key={`popup-${prop.id}`}
            className={`map-popup-card glass-panel animate-fade-in-up ${isSelected ? 'active-popup' : ''}`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: 'translate(-50%, -100%) scale(1)'
            }}
            onClick={() => onPropertySelect(prop)}
          >
            <div className="popup-card-inner">
              <img src={prop.image} alt={prop.title} className="popup-card-img" />
              <div className="popup-card-details">
                <span className="popup-card-type">{prop.type}</span>
                <h5 className="popup-card-title">{prop.title}</h5>
                <span className="popup-card-price">{prop.price}</span>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .mock-map-wrapper {
          position: relative;
          width: 100%;
          height: 550px;
          background-color: #F8FAFC;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }

        .map-controls {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          pointer-events: none;
        }

        .controls-group {
          display: flex;
          gap: 0.5rem;
          pointer-events: auto;
        }

        .control-btn {
          background-color: white;
          color: var(--text-dark);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
        }

        .control-btn:hover {
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .map-legend {
          display: flex;
          gap: 1rem;
          padding: 0.5rem 1rem;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          pointer-events: auto;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot-flat { background-color: #3B82F6; }
        .dot-villa { background-color: #10B981; }
        .dot-commercial { background-color: #F59E0B; }

        .map-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: rgba(15, 23, 42, 0.9);
          color: white;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 500;
        }

        .text-accent {
          color: var(--accent);
        }

        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .svg-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: auto;
        }

        .map-svg {
          width: 100%;
          height: 100%;
          min-width: 800px;
          min-height: 500px;
        }

        .map-pin-g {
          transition: transform 0.2s ease-out;
        }

        .map-pin-g:hover {
          transform: scale(1.25);
        }

        .map-pin-g.selected {
          transform: scale(1.35);
        }

        .pin-path {
          transition: filter 0.2s ease;
        }

        .map-pin-g:hover .pin-path {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        }

        .ping-circle {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          transform-origin: center;
        }

        @keyframes ping {
          0% {
            r: 10;
            opacity: 0.8;
          }
          100% {
            r: 28;
            opacity: 0;
          }
        }

        /* Hover card styling */
        .map-popup-card {
          position: absolute;
          z-index: 20;
          width: 260px;
          border-radius: var(--radius-md);
          overflow: hidden;
          pointer-events: auto;
          cursor: pointer;
        }

        .active-popup {
          border: 2px solid var(--primary);
        }

        .popup-card-inner {
          display: flex;
          gap: 0.75rem;
          padding: 0.5rem;
          align-items: center;
        }

        .popup-card-img {
          width: 65px;
          height: 65px;
          object-fit: cover;
          border-radius: var(--radius-sm);
        }

        .popup-card-details {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
        }

        .popup-card-type {
          font-size: 0.65rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--primary);
        }

        .popup-card-title {
          font-size: 0.85rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-dark);
        }

        .popup-card-price {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-dark);
        }
      `}</style>
    </div>
  );
}

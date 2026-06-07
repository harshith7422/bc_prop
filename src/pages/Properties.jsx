import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, List as ListIcon, Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';
import MockMap from '../components/MockMap';
import { propertiesData } from '../data/properties';

export default function Properties({ globalSearch, setGlobalSearch, favorites, onToggleFavorite }) {
  // Toggle states
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [city, setCity] = useState(globalSearch.city || '');
  const [keyword, setKeyword] = useState(globalSearch.keyword || '');
  const [propertyTypes, setPropertyTypes] = useState(
    globalSearch.typeFilter ? [globalSearch.typeFilter] : []
  );
  const [bhkTypes, setBhkTypes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000000); // 10 Cr in rupees
  const [status, setStatus] = useState('All'); // 'All', 'Under Construction', 'Ready'

  // Sync with homepage global searches
  useEffect(() => {
    if (globalSearch.city !== undefined) setCity(globalSearch.city);
    if (globalSearch.keyword !== undefined) setKeyword(globalSearch.keyword);
    if (globalSearch.typeFilter !== undefined) {
      setPropertyTypes(globalSearch.typeFilter ? [globalSearch.typeFilter] : []);
    }
  }, [globalSearch]);

  // Handle skeleton loading simulation when filters change
  const triggerLoading = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 60007 / 100); // 600ms fake load
    return timer;
  };

  useEffect(() => {
    const timer = triggerLoading();
    return () => clearTimeout(timer);
  }, [propertyTypes, bhkTypes, maxPrice, status, city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    triggerLoading();
  };

  // Filter logic
  const filteredProperties = propertiesData.filter((prop) => {
    // 1. City / Location match
    if (city && !prop.location.toLowerCase().includes(city.toLowerCase())) {
      return false;
    }

    // 2. Keyword match
    if (keyword) {
      const query = keyword.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(query);
      const matchLoc = prop.location.toLowerCase().includes(query);
      const matchDesc = prop.description.toLowerCase().includes(query);
      const matchType = prop.type.toLowerCase().includes(query);
      if (!matchTitle && !matchLoc && !matchDesc && !matchType) return false;
    }

    // 3. Property Type match
    if (propertyTypes.length > 0) {
      // If user selected Apartment, Villa, Plots, Commercial
      // Map Plots -> Plots, Commercial -> Commercial, Apartment -> Apartment
      if (!propertyTypes.includes(prop.type)) {
        return false;
      }
    }

    // 4. BHK Type match (only filters apartments/villas that have bhk fields)
    if (bhkTypes.length > 0) {
      if (!prop.bhk || !bhkTypes.includes(prop.bhk.toString())) {
        return false;
      }
    }

    // 5. Price range match
    if (prop.priceNumeric > maxPrice) {
      return false;
    }

    // 6. Property status match
    if (status !== 'All') {
      if (prop.status !== status) return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    setCity('');
    setKeyword('');
    setPropertyTypes([]);
    setBhkTypes([]);
    setMaxPrice(100000000);
    setStatus('All');
    setGlobalSearch({ keyword: '', city: '', typeFilter: '' });
    triggerLoading();
  };

  const handleTypeCheckboxChange = (type) => {
    setPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBhkToggle = (bhk) => {
    setBhkTypes((prev) =>
      prev.includes(bhk) ? prev.filter((b) => b !== bhk) : [...prev, bhk]
    );
  };

  // Price formatting
  const formatSliderPrice = (val) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(1)} Cr${val >= 100000000 ? '+' : ''}`;
    }
    return `₹ ${(val / 100000).toFixed(0)} Lakh`;
  };

  return (
    <div className="properties-container animate-fade-in">
      {/* 1. TOP SEARCH BAR */}
      <section className="properties-search-section">
        <div className="container">
          <form className="properties-search-form glass-panel" onSubmit={handleSearchSubmit}>
            <div className="search-dropdown-col">
              <select
                className="props-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">All Cities</option>
                <option value="Sarjapur">Sarjapur</option>
                <option value="Chandapura">Chandapura</option>
                <option value="HSR Layout">HSR Layout</option>
                <option value="Koramangala">Koramangala</option>
                <option value="Indiranagar">Indiranagar</option>
                <option value="Whitefield">Whitefield</option>
                <option value="Hebbal">Hebbal</option>
                <option value="MG Road">MG Road</option>
              </select>
            </div>
            <div className="search-input-col">
              <input
                type="text"
                placeholder="Search for locality, landmark, project, or builder..."
                className="props-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <button type="submit" className="props-search-btn">
              <Search size={16} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Mobile Filter Trigger */}
      <div className="container mobile-filter-bar">
        <button className="btn-mobile-filter" onClick={() => setMobileFiltersOpen(true)}>
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </button>
        <div className="view-toggle-group-mobile">
          <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><ListIcon size={16} /></button>
          <button className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`} onClick={() => setViewMode('map')}><MapIcon size={16} /></button>
        </div>
      </div>

      {/* 2. CATALOG SECTION */}
      <section className="catalog-section">
        <div className="container catalog-layout">
          
          {/* SIDEBAR FILTERS (Left) */}
          <aside className={`filter-sidebar glass-panel ${mobileFiltersOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <h3 className="sidebar-title">Filter your Search</h3>
              <button className="reset-btn" onClick={() => { handleResetFilters(); setMobileFiltersOpen(false); }}>
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>

            {/* Close button for mobile filters */}
            <button className="btn-close-mobile-filters" onClick={() => setMobileFiltersOpen(false)}>Close Filters</button>

            {/* Filter Group: Property Type */}
            <div className="filter-group">
              <h4 className="filter-group-title">Property Type</h4>
              <div className="checkbox-list">
                {['Apartment', 'Villa', 'Plots', 'Commercial'].map((type) => (
                  <label key={type} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={propertyTypes.includes(type)}
                      onChange={() => handleTypeCheckboxChange(type)}
                      className="custom-checkbox"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: BHK Type */}
            <div className="filter-group">
              <h4 className="filter-group-title">Apartment Type</h4>
              <div className="bhk-button-row">
                {['2', '3', '4'].map((bhk) => (
                  <button
                    key={bhk}
                    type="button"
                    className={`bhk-toggle-btn ${bhkTypes.includes(bhk) ? 'active' : ''}`}
                    onClick={() => handleBhkToggle(bhk)}
                  >
                    {bhk} BHK
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Max Price Slider */}
            <div className="filter-group">
              <div className="filter-group-header">
                <h4 className="filter-group-title">Max Price:</h4>
                <span className="price-value-highlight">{formatSliderPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="5000000" // 50 Lakhs
                max="100000000" // 10 Cr
                step="2500000" // 25 Lakhs step
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="slider-labels">
                <span>₹ 50 L</span>
                <span>₹ 10 Cr+</span>
              </div>
            </div>

            {/* Filter Group: Property Status */}
            <div className="filter-group">
              <h4 className="filter-group-title">Property Status</h4>
              <div className="radio-list">
                {['All', 'Under Construction', 'Ready'].map((statusOption) => (
                  <label key={statusOption} className="radio-label">
                    <input
                      type="radio"
                      name="propertyStatus"
                      checked={status === statusOption}
                      onChange={() => setStatus(statusOption)}
                      className="custom-radio"
                    />
                    <span>{statusOption}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* LISTINGS DISPLAY (Right) */}
          <main className="listings-area">
            {/* View Mode controls */}
            <div className="listings-header">
              <h3 className="results-count">
                {isLoading ? 'Searching...' : `Found ${filteredProperties.length} Properties`}
              </h3>
              <div className="view-toggle-group">
                <button
                  className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListIcon size={16} />
                  <span>List</span>
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
                  onClick={() => setViewMode('map')}
                >
                  <MapIcon size={16} />
                  <span>Map</span>
                </button>
              </div>
            </div>

            {/* SKELETON LOADER STATE */}
            {isLoading ? (
              <div className="skeleton-grid">
                {[...Array(viewMode === 'list' ? 2 : 1)].map((_, i) => (
                  <div key={i} className="skeleton-card glass-panel">
                    <div className="skeleton-image-placeholder"></div>
                    <div className="skeleton-text-block">
                      <div className="skeleton-line short"></div>
                      <div className="skeleton-line medium"></div>
                      <div className="skeleton-line long"></div>
                      <div className="skeleton-line short-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              // EMPTY STATE
              <div className="empty-state glass-panel animate-fade-in">
                <SlidersHorizontal size={48} className="empty-icon text-muted" />
                <h3>No Properties Match Your Criteria</h3>
                <p>Try resetting some filters or searching for another locality in Bengaluru.</p>
                <button className="btn-primary mt-2" onClick={handleResetFilters}>Reset Search Filters</button>
              </div>
            ) : viewMode === 'list' ? (
              // LIST VIEW (Grid layout)
              <div className="listings-grid">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={setSelectedProperty}
                    isFavorite={favorites.includes(prop.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              // MAP VIEW (Interactive vector map)
              <div className="map-view-container animate-fade-in">
                <MockMap
                  properties={filteredProperties}
                  selectedPropertyId={selectedProperty?.id || null}
                  onPropertySelect={(prop) => setSelectedProperty(prop)}
                />
              </div>
            )}
          </main>

        </div>
      </section>

      {/* DETAIL MODAL OVERLAY */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={onToggleFavorite}
        />
      )}

      <style>{`
        .properties-container {
          padding-top: 80px;
        }

        .properties-search-section {
          background-color: white;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .properties-search-form {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: var(--radius-md);
          gap: 0.5rem;
        }

        .search-dropdown-col {
          border-right: 1px solid var(--border-color);
          width: 180px;
          padding: 0 0.5rem;
        }

        .search-input-col {
          flex: 1;
          padding: 0 0.5rem;
        }

        .props-select, .props-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
          width: 100%;
        }

        .props-input::placeholder {
          color: #94A3B8;
        }

        .props-search-btn {
          background-color: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .props-search-btn:hover {
          background-color: var(--primary-hover);
        }

        /* Mobile Filter Layout */
        .mobile-filter-bar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
        }

        .btn-mobile-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-weight: 600;
          color: var(--text-dark);
        }

        .view-toggle-group-mobile {
          display: flex;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: white;
        }

        @media (max-width: 768px) {
          .mobile-filter-bar {
            display: flex;
          }
        }

        /* Catalog Layout */
        .catalog-section {
          padding: 3rem 0;
          background-color: var(--bg-main);
          min-height: calc(100vh - 180px);
        }

        .catalog-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .catalog-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Sidebar filter elements */
        .filter-sidebar {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .filter-sidebar {
            display: none; /* Hide default sidebar on mobile */
          }
          
          .filter-sidebar.mobile-open {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1050;
            background-color: white;
            border-radius: 0;
            overflow-y: auto;
          }
        }

        .btn-close-mobile-filters {
          display: none;
          background-color: #F1F5F9;
          color: var(--text-dark);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
        }

        .filter-sidebar.mobile-open .btn-close-mobile-filters {
          display: block;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .sidebar-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
        }

        .reset-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
        }

        .reset-btn:hover {
          color: var(--primary-hover);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .filter-group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filter-group-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-value-highlight {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary);
        }

        .checkbox-list, .radio-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .checkbox-label, .radio-label {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }

        .custom-checkbox, .custom-radio {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid var(--border-color);
          outline: none;
          cursor: pointer;
        }

        .custom-radio {
          border-radius: 50%;
        }

        .bhk-button-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .bhk-toggle-btn {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          background-color: white;
          transition: all 0.2s ease;
        }

        .bhk-toggle-btn:hover {
          background-color: #F1F5F9;
        }

        .bhk-toggle-btn.active {
          background-color: var(--primary-light);
          border-color: var(--primary);
          color: var(--primary);
        }

        .price-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: var(--radius-full);
          background: #E2E8F0;
          outline: none;
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: var(--shadow-sm);
        }

        .price-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Listings Right Area */
        .listings-area {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .listings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.5rem;
        }

        .results-count {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0F172A;
        }

        .view-toggle-group {
          display: flex;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: white;
        }

        @media (max-width: 768px) {
          .view-toggle-group {
            display: none; /* Hide on mobile because it's in mobile-filter-bar */
          }
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          background-color: white;
          border-right: 1px solid var(--border-color);
        }

        .toggle-btn:last-child {
          border-right: none;
        }

        .toggle-btn:hover {
          background-color: #F1F5F9;
          color: var(--text-dark);
        }

        .toggle-btn.active {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .listings-grid {
            grid-template-columns: 1fr;
          }
        }

        .map-view-container {
          width: 100%;
        }

        /* Skeleton styling */
        .skeleton-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .skeleton-card {
          border-radius: var(--radius-lg);
          padding: 1rem;
          display: flex;
          gap: 1.5rem;
          height: 200px;
        }

        @media (max-width: 640px) {
          .skeleton-card {
            flex-direction: column;
            height: auto;
          }
        }

        .skeleton-image-placeholder {
          width: 200px;
          height: 100%;
          border-radius: var(--radius-md);
          background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%);
          background-size: 200% 100%;
          animation: loading-pulse 1.5s infinite;
        }

        @media (max-width: 640px) {
          .skeleton-image-placeholder {
            width: 100%;
            height: 150px;
          }
        }

        .skeleton-text-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          justify-content: center;
        }

        .skeleton-line {
          height: 16px;
          border-radius: 4px;
          background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%);
          background-size: 200% 100%;
          animation: loading-pulse 1.5s infinite;
        }

        .skeleton-line.short { width: 30%; }
        .skeleton-line.medium { width: 60%; }
        .skeleton-line.long { width: 90%; }
        .skeleton-line.short-2 { width: 40%; }

        @keyframes loading-pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Empty state */
        .empty-state {
          padding: 4rem;
          text-align: center;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .empty-icon {
          color: #94A3B8;
        }

        .empty-state h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0F172A;
        }

        .empty-state p {
          font-size: 0.95rem;
          color: var(--text-muted);
          max-width: 400px;
        }
      `}</style>
    </div>
  );
}

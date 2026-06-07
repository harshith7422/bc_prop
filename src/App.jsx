import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FavoritesModal from './components/FavoritesModal';
import PropertyModal from './components/PropertyModal';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Cross-page search state (passed from Home to Properties)
  const [globalSearch, setGlobalSearch] = useState({
    keyword: '',
    city: '',
    typeFilter: ''
  });

  // Favorites state persisted in LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('bluecraft_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bluecraft_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (propertyId) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Page Routing Switch
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            setActivePage={setActivePage}
            setGlobalSearch={setGlobalSearch}
          />
        );
      case 'properties':
        return (
          <Properties
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'about':
        return <AboutUs setActivePage={setActivePage} />;
      case 'contact':
        return <ContactUs />;
      default:
        return (
          <Home
            setActivePage={setActivePage}
            setGlobalSearch={setGlobalSearch}
          />
        );
    }
  };

  return (
    <>
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main>{renderActivePage()}</main>

      <Footer setActivePage={setActivePage} />

      {/* Global Modals */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectProperty={setSelectedProperty}
      />

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
}

export default App;

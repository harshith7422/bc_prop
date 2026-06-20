import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PropertyModal from './components/PropertyModal';
import FloatingContact from './components/FloatingContact';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Cross-page search state (passed from Home to Properties)
  const [globalSearch, setGlobalSearch] = useState({
    keyword: '',
    city: '',
    typeFilter: ''
  });

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
      />

      <main>{renderActivePage()}</main>

      <Footer setActivePage={setActivePage} />

      <FloatingContact />

      {/* Global Modals */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
}

export default App;

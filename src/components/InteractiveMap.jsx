import { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import './InteractiveMap.scss';

const InteractiveMap = () => {
  const { config } = useWedding();
  const [activeLocation, setActiveLocation] = useState('akad');
  const [isLoaded, setIsLoaded] = useState(false);

  const currentLocation = config.events.find((loc) => loc.id === activeLocation) || config.events[0];

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}&query_place_id=${currentLocation.placeId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${currentLocation.lat},${currentLocation.lng}&destination_place_id=${currentLocation.placeId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="interactive-map">
      <div className="interactive-map__header">
        <h3 className="interactive-map__title">Lokasi Acara</h3>
        <p className="interactive-map__subtitle">Peta Lokasi Pernikahan</p>
      </div>

      <div className="interactive-map__tabs">
        {config.events.map((loc) => (
          <button
            key={loc.id}
            className={`interactive-map__tab ${activeLocation === loc.id ? 'active' : ''}`}
            onClick={() => {
              setActiveLocation(loc.id);
              setIsLoaded(false);
            }}
          >
            <span className="interactive-map__tab-icon">
              {loc.id === 'akad' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 22V12a9 9 0 0 1 18 0v10" />
                  <path d="M12 22V8" />
                  <path d="M7 22V16" />
                  <path d="M17 22V16" />
                  <path d="M21 12a5 5 0 0 0-5-5" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              )}
            </span>
            <span className="interactive-map__tab-label">{loc.name}</span>
          </button>
        ))}
      </div>

      <div className="interactive-map__content">
        <div className="interactive-map__info">
          <div className="interactive-map__location-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{currentLocation.name}</span>
          </div>
          <p className="interactive-map__address">{currentLocation.address}</p>
        </div>

        <div className="interactive-map__wrapper">
          {!isLoaded && (
            <div className="interactive-map__placeholder">
              <div className="interactive-map__spinner"></div>
              <span>Memuat peta...</span>
            </div>
          )}
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=place_id:${currentLocation.placeId}&zoom=15&maptype=roadmap`}
            className={`interactive-map__frame ${isLoaded ? 'loaded' : ''}`}
            title={`Lokasi ${currentLocation.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="interactive-map__actions">
          <button className="btn btn--primary" onClick={openInGoogleMaps}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Buka di Google Maps
          </button>
          <button className="btn btn--secondary" onClick={getDirections}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="3,11 22,2 13,21 11,13 3,11" />
            </svg>
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;

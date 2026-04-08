import { createContext, useContext, useState, useEffect } from 'react';
import { loadConfig, CONFIG_STORAGE_KEY } from '../config/weddingConfig';

const WeddingContext = createContext();

export const WeddingProvider = ({ children }) => {
  const [config, setConfig] = useState(loadConfig());
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === CONFIG_STORAGE_KEY) {
        setConfig(loadConfig());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Expose functions to trigger reload when config changes
  const refreshConfig = () => {
    setConfig(loadConfig());
  };

  return (
    <WeddingContext.Provider value={{ config, setConfig, refreshConfig, isAdminOpen, setIsAdminOpen }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within WeddingProvider');
  }
  return context;
};

export default WeddingContext;

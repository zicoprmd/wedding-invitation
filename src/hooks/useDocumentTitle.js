import { useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';

const useDocumentTitle = () => {
  const { config } = useWedding();

  useEffect(() => {
    if (config?.couple) {
      const title = `${config.couple.groomName} & ${config.couple.brideName} - Wedding Invitation`;
      document.title = title;
    }
  }, [config]);

  return null;
};

export default useDocumentTitle;

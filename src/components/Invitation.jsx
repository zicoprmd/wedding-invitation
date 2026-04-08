import { useState, useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';
import './Invitation.scss';

const Invitation = ({ onOpen }) => {
  const { config } = useWedding();
  const [isOpening, setIsOpening] = useState(false);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const toParam = params.get('to');
    if (toParam) {
      const decodedName = toParam.replace(/\+/g, ' ');
      setGuestName(decodedName);
    }
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div className={`invitation ${isOpening ? 'hidden' : ''}`}>
      <div className="invitation__bg"></div>

      <div className="invitation__content">
        <div className="invitation__ornament">
          <svg viewBox="0 0 100 30" fill="currentColor">
            <path d="M50 0 L55 10 L65 10 L57 17 L60 28 L50 22 L40 28 L43 17 L35 10 L45 10 Z" />
            <path d="M20 5 L22 8 L25 8 L23 10 L24 13 L20 11 L16 13 L17 10 L15 8 L18 8 Z" opacity="0.6" />
            <path d="M80 5 L82 8 L85 8 L83 10 L84 13 L80 11 L76 13 L77 10 L75 8 L78 8 Z" opacity="0.6" />
          </svg>
        </div>

        <p className="invitation__subtitle">Wedding Invitation</p>

        <h1 className="invitation__title">
          {config.couple.groomName}
          <span className="invitation__title--ampersand">&</span>
          {config.couple.brideName}
        </h1>

        {/* <div className="invitation__divider"></div> */}

        {guestName && (
          <>
            <p className="invitation__to">To</p>
            <p className="invitation__guest-name">{guestName}</p>
            {/* <div className="invitation__divider"></div> */}
          </>
        )}

        <p className="invitation__from">From</p>
        <p className="invitation__parents">
          {config.parents.groom.father} & {config.parents.groom.mother}<br />
          &<br />
          {config.parents.bride.father} & {config.parents.bride.mother}
        </p>

        <p className="invitation__date">{config.couple.saveTheDate}</p>

        <div className="invitation__cta">
          <button className="invitation__button" onClick={handleOpen}>
            Buka Undangan
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="invitation__footer">
        With love, we invite you to celebrate our special day
      </div>
    </div>
  );
};

export default Invitation;

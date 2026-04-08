import { useEffect, useRef, useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import './TokenOfLove.scss';

const TokenOfLove = () => {
  const { config } = useWedding();
  const sectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(index);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const gifts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
        </svg>
      ),
      title: 'Gift',
      description: 'Your presence is the greatest gift',
      isClickable: true,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      ),
      title: 'Wishes',
      description: 'Share your blessings and advice',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
        </svg>
      ),
      title: 'Envelope',
      description: 'For those who wish to give cash',
    },
  ];

  return (
    <>
      <section className="token-of-love section" id="token-of-love" ref={sectionRef}>
        <div className="container">
          <div className="token-of-love__header reveal">
            <p className="token-of-love__subtitle">Your Presence</p>
            <h2 className="token-of-love__title">Token of Love</h2>
            <div className="token-of-love__divider"></div>
            <p className="token-of-love__intro reveal delay-1">
              Thank you for celebrating our love. Your generous gift will help us build our new life together.
            </p>
          </div>

          <div className="token-of-love__grid">
            {gifts.map((gift, index) => (
              <div
                key={index}
                className={`token-of-love__card reveal delay-${index + 2} ${gift.isClickable ? 'clickable' : ''}`}
                onClick={() => gift.isClickable && setShowModal(true)}
              >
                <div className="token-of-love__icon">{gift.icon}</div>
                <h3 className="token-of-love__card-title">{gift.title}</h3>
                <p className="token-of-love__card-desc">{gift.description}</p>
              </div>
            ))}
          </div>

          <div className="token-of-love__message reveal delay-5">
            <p>
              "Your love and presence mean more to us than any gift could ever express.
              <br />
              Thank you for being part of our story."
            </p>
            <p className="token-of-love__signature">- {config.couple.groomName} & {config.couple.brideName}</p>
          </div>
        </div>
      </section>

      {/* Gift Modal */}
      <div className={`gift-modal ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
        <div className="gift-modal__content" onClick={(e) => e.stopPropagation()}>
          <button className="gift-modal__close" onClick={() => setShowModal(false)}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>

          <div className="gift-modal__header">
            <h2>Hadiah untuk kami</h2>
            <p>Terima kasih atas kebaikan Anda. Silakan transfer ke rekening berikut:</p>
          </div>

          <div className="gift-modal__accounts">
            {config.gift?.bankAccounts?.map((account, index) => (
              <div key={index} className="gift-modal__account">
                <div className="gift-modal__bank">{account.bank}</div>
                <div className="gift-modal__account-info">
                  <span className="gift-modal__account-name">{account.accountName}</span>
                  <div className="gift-modal__account-number">
                    <span>{account.accountNumber}</span>
                    <button
                      className="gift-modal__copy"
                      onClick={() => copyToClipboard(account.accountNumber, index)}
                    >
                      {copiedAccount === index ? 'Tersalin!' : 'Salin'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {config.gift?.homeAddress && (
            <div className="gift-modal__address">
              <h3>Alamat Rumah</h3>
              <p>{config.gift.homeAddress}</p>
              <button
                className="gift-modal__copy-address"
                onClick={() => copyToClipboard(config.gift.homeAddress, 'address')}
              >
                {copiedAccount === 'address' ? 'Tersalin!' : 'Salin Alamat'}
              </button>
            </div>
          )}

          <div className="gift-modal__footer">
            <p>"Untuk Anda yang ingin memberikan hadiah secara langsung"</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenOfLove;

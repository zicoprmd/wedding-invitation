import { useEffect, useRef } from 'react';
import { useWedding } from '../context/WeddingContext';
import './Couple.scss';

const Couple = () => {
  const { config } = useWedding();
  const sectionRef = useRef(null);

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

  return (
    <section className="couple section" id="couple" ref={sectionRef}>
      <div className="container">
        <div className="couple__header reveal">
          <p className="couple__subtitle">Happy Moments</p>
          <h2 className="couple__title">The Couple</h2>
          <div className="couple__divider"></div>
        </div>

        <div className="couple__content">
          <div className="couple__card couple__card--groom reveal delay-1">
            <div className="couple__photo">
              <img
                src={config.couple.groomPhoto}
                alt={config.couple.groomName}
              />
            </div>
            <h3 className="couple__name">{config.couple.groomName}</h3>
            <p className="couple__role">Groom</p>
            <p className="couple__parents">
              <span>Son of {config.parents.groom.father} & {config.parents.groom.mother}</span>
            </p>
          </div>

          <div className="couple__heart reveal delay-2">
            <div className="couple__heart-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          <div className="couple__card couple__card--bride reveal delay-3">
            <div className="couple__photo">
              <img
                src={config.couple.bridePhoto}
                alt={config.couple.brideName}
              />
            </div>
            <h3 className="couple__name">{config.couple.brideName}</h3>
            <p className="couple__role">Bride</p>
            <p className="couple__parents">
              <span>Daughter of {config.parents.bride.father} & {config.parents.bride.mother}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Couple;

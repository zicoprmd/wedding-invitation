import { useEffect, useRef } from 'react';
import { useWedding } from '../context/WeddingContext';
import './HelloToIDo.scss';

const HelloToIDo = () => {
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
    <section className="hello-to-i-do section" id="hello-to-i-do" ref={sectionRef}>
      <div className="container">
        <div className="hello-to-i-do__header reveal">
          <p className="hello-to-i-do__subtitle">Our Journey</p>
          <h2 className="hello-to-i-do__title">Hello to I Do</h2>
          <div className="hello-to-i-do__divider"></div>
        </div>

        <div className="hello-to-i-do__timeline">
          {config.timeline.map((item, index) => (
            <div key={item.id || index} className={`hello-to-i-do__item reveal delay-${index + 1}`}>
              <div className="hello-to-i-do__icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="hello-to-i-do__content">
                <h3 className="hello-to-i-do__item-title">{item.title}</h3>
                <p className="hello-to-i-do__date">{item.date}</p>
                <p className="hello-to-i-do__description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelloToIDo;

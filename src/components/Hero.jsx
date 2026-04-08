import { useEffect, useRef } from 'react';
import { useWedding } from '../context/WeddingContext';
import './Hero.scss';

const Hero = () => {
  const { config } = useWedding();
  const particlesRef = useRef(null);

  useEffect(() => {
    const particles = particlesRef.current;
    if (!particles) return;

    // Create floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${Math.random() * 4 + 4}s;
        opacity: ${Math.random() * 0.5 + 0.1};
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
      `;
      particles.appendChild(particle);
    }

    return () => {
      while (particles.firstChild) {
        particles.removeChild(particles.firstChild);
      }
    };
  }, []);

  const scrollToContent = () => {
    document.getElementById('couple')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero__background">
        <div className="hero__particles" ref={particlesRef}></div>
      </div>

      <div className="hero__content">
        <p className="hero__subtitle">Wedding Invitation</p>

        <div className="hero__names">
          <h1 className="hero__title">
            {config.couple.groomName}
            <span className="hero__title--ampersand">&</span>
            {config.couple.brideName}
          </h1>
        </div>

        <div className="hero__divider"></div>

        <p className="hero__date">{config.couple.saveTheDate}</p>

        <div className="hero__cta">
          <a href="#rsvp" className="btn btn--primary">
            Confirm Attendance
          </a>
        </div>
      </div>

      <div className="hero__scroll" onClick={scrollToContent}>
        <div className="hero__scroll--icon"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;

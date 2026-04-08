import { useEffect, useRef, useState, useCallback } from 'react';
import { useWedding } from '../context/WeddingContext';
import './Gallery.scss';

const Gallery = () => {
  const { config } = useWedding();
  const sectionRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = config.gallery.map(img => img.src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightboxOpen]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToImage = useCallback((newIndex, direction = '') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
      setSlideDirection('');
    }, 300);
  }, [isAnimating]);

  const prevImage = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToImage(newIndex, 'prev');
  }, [currentIndex, images.length, goToImage]);

  const nextImage = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToImage(newIndex, 'next');
  }, [currentIndex, images.length, goToImage]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, prevImage, nextImage]);

  return (
    <section className="gallery section" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery__header reveal">
          <p className="gallery__subtitle">Our Moments</p>
          <h2 className="gallery__title">Wedding Gallery</h2>
          <div className="gallery__divider"></div>
        </div>

        <div className="gallery__grid">
          {images.map((img, index) => (
            <div
              className="gallery__item reveal"
              key={index}
              onClick={() => openLightbox(index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
              <div className="gallery__overlay">
                <span className="gallery__overlay-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="lightbox"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="lightbox__backdrop" onClick={closeLightbox}></div>

          <div className="lightbox__content">
            <button className="lightbox__close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button className="lightbox__nav lightbox__nav--prev" onClick={prevImage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className={`lightbox__image-container ${isAnimating ? `lightbox__image-container--${slideDirection}` : ''}`}>
              <img
                className="lightbox__image"
                src={images[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
              />
            </div>

            <button className="lightbox__nav lightbox__nav--next" onClick={nextImage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="lightbox__counter">
              <span>{currentIndex + 1}</span>
              <div className="lightbox__dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`lightbox__dot ${index === currentIndex ? 'lightbox__dot--active' : ''}`}
                    onClick={() => goToImage(index, index > currentIndex ? 'next' : 'prev')}
                  />
                ))}
              </div>
              <span>{images.length}</span>
            </div>

            <div className="lightbox__hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
              Swipe
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'scaleX(-1)' }}>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

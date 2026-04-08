import { useState, useEffect } from 'react';
import './Navigation.scss';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#couple', label: 'Couple' },
    { href: '#hello-to-i-do', label: 'Our Journey' },
    { href: '#token-of-love', label: 'Gift' },
    { href: '#event', label: 'Event' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#rsvp', label: 'RSVP' },
    { href: '#share', label: 'Share' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navigation__container">
        <a href="#home" className="navigation__logo">
          W<span>&</span>D
        </a>

        <ul className={`navigation__menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navigation__link"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`navigation__toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`navigation__overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={handleLinkClick}
      ></div>
    </nav>
  );
};

export default Navigation;

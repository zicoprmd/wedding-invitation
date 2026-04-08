import { useWedding } from '../context/WeddingContext';
import './Footer.scss';

const Footer = () => {
  const { config } = useWedding();
  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'Facebook',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'Twitter',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      ),
      href: '#',
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__logo">
          {config.couple.groomName.charAt(0)}<span>&</span>{config.couple.brideName.charAt(0)}
        </div>
        <p className="footer__names">{config.couple.groomName} & {config.couple.brideName}</p>
        <p className="footer__date">{config.couple.saveTheDate}</p>

        <div className="footer__divider"></div>

        <div className="footer__social">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="footer__social-link"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <p className="footer__copyright">
          Made with <span className="footer__heart">&hearts;</span> for our special day
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';
import './SocialShare.scss';

const SocialShare = () => {
  const { config } = useWedding();
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const coupleNames = `${config.couple.groomName} & ${config.couple.brideName}`;
  const weddingDate = config.couple.saveTheDate;
  const siteUrl = config.share.siteUrl;
  const shareText = `${coupleNames} Wedding Invitation\n\nKami mengundang Anda untuk hadir di pernikahan kami.\n\n📅 ${weddingDate}\n\n✨ Buka undangan: ${siteUrl}`;

  const shareData = {
    title: `${coupleNames} Wedding`,
    text: shareText,
    url: siteUrl,
  };

  const handleWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = () => {
    const igUrl = `https://instagram.com`;
    window.open(igUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}&u=${encodeURIComponent(siteUrl)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      const input = document.createElement('input');
      input.value = siteUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.log('Share failed');
      }
    }
  };

  return (
    <div className="social-share">
      <div className="social-share__preview">
        <div className="social-share__preview-image">
          <div className="social-share__preview-overlay">
            <span className="social-share__preview-logo">{config.couple.groomName.charAt(0)}&{config.couple.brideName.charAt(0)}</span>
            <span className="social-share__preview-names">{coupleNames}</span>
            <span className="social-share__preview-date">{weddingDate}</span>
          </div>
        </div>
        <p className="social-share__preview-label">Preview Undangan</p>
      </div>

      <div className="social-share__buttons">
        <button
          className="social-share__button social-share__button--whatsapp"
          onClick={handleWhatsApp}
          aria-label="Share via WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>WhatsApp</span>
        </button>

        <button
          className="social-share__button social-share__button--instagram"
          onClick={handleInstagram}
          aria-label="Share via Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span>Instagram</span>
        </button>

        <button
          className="social-share__button social-share__button--twitter"
          onClick={handleTwitter}
          aria-label="Share via X (Twitter)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>X</span>
        </button>

        <button
          className="social-share__button social-share__button--facebook"
          onClick={handleFacebook}
          aria-label="Share via Facebook"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
          <span>Facebook</span>
        </button>
      </div>

      <div className="social-share__divider">
        <span>atau</span>
      </div>

      <div className="social-share__actions">
        {canShare && (
          <button
            className="social-share__action-btn social-share__action-btn--share"
            onClick={handleNativeShare}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        )}

        <button
          className="social-share__action-btn"
          onClick={handleCopyLink}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default SocialShare;

import { useState, useEffect } from 'react';
import './LiveStreaming.scss';

const LiveStreaming = ({ isActive = false }) => {
  const [streamStatus, setStreamStatus] = useState('idle');
  const [viewerCount, setViewerCount] = useState(0);
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    // Default stream URL - can be configured
    // For YouTube: use embed URL format
    // For other platforms, adjust accordingly
    const defaultStreamUrl = 'https://www.youtube.com/embed/VIDEO_ID';
    setStreamUrl(defaultStreamUrl);
  }, []);

  useEffect(() => {
    if (isActive) {
      setStreamStatus('live');
      // Simulate viewer count updates
      const interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 5));
      }, 5000);
      return () => clearInterval(interval);
    } else {
      setStreamStatus('idle');
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <div className="live-streaming">
      <div className="live-streaming__container">
        <div className="live-streaming__header">
          <div className="live-streaming__status">
            <span className={`live-streaming__indicator ${streamStatus}`}></span>
            <span className="live-streaming__status-text">
              {streamStatus === 'live' ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
          {streamStatus === 'live' && (
            <div className="live-streaming__viewers">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <span>{viewerCount} watching</span>
            </div>
          )}
        </div>

        <div className="live-streaming__video-container">
          {streamUrl ? (
            <iframe
              src={streamUrl}
              title="Live Stream"
              className="live-streaming__iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="live-streaming__placeholder">
              <p>Stream not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Utility function to configure stream URL from config
export const configureStreamUrl = (platform, videoId) => {
  const platforms = {
    youtube: `https://www.youtube.com/embed/${videoId}`,
    vimeo: `https://player.vimeo.com/video/${videoId}`,
    twitch: `https://player.twitch.tv/?channel=${videoId}`,
  };
  return platforms[platform] || '';
};

export default LiveStreaming;
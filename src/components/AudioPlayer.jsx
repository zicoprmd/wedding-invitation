import { useState, useRef, useEffect } from "react";
import "./AudioPlayer.scss";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/ILLBETHERE.mp3" loop preload="none" />

      <div
        className={`audio-player ${isVisible ? "audio-player--visible" : ""}`}
      >
        <button
          className={`audio-player__btn ${isPlaying ? "audio-player__btn--playing" : ""}`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
        >
          <div className="audio-player__icon">
            {isPlaying ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M12 3v9.28a4.39 4.39 0 000 8.72V21h1v-9.12a4.39 4.39 0 000-8.72V3h-1z" />
                <path
                  d="M19 3v9.28a4.39 4.39 0 000 8.72V21h1v-9.12a4.39 4.39 0 000-8.72V3h-1z"
                  opacity="0.6"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
          <span className="audio-player__label">
            {isPlaying ? "♫ Musik On" : "♫ Musik Off"}
          </span>
          <div
            className={`audio-player__bars ${isPlaying ? "audio-player__bars--playing" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </>
  );
};

export default AudioPlayer;

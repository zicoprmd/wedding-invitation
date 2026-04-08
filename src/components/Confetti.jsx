import { useEffect, useState } from 'react';
import './Confetti.scss';

const Confetti = ({ isActive }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isActive) {
      createParticles();
    }
  }, [isActive]);

  const createParticles = () => {
    const newParticles = [];
    const symbols = ['❤', '💕', '✨', '💖', '💗', '🌸', '💜'];
    const colors = ['#e8b4a0', '#f4d1c4', '#e8a4b4', '#d4a5a5', '#c9a0dc', '#f0b8c4'];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
        size: 12 + Math.random() * 16,
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 200,
      });
    }

    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 6000);
  };

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="confetti">
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti__particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            color: p.color,
            '--drift': `${p.drift}px`,
            '--rotation': `${p.rotation}deg`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

export default Confetti;

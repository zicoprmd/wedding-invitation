import { useState, useEffect, useRef } from 'react';
import { useWedding } from '../context/WeddingContext';
import './Countdown.scss';

const Countdown = () => {
  const { config } = useWedding();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prevTime, setPrevTime] = useState(timeLeft);
  const [flipping, setFlipping] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  useEffect(() => {
    const weddingDate = new Date(`${config.couple.weddingDate}T09:00:00`).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };

        Object.keys(newTime).forEach((key) => {
          if (newTime[key] !== timeLeft[key]) {
            setFlipping((prev) => ({ ...prev, [key]: true }));
            setTimeout(() => {
              setFlipping((prev) => ({ ...prev, [key]: false }));
            }, 600);
          }
        });

        setPrevTime(timeLeft);
        setTimeLeft(newTime);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { key: 'days', label: 'Hari' },
    { key: 'hours', label: 'Jam' },
    { key: 'minutes', label: 'Menit' },
    { key: 'seconds', label: 'Detik' },
  ];

  return (
    <section className="countdown">
      <div className="countdown__bg"></div>
      <div className="container">
        <div className="countdown__header">
          <h3 className="countdown__title">Menuju Hari Bahagia</h3>
          <p className="countdown__date">{config.couple.saveTheDate}</p>
        </div>

        <div className="countdown__grid">
          {timeUnits.map((unit, index) => (
            <div key={unit.key} className="countdown__item-wrapper">
              <div className={`countdown__card ${flipping[unit.key] ? 'countdown__card--flip' : ''}`}>
                <div className="countdown__card-inner">
                  <div className="countdown__card-front">
                    <span className="countdown__number">
                      {formatNumber(timeLeft[unit.key])}
                    </span>
                  </div>
                  <div className="countdown__card-back">
                    <span className="countdown__number">
                      {formatNumber(timeLeft[unit.key])}
                    </span>
                  </div>
                </div>
              </div>
              <span className="countdown__label">{unit.label}</span>
              {index < timeUnits.length - 1 && (
                <span className="countdown__separator">:</span>
              )}
            </div>
          ))}
        </div>

        <div className="countdown__footer">
          <span className="countdown__heart">❤</span>
          <span>{config.couple.groomName} & {config.couple.brideName}</span>
          <span className="countdown__heart">❤</span>
        </div>
      </div>
    </section>
  );
};

export default Countdown;

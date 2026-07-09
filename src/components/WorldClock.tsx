import { useState, useEffect } from 'react';
import './WorldClock.css';

interface WorldClockProps {
  id: number;
  name: string;
  timezone: number;
  onRemove: (id: number) => void;
}

function WorldClock({ id, name, timezone, onRemove }: WorldClockProps) {
  const [angles, setAngles] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const cityTime = new Date(utc + timezone * 3600000);
      const hours = cityTime.getHours();
      const minutes = cityTime.getMinutes();
      const seconds = cityTime.getSeconds();

      setAngles({
        hour: (hours % 12) * 30 + minutes * 0.5,
        minute: minutes * 6 + seconds * 0.1,
        second: seconds * 6,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="clock-card">
      <div className="clock-face">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
          <div key={n} className="clock-number" style={{ transform: `rotate(${n * 30}deg)` }}>
            <span style={{ transform: `rotate(-${n * 30}deg)` }}>{n}</span>
          </div>
        ))}
        <div className="hand hour" style={{ transform: `rotate(${angles.hour}deg)` }} />
        <div className="hand minute" style={{ transform: `rotate(${angles.minute}deg)` }} />
        <div className="hand second" style={{ transform: `rotate(${angles.second}deg)` }} />
        <div className="center-dot" />
      </div>
      <div className="clock-name">{name}</div>
      <button className="clock-remove" onClick={() => onRemove(id)}>✕</button>
    </div>
  );
}

export default WorldClock;
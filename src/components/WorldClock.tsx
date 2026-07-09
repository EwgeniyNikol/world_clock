import './WorldClock.css';

interface WorldClockProps {
  id: number;
  name: string;
  timezone: number;
  currentTime: number;
  onRemove: (id: number) => void;
}

function WorldClock({ id, name, timezone, currentTime, onRemove }: WorldClockProps) {
  const utc = currentTime + new Date().getTimezoneOffset() * 60000;
  const cityTime = new Date(utc + timezone * 3600000);
  const hours = cityTime.getHours();
  const minutes = cityTime.getMinutes();
  const seconds = cityTime.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className="clock-card">
      <div className="clock-face">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
          <div key={n} className="clock-number" style={{ transform: `rotate(${n * 30}deg)` }}>
            <span style={{ transform: `rotate(-${n * 30}deg)` }}>{n}</span>
          </div>
        ))}
        <div className="hand hour" style={{ transform: `rotate(${hourAngle}deg)` }} />
        <div className="hand minute" style={{ transform: `rotate(${minuteAngle}deg)` }} />
        <div className="hand second" style={{ transform: `rotate(${secondAngle}deg)` }} />
        <div className="center-dot" />
      </div>
      <div className="clock-name">{name}</div>
      <button className="clock-remove" onClick={() => onRemove(id)}>✕</button>
    </div>
  );
}

export default WorldClock;
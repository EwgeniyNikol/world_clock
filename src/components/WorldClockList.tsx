import { useState, useEffect } from 'react';
import WorldClockForm from './WorldClockForm';
import WorldClock from './WorldClock';

interface ClockItem {
  id: number;
  name: string;
  timezone: number;
}

const defaultClocks: ClockItem[] = [
  { id: 1, name: 'Москва', timezone: 3 },
  { id: 2, name: 'Лондон', timezone: 0 },
  { id: 3, name: 'Каир', timezone: 2 },
];

function WorldClockList() {
  const [clocks, setClocks] = useState<ClockItem[]>(defaultClocks);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = (name: string, timezone: number) => {
    const newClock: ClockItem = {
      id: Date.now(),
      name,
      timezone,
    };
    setClocks([...clocks, newClock]);
  };

  const handleRemove = (id: number) => {
    setClocks(clocks.filter(clock => clock.id !== id));
  };

  return (
    <div>
      <WorldClockForm onAdd={handleAdd} />
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {clocks.map(clock => (
          <WorldClock
            key={clock.id}
            id={clock.id}
            name={clock.name}
            timezone={clock.timezone}
            currentTime={currentTime}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default WorldClockList;
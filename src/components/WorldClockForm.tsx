import { useState } from 'react';

interface WorldClockFormProps {
  onAdd: (name: string, timezone: number) => void;
}

const cities: { name: string; timezone: number }[] = [
  { name: 'Москва', timezone: 3 },
  { name: 'Санкт-Петербург', timezone: 3 },
  { name: 'Казань', timezone: 3 },
  { name: 'Самара', timezone: 4 },
  { name: 'Ульяновск', timezone: 4 },
  { name: 'Екатеринбург', timezone: 5 },
  { name: 'Новосибирск', timezone: 7 },
  { name: 'Омск', timezone: 6 },
  { name: 'Красноярск', timezone: 7 },
  { name: 'Иркутск', timezone: 8 },
  { name: 'Владивосток', timezone: 10 },
  { name: 'Калининград', timezone: 2 },
  { name: 'Сочи', timezone: 3 },
  { name: 'Нижний Новгород', timezone: 3 },
  { name: 'Челябинск', timezone: 5 },
  { name: 'Лондон', timezone: 0 },
  { name: 'Каир', timezone: 2 },
  { name: 'Нью-Йорк', timezone: -5 },
  { name: 'Токио', timezone: 9 },
  { name: 'Пекин', timezone: 8 },
  { name: 'Дубай', timezone: 4 },
  { name: 'Париж', timezone: 1 },
  { name: 'Берлин', timezone: 1 },
  { name: 'Лос-Анджелес', timezone: -8 },
  { name: 'Сидней', timezone: 10 },
  { name: 'Сингапур', timezone: 8 },
  { name: 'Стамбул', timezone: 3 },
];

function WorldClockForm({ onAdd }: WorldClockFormProps) {
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState<number | ''>('');
  const [suggestions, setSuggestions] = useState<typeof cities>([]);

  const handleNameChange = (value: string) => {
    setName(value);
    if (value.trim()) {
      setSuggestions(cities.filter(c => c.name.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (city: { name: string; timezone: number }) => {
    setName(city.name);
    setTimezone(city.timezone);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tz = Number(timezone);
    if (name.trim() && timezone !== '' && tz >= -12 && tz <= 14) {
      onAdd(name.trim(), tz);
      setName('');
      setTimezone('');
      setSuggestions([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-4 rounded-4 shadow mb-4">
      <div className="row g-3">
        <div className="col-md-5 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Название города"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
          {suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 10 }}>
              {suggestions.map(city => (
                <li
                  key={city.name}
                  className="list-group-item list-group-item-action"
                  onClick={() => selectCity(city)}
                  style={{ cursor: 'pointer' }}
                >
                  {city.name} (UTC{city.timezone >= 0 ? '+' : ''}{city.timezone})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="UTC (-12...+14)"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value ? Number(e.target.value) : '')}
            step="0.5"
            required
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-light w-100 fw-bold">Добавить</button>
        </div>
      </div>
    </form>
  );
}

export default WorldClockForm;
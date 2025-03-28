import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventLog = () => {
  const [events, setEvents] = useState([]); // Состояние для списка событий
  const [isLoading, setIsLoading] = useState(true); // Состояние для индикатора загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

  // Загрузка данных о событиях
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data); // Устанавливаем данные в состояние
      } catch (error) {
        setError('Ошибка загрузки событий. Попробуйте снова.'); // Устанавливаем ошибку
        console.error('Ошибка загрузки событий:', error);
      } finally {
        setIsLoading(false); // Загрузка завершена
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="event-log">
      <h2>Журнал событий</h2>

      {/* Отображение ошибки */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Индикатор загрузки */}
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.sensorName}</strong>: {event.eventType} в {new Date(event.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventLog;
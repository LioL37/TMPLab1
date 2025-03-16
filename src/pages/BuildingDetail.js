import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BuildingDetail = () => {
  const { id } = useParams(); // Получаем id здания из URL
  const navigate = useNavigate();
  const [sensors, setSensors] = useState([]); // Состояние для списка датчиков
  const [building, setBuilding] = useState({}); // Состояние для данных о здании
  const [isLoading, setIsLoading] = useState(true); // Состояние для индикатора загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

  // Загрузка данных о здании и датчиках
  useEffect(() => {
    const loadData = async () => {
      try {
        // Загружаем данные о здании
        const buildingResponse = await axios.get(`http://localhost:5000/buildings/${id}`);
        setBuilding(buildingResponse.data);

        // Загружаем данные о датчиках
        const sensorsResponse = await axios.get(`http://localhost:5000/sensors?buildingId=${id}`);
        setSensors(sensorsResponse.data);
      } catch (error) {
        setError('Ошибка загрузки данных. Попробуйте снова.');
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setIsLoading(false); // Загрузка завершена
      }
    };

    loadData();
  }, [id]); // Зависимость от id здания

  // Функция для удаления датчика
  const deleteSensor = async (sensorId) => {
    try {
      await axios.delete(`http://localhost:5000/sensors/${sensorId}`);
      setSensors(sensors.filter(sensor => sensor.id !== sensorId)); // Удаляем датчик из списка
    } catch (error) {
      setError('Ошибка удаления датчика. Попробуйте снова.');
      console.error('Ошибка удаления:', error);
    }
  };

  return (
    <div className="container">
      <h1>Датчики в здании: {building.name}</h1>

      {/* Кнопка возврата на главную страницу */}
      <button className="button button-back" onClick={() => navigate('/')}>
        Назад
      </button>

      {/* Отображение ошибки */}
      {error && <p className="error">{error}</p>}

      {/* Индикатор загрузки */}
      {isLoading ? (
        <p className="loading">Загрузка...</p>
      ) : (
        <div className="sensor-list">
          <ul>
            {sensors.map(sensor => (
              <li key={sensor.id}>
                {sensor.name} - {sensor.type} (Статус: {sensor.status})
                <button
                  className="button button-danger"
                  onClick={() => deleteSensor(sensor.id)}
                >
                  Удалить
                </button>
                <Link
                  to={`/building/${id}/sensor/${sensor.id}/edit`}
                  className="button"
                >
                  Редактировать
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Кнопка для добавления нового датчика */}
      <Link to={`/building/${id}/add-sensor`} className="button">
        Добавить новый датчик
      </Link>
    </div>
  );
};

export default BuildingDetail;
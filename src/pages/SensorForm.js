import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SensorForm = () => {
  const { buildingId, sensorId } = useParams(); // Получаем buildingId и sensorId из URL
  const navigate = useNavigate();
  const nameRef = useRef(null); // Референс для поля "Название"
  const typeRef = useRef(null); // Референс для поля "Тип"
  const statusRef = useRef(null); // Референс для поля "Статус"
  const [isEditMode, setIsEditMode] = useState(false); // Режим редактирования
  const [error, setError] = useState(null); // Состояние для ошибок

  // Загрузка данных датчика при каждом изменении sensorId
  useEffect(() => {
    if (sensorId) {
      const loadSensor = async () => {
        try {
          const response = await axios.get(`/api/sensors/${sensorId}`);
          nameRef.current.value = response.data.name;
          typeRef.current.value = response.data.type;
          statusRef.current.value = response.data.status;
          setIsEditMode(true); // Включаем режим редактирования
        } catch (error) {
          setError('Ошибка загрузки данных. Попробуйте снова.');
          console.error('Ошибка загрузки данных:', error);
        }
      };

      loadSensor();
    }
  }, [sensorId]);

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sensorData = {
      name: nameRef.current.value,
      type: typeRef.current.value,
      status: statusRef.current.value,
      buildingId: parseInt(buildingId), // Используем buildingId
    };

    try {
      if (isEditMode) {
        // Редактирование датчика
        await axios.put(`/api/sensors/${sensorId}`, sensorData);
        alert('Датчик обновлен!');
      } else {
        // Добавление нового датчика
        await axios.post('/api/sensors', sensorData);
        alert('Датчик добавлен!');
      }
      navigate(`/building/${buildingId}`); // Возврат на страницу здания
    } catch (error) {
      setError('Ошибка сохранения данных. Попробуйте снова.');
      console.error('Ошибка сохранения:', error);
    }
  };

  return (
    <div className="container">
      <h1>{isEditMode ? 'Редактирование датчика' : 'Добавление нового датчика'}</h1>

      {/* Кнопка возврата на страницу здания */}
      <button
        className="button button-back"
        onClick={() => navigate(`/building/${buildingId}`)}
      >
        Назад
      </button>

      {/* Отображение ошибки */}
      {error && <p className="error">{error}</p>}

      {/* Форма для добавления/редактирования датчика */}
      <form className="sensor-form" onSubmit={handleSubmit}>
        <label>
          Название:
          <input type="text" ref={nameRef} required />
        </label>
        <br />
        <label>
          Тип:
          <input type="text" ref={typeRef} required />
        </label>
        <br />
        <label>
          Статус:
          <input type="text" ref={statusRef} required />
        </label>
        <br />
        <button type="submit" className="button">
          {isEditMode ? 'Сохранить' : 'Добавить'}
        </button>
      </form>
    </div>
  );
};

export default SensorForm;
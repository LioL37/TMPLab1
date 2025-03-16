import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventLog from '../components/EventLog';

const Home = () => {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/buildings');
        setBuildings(response.data);
      } catch (error) {
        setError('Ошибка загрузки данных. Попробуйте снова.');
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBuildings();
  }, []);

  return (
    <div className="container">
      <h1>Список зданий</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="building-list">
          <ul>
            {buildings.map(building => (
              <li key={building.id}>
                <Link to={`/building/${building.id}`}>{building.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <EventLog />
    </div>
  );
};

export default Home;
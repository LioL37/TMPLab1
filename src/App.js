import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BuildingDetail from './pages/BuildingDetail';
import SensorForm from './pages/SensorForm';
import Login from './pages/Login'; // Импортируем страницу входа
import { useAuth } from './components/AuthContext'; // Импортируем контекст аутентификации

// Компонент для защиты маршрутов
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Получаем состояние аутентификации
  return isAuthenticated ? children : <Navigate to="/login" />; // Перенаправляем на страницу входа, если не авторизован
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Страница входа */}
        <Route path="/login" element={<Login />} />

        {/* Защищенные маршруты */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/building/:id"
          element={
            <PrivateRoute>
              <BuildingDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/building/:buildingId/sensor/:sensorId/edit"
          element={
            <PrivateRoute>
              <SensorForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/building/:buildingId/add-sensor"
          element={
            <PrivateRoute>
              <SensorForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
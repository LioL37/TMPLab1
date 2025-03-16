import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируем createRoot
import App from './App';
import { AuthProvider } from './components/AuthContext';
import './styles/styles.css';

// Находим корневой элемент
const container = document.getElementById('root');

// Создаем корень
const root = createRoot(container);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Импортируем контекст

const Login = () => {
  const [login, setLogin] = useState(''); // Состояние для логина
  const [password, setPassword] = useState(''); // Состояние для пароля
  const navigate = useNavigate(); // Хук для навигации
  const { login: authenticate } = useAuth(); // Функция для авторизации из контекста

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка логина и пароля
    if (login === 'admin' && password === '1234') {
      authenticate(); // Вызываем функцию авторизации
      navigate('/'); // Перенаправляем на главную страницу
    } else {
      alert('Неверные логин или пароль!'); // Сообщение об ошибке
    }
  };

  return (
    <div>
      <h1>Войдите в учетную запись</h1>
      <form className="login" onSubmit={handleSubmit}>
        <label>
          Логин:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button className="loginsub" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
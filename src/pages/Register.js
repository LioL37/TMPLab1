import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Проверка, что пароли совпадают
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      // Отправка данных на сервер для регистрации
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('isAuthenticated', 'true'); // Сохраняем флаг аутентификации
        navigate('/'); // Перенаправляем на главную страницу
      } else {
        setError(response.data.message || 'Ошибка регистрации');
      }
    } catch (error) {
      setError('Ошибка при регистрации. Попробуйте снова.');
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <p>
        Уже есть аккаунт? <a href="/login">Войдите</a>
      </p>
    </div>
  );
};

export default Register;
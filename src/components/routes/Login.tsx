import React from 'react';
import "../style/Login.css"

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj możesz dodać logikę obsługi formularza (np. wysyłanie danych do serwera).
  };

  return (
    <div className="login-container">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Hasło</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Zaloguj</button>
      </form>

      <div className="register-link">
        <a href="/Register">Zarejestruj się</a>
      </div>

    </div>
  );
};

export default Login;

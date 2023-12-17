import React, { useState } from 'react';
import { useAuth } from '../common/AuthProvider';
import "../style/Login.css"
import { useNavigate,Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({id:3, username: '', password: '' });
  const navigate = useNavigate()


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();    
    login(formData);
     const loginElement = document.getElementById("login");
     const logoutElement = document.getElementById("logout");
    if (loginElement) {
      loginElement.style.display = "none";
    }
    if (logoutElement) {
      logoutElement.style.display = "inline";
    }
    navigate('/');
  };


  return (
    <div className="login-container">
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />

        <label htmlFor="password">Hasło</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button type="submit">Zaloguj</button>
      </form>

      <div className="register-link">
        <Link to="/Register">Zarejestruj się</Link>
      </div>
    </div>
  );
};

export default Login;

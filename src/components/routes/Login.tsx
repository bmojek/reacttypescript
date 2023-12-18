import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import "../style/Login.css"
import { useNavigate,Link } from 'react-router-dom';
import { useApiContext } from '../contexts/ApiContext';


const Login: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({username: '', password: '' });
  
  const navigate = useNavigate()
  const {users} = useApiContext()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    const foundUser = users.find((user) => user.username === formData.username);
    
    if (foundUser && foundUser.website === formData.password) {
      const userId = foundUser.id; 
      
      login({id:userId, ...formData});
  
      const loginElement = document.getElementById("login");
      const logoutElement = document.getElementById("logout");
  
      if (loginElement) {
        loginElement.style.display = "none";
      }
  
      if (logoutElement) {
        logoutElement.style.display = "inline";
      }
  
      navigate('/');
    } else {
      alert("Zle dane logowania");
    }
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

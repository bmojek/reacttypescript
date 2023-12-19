import React, { useState } from "react";
import "../style/Register.css"; // Import the CSS file for styling
import { useApiContext } from "../contexts/ApiContext";
import { UserType } from "../types/User.type";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register: React.FC = () => {
  const { setUsers, users } = useApiContext();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<UserType>({
    id: 0,
    name: "",
    username: "",
    email: "",
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getMaxId = () => {
    return users.reduce(
      (maxId, user) => (user.id > maxId ? user.id : maxId),
      0
    );
  };

  const isUsernameTaken = (username: string) => {
    return users.some((user) => user.username === username);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserId = getMaxId() + 1;
    const newUser = { ...formData, id: newUserId };
    if (isUsernameTaken(formData.username)) {
      alert("Zajęta nazwa użytkownika. Wybierz inną.");
      return;
    }
    setUsers((prevUsers) => [...prevUsers, newUser]);
    login({
      id: newUserId,
      username: newUser.username,
      password: newUser.website,
    });
    const loginElement = document.getElementById("login");
    const logoutElement = document.getElementById("logout");

    if (loginElement) {
      loginElement.style.display = "none";
    }

    if (logoutElement) {
      logoutElement.style.display = "inline";
    }
    navigate(-1);
    setFormData({
      id: 0,
      name: "",
      username: "",
      email: "",
      website: "",
    });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website (Password):</label>
          <input
            type="password"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

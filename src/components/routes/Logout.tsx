import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    const loginElement = document.getElementById("login");
    const logoutElement = document.getElementById("logout");

    if (loginElement) {
      loginElement.style.display = "inline";
    }
    if (logoutElement) {
      logoutElement.style.display = "none";
    }
    navigate("/");
  });

  return <></>;
};

export default Logout;

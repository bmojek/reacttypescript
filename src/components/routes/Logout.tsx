import React, { useEffect } from 'react';
import { useAuth } from '../common/AuthProvider';
const Logout: React.FC = () => {
  const { logout } = useAuth();

  useEffect(()=>{
    logout();
    const loginElement = document.getElementById("login");
    const logoutElement = document.getElementById("logout");
 if (loginElement) {
   loginElement.style.display = "inline";
 }
 if (logoutElement) {
   logoutElement.style.display = "none";
 }

  })



  return (
    <>
    
    </>
  );
};

export default Logout;

import React from "react";
import "../style/Layout.css"
import { Gallery } from "../routes/Gallery";
import { Home } from "../routes/Home";
import { Contact } from "../routes/Contact";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { FcGallery } from "react-icons/fc";
import { Users } from "../routes/Users";
import { Register } from "../routes/Register";
import { Posts } from "../routes/Posts" 

const Layout = () =>{
    

return(
    <Router>
      <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Posts">Wpisy</Link>
        </li>
        <li>
          <Link to="/Gallery">Galeria</Link>
        </li>
        <li>
          <Link to="/Users">Użytkownicy</Link>
        </li>
        <ul id="login">
        <li>
          <Link to="/">Logowanie</Link>
        </li>
        <li>
          <Link to="/Register">Rejestracja</Link>
        </li>
        </ul>
      </ul>

      <hr />    
      </header>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="Gallery" element={<Gallery/>} />
            <Route path="Contact" element={<Contact/>} />
            <Route path="Users" element={<Users/>}/>
            <Route path="Register" element={<Register/>}/>
            <Route path="Posts" element={<Posts/>}/>

        </Routes>
  </Router>
);

}

export default Layout;
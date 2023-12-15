import React from "react";
import "../style/Layout.css"
import { Gallery } from "../routes/Gallery";
import { Home } from "../routes/Home";
import { Contact } from "../routes/Contact";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Layout = () =>{
    

return(
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>

      <hr />    
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="Gallery" element={<Gallery/>} />
            <Route path="Contact" element={<Contact/>} />
        </Routes>
      
    </div>
  </Router>
);

}

export default Layout;
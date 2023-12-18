import "../style/Layout.css"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Gallery } from "../routes/Gallery";
import { Home } from "../routes/Home";
import  {Users}  from "../routes/Users";
import { Register } from "../routes/Register";
import { Posts } from "../routes/Posts" 
import Logout from "../routes/Logout"
import Login from "../routes/Login";

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
          <Link to="/Login">Logowanie</Link>
        </li>
        <li>
          <Link to="/Register">Rejestracja</Link>
        </li>
        </ul>
        <ul id="logout">
        <li>
          <Link to="/Logout">Wyloguj się</Link>
        </li>
        </ul>
      </ul>

      <hr />    
      </header>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="Gallery" element={<Gallery/>} />
            <Route path="Users" element={<Users/>}/>
            <Route path="Register" element={<Register/>}/>
            <Route path="Posts" element={<Posts/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="Logout" element={<Logout/>}/>
        </Routes>
  </Router>
);

}

export default Layout;
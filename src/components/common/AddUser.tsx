import React, { useState } from 'react';
import "../style/Register.css"
import { UserType } from '../types/User.type';



export const AddUser =() =>{
    const [newUser, setNewUser] = useState()
    
    return(
      <form >
          <h2>Rejestracja</h2>
        <label>
          Name:
          <input type="text" name="name" />
        </label>

        <label>
          Username:
          <input type="text" name="username" />
        </label>

        <label>
          Email:
          <input type="email" name="email" />
        </label>

        <label>
          Company Name:
          <input type="text" name="name" />
        </label>

        <button type="submit">Zarejestruj się</button>
      </form>
    );
}

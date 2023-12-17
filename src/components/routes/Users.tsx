import React, { useState, useEffect } from "react";
import { UserType } from "../types/User.type";
import Loader from "../common/Loader";
import User from "../common/User";
import "../style/Users.css";



export const Users: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
        const newuser: UserType = {
          id: 11,
          name: "admin",
          email: "wonnski@gmail.com",
          password: "admin",
          username: "admin",
        };

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers([...json, newuser]))
      .catch((err) => {
        console.error("Error fetching users:", err);
      });


  }, []);


  return (
    <div className="users">
      {users.length > 0 ? (
        users.map((user: UserType, index) => (
          <User user={user} index={index} key={index} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

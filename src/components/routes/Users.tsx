import React from "react";
import { UserType } from "../types/User.type";
import Loader from "../common/Loader";
import User from "../common/User";
import "../style/Users.css";
import { useApiContext } from "../contexts/ApiContext";

export const Users: React.FC = () => {
  const { users } = useApiContext();

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

import React, { FC } from "react";
import { UserType } from "../types/User.type";

interface Props {
  user: UserType;
  index: number;
}

const User: FC<Props> = ({ user, index }) => {
  return (
    <>
      <a>
        <span className="userCard">
          <h1>{user.username}</h1>
          <p>{user.name}</p>
          <p>Email: {user.email}</p>
          <p>{user.website}</p>
        </span>
      </a>
    </>
  );
};

export default User;

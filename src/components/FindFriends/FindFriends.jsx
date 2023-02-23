import React from "react";
import { useSelector } from "react-redux";
import Friends from "./Friends";
import "./FindFriends.css"

const FindFriends = () => {
  const Users = useSelector((state) => state.usersReducer);
  const currentUser = useSelector((state) => state.currentUserReducer)

  const otherUsers = Users.filter((user) => {return user._id !== currentUser?.result._id})

  return (
    <aside className="right-sidebar-friends">
      <Friends users={otherUsers} />
    </aside>
  );
};

export default FindFriends;

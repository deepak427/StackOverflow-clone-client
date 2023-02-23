import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { useSelector } from "react-redux";
import Friends from "../../components/FindFriends/Friends";
import "./FindFriends.css"

const FindFriends = () => {
  const Users = useSelector((state) => state.usersReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);

  const otherUsers = Users.filter((user) => {
    return user._id !== currentUser?.result._id;
  });
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <aside className="right-sidebar-find-friends">
          <Friends users={otherUsers} />
        </aside>
      </div>
    </div>
  );
};

export default FindFriends;

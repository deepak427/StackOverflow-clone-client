import React from "react";
import Friend from "./Friend";

const FriendsList = ({ show, isFriend }) => {
  return (
    <div className="friend-list-container">
      {show.map((user) => (
        <Friend isFriend={isFriend} user={user} key={user._id} />
      ))}
    </div>
  );
};

export default FriendsList;

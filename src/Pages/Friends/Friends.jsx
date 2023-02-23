import React from "react";
import LeftSideBar from "../../components/LeftSidebar/LeftSidebar";
import FriendsList from "./FriendsList";
import "./Friends.css";
import { useSelector } from "react-redux";

const FriendsHome = () => {
  const User = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => {return user._id=== User?.result._id})

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        {currentProfile.length !== 0 && (
          <>
            {" "}
            <h1 style={{ fontWeight: "400" }}>Friend Requests</h1>
            <p style={{margin: "0"}}>You have {currentProfile[0]?.friendRequests.length} friend requests.</p>
            <FriendsList isFriend="false" show={currentProfile[0]?.friendRequests} />
            <h1 style={{ fontWeight: "400" }}>Friends</h1>
            <p style={{margin: "0"}}>You have {currentProfile[0]?.friends.length} friends.</p>
            <FriendsList isFriend="true" show={currentProfile[0]?.friends} />
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsHome;

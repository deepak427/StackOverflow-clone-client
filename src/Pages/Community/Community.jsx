import React from "react";
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import CommunityMain from '../../components/CommunityMain/CommunityMain'
import FindFriends from '../../components/FindFriends/FindFriends'

const Home = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <CommunityMain />
        <FindFriends />
      </div>
    </div>
  );
};

export default Home;

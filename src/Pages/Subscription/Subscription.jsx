import React from "react";
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import SubscriptionPlans from "../../components/SubscriptionPlans/SubscriptionPlans";
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Home = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <SubscriptionPlans/>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;

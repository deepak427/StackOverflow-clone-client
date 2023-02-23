import React from "react";
import { useSelector } from "react-redux";
import Plan from "./Plan";
import './SubscriptionPlan.css'

const SubscriptionPlans = () => {
  const User = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === User?.result._id)[0];

  const SubscriptionPlans = [
    { planName: "Free", id: 1, noOfQuestions: 1, price: 0, priceId: "" },
    { planName: "Silver", id: 2, noOfQuestions: 5, price: 100, priceId: "price_1MauSKSFuHQsX81wLFxzYNrl" },
    { planName: "Gold", id: 3, noOfQuestions: (<span>&infin;</span>), price: 1000, priceId: "price_1MauUKSFuHQsX81w9u1wTLjT" }
  ];

  const otherPlans = SubscriptionPlans.filter(
    (plan) => plan.planName !== currentProfile?.subscription
  );

  const subscription = currentProfile?.subscription !== "Free" ? "Switch to" : "Subscribe to"

  return (
    <div className="subscription-main">
      {otherPlans.map((plan) => (
        <Plan plan={plan} subscription={subscription} key={plan.id} />
      ))}
    </div>
  );
};

export default SubscriptionPlans;

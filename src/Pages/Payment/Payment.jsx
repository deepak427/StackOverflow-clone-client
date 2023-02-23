import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentHome from "../../components/PaymentHome/PaymentHome";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51MaDXESFuHQsX81w0tzeYGJXBIcqHXfNRnyVj6VIYL4R6h7e3URJV3U3gnQNZ0wDdiliu9M7qLtDAxuGtjR00lQR00mhBGTnXD"
  );

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <Elements stripe={stripePromise}>
          <PaymentHome />
        </Elements>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Payment;

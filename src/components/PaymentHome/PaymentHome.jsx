import React from "react";
import { useState } from "react";
import CardInput from "./CardInput";
import "./PaymentHome.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Payment } from "../../actions/Payment";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";

const PaymentHome = () => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const {id} = useParams();
  const dispatch = useDispatch();

  const email = currentUser?.result.email;
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleSubmitSub = async (event) => {
    event.preventDefault();
    if (isLoading) {
      alert("Processing your payment. Please wait")
      return
    }
    setIsLoading(true)
    if (!stripe || !elements) {
      return;
    }

    if (!name) {
      alert("Enter a name")
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name,
        email,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await Payment(currentUser?.result?._id,{
        payment_method: result.paymentMethod.id,
        name,
        email,
        priceId: id
      });

      const { client_secret, status, updatedProfile } = res.data;

      const updatedUser = {
        result: updatedProfile,
        token: currentUser.token
      }

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log(result.error);
          } else {
            navigate('/')
          }
        });
      } else {
        navigate('/')
      }
      dispatch({type: 'UPDATE_CURRENT_USER', payload: updatedProfile})
      dispatch(setCurrentUser(updatedUser))
      setIsLoading(false)
    }
  };

  return (
    <div className="payment-main">
      <form onSubmit={handleSubmitSub}>
        <label>
        <h4>Email</h4>
        <h5>{email}</h5>
        </label>
        <label htmlFor="name-payment">
          <h4>Name</h4>
          <input
            type="name"
            name="name-payment"
            id="name-payment"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          <CardInput />
        </label>
        <button type="submit" className="payment-btn">
          {isLoading ? "Processing": "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default PaymentHome;

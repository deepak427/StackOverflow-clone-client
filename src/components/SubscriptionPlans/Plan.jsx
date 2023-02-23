import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { PaymentFree } from "../../actions/PaymentFree";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";

const Plan = ({ plan, subscription }) => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFree = async () => {
    const res = await PaymentFree({ email: currentUser?.result.email });

    const { updatedProfile } = res.data;

    const updatedUser = {
      result: updatedProfile,
      token: currentUser.token,
    };

    dispatch({ type: "UPDATE_CURRENT_USER", payload: updatedProfile });
    dispatch(setCurrentUser(updatedUser));
    navigate("/");
  };

  return (
    <div className="plan">
      <div className="plan-details">
        <h4>{plan.planName}</h4>
        {plan.planName !== "Free" &&
          (plan.planName === "Silver" ? (
            <FontAwesomeIcon icon={faStarHalf} />
          ) : (
            <FontAwesomeIcon icon={faStar} />
          ))}
      </div>
      <div className="plan-action">
        <p className="large-para">
          You can ask {plan.noOfQuestions} questions daily
        </p>
        <p className="small-para">{plan.noOfQuestions} Questions/Day</p>
        <p className="large-para">
          Subscribe at <span>&#8377;</span>
          {plan.price}/month
        </p>
        <p className="small-para">
          <span>&#8377;</span>
          {plan.price}/month
        </p>
        {plan.planName !== "Free" ? (
          <>
            {" "}
            <Link to={`/Subscription/${plan.priceId}`} className="buy-btn  large-btn">
              {subscription} {plan.planName}
            </Link>
            <Link
              to={`/Subscription/${plan.priceId}`}
              className="buy-btn small-btn"
            >
              {plan.planName}
            </Link>
          </>
        ) : (
          <>
            <button className="buy-btn large-btn" onClick={handleFree}>
              {subscription} {plan.planName}
            </button>
            <button className="buy-btn small-btn" onClick={handleFree}>
              {plan.planName}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Plan;

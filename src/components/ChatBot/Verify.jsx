import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../actions/askQuestion";
import decode from "jwt-decode";

const Verify = () => {
  const botToken = useSelector((state) => state.verifyReducer);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showVerify, setShowVerify] = useState(true);

  const dispatch = useDispatch();

  const handleOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      dispatch(verify({ email }));
      setShowOtp(true)
    } else {
      if ((otp === decode(botToken).otp.toString()) && (decode(botToken).exp * 1000 > new Date().getTime())) {
        localStorage.setItem('Verify', JSON.stringify({botToken}))
        setShowVerify(false)
      }else {
        alert("incorrect otp!")
      }
    }
  };

  return (
    <>
      {showVerify ? (
        <div className="verify-container">
          <form onSubmit={handleOtp}>
            <label htmlFor="emailVerify">
              <h4>Email</h4>
              <input
                type="email"
                name="email"
                id="emailVerify"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            {showOtp && (
              <label htmlFor="otp">
                <h4>OTP</h4>
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </label>
            )}
            <button type="submit" className="verify-btn">
              Verify
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Verify;

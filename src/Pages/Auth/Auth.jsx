import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../actions/auth";
import icon from "../../assets/icon.svg";
import AboutAuth from "./AboutAuth";
import './Auth.css'

const Auth = () => {
  const [isSignup, setSignup] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email && !password) {
      alert('Enter email and password')
    }
    if (isSignup) {
      if (!name) {
        alert('Enter a name to continue')
      }
      dispatch(signup({name, email, password}, navigate))
    }else{
      dispatch(login({email, password}, navigate))
    }
    document.getElementsByClassName("auth-btn")[0].disabled = true;
  }

  return (
    <section className="auth-section">
        {isSignup && <AboutAuth/>}
      <div className="auth-container-2">
        {!isSignup && <img src={icon} alt="Stacoverflow" className="login-logo" />}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input type="name" id="name" onChange={(e) => {setName(e.target.value)}}/>
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
          </label>
          <label htmlFor="password">
            <div style={{display:"flex", justifyContent: "space-between"}}>
              <h4>Password</h4>
              {!isSignup && <p style={{color:"#007ac6", fontSize: "13px"}}>Forget password?</p>}
            </div>
            <input type="password" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} />
            {isSignup && (
              <p style={{color: "#666767", fontSize: "13px"}}>
                Password must contain at least 1 upper case
              </p>
            )}
          </label>
          {isSignup && (
            <label htmlFor="check">
              <input type="checkbox" id="check" />
              <p style={{fontSize:"13px"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                <br />
                reprehenderit, tempora repudiandae magni quos et distinctio iure
                <br />
                temporibus adipisci dolores dolorum excepturi id ab nostrum unde
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
          {isSignup && (
            <p style={{color:"#666767", fontSize:"13px"}}>
              Lorem ipsum dolor sit amet consectetur{" "}
              <span style={{color:"#007ac6"}}>adipisicing elit</span>. Quasi
              <br />
              <span style={{color:"#007ac6"}}>adipisicing elit</span>.
              <br />
              temporibus adipisci dolores <span style={{color:"#007ac6"}}>adipisicing elit</span>. dolorum
              excepturi id ab nostrum unde
              <br />
              doloribus officia cupiditate reiciendis?
            </p>
          )}
        </form>
        <p>
          {isSignup ? "Already an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;

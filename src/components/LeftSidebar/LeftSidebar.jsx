import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import globe from "../../assets/globe.svg";
import "./LeftSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome, faMoneyBill, faPerson, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const LeftSidebar = () => {
  const User = useSelector((state) => state.currentUserReducer);

  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink to="/" className="side-nav-links" activeclass="active">
          <FontAwesomeIcon style={{ padding: "1.2em 10px 1em 0px" }} icon={faHome} />
          <p className="display">Home</p>
        </NavLink>
        <NavLink
          to={User === null ? "/Auth" : "/Subscription"}
          className="side-nav-links"
          activeclass="active"
        >
          <FontAwesomeIcon
            style={{ padding: "1.2em 10px 1em 0px" }}
            icon={faMoneyBill}
          />
          <p className="display">Subscription</p>
        </NavLink>
        <NavLink
          to="/Community"
          className="side-nav-links"
          activeclass="active"
        >
          <FontAwesomeIcon
            style={{ padding: "1.2em 10px 1em 0px" }}
            icon={faUserGroup}
          />
          <p className="display">Community</p>
        </NavLink>
        <NavLink
          to="/FindFriends"
          className="side-nav-links find-friends"
          activeclass="active"
        >
          <FontAwesomeIcon
            style={{ padding: "1.2em 10px 1em 0px" }}
            icon={faPerson}
          />
          <p className="display">Find Friends</p>
        </NavLink>
        <div className="side-nav-div display">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to="/Questions"
            className="side-nav-links"
            activeclass="active"
          >
            <img src={globe} alt="Globe" width="20px" />
            <p style={{ paddingLeft: "10px" }} className="display">Questions</p>
          </NavLink>
          <NavLink
            to="/Tags"
            className="side-nav-links"
            activeclass="active"
            style={{ paddingLeft: "40px" }}
          >
            <p className="display">Tags</p>
          </NavLink>
          <NavLink
            to="/Users"
            className="side-nav-links"
            activeclass="active"
            style={{ paddingLeft: "40px" }}
          >
            <p className="display">Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;

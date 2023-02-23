import React from "react";
import Friend from "./Friend";
import search from "../../assets/search.svg";
import { useState } from "react";
import { useEffect } from "react";

const Friends = ({ users }) => {
  const [searchedUser, setSerach] = useState("");
  const [searched, setSearched] = useState(users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchedUser && searchedUser.split(" ").join("").length !== 0) {
      setSearched(
        users.filter((user) => {
          return (
            user.name.toLowerCase().split(" ").join("").includes(
            searchedUser.toLowerCase().split(" ").join(""))
          );
        })
      );
    } else {
      setSearched(users);
      alert("Please enter name of friend");
    }
  };

  useEffect(() => {
    searched.length === 0 && setSearched(users);
  });

  return (
    <div className="find-friends-container">
      <h4>Find Friends</h4>
      <form onSubmit={handleSubmit}>
        <input
        value={searchedUser}
          type="text"
          placeholder="search..."
          onChange={(e) => {
            setSerach(e.target.value);
          }}
        />
        <img
          src={search}
          style={{ cursor: "pointer" }}
          onClick={handleSubmit}
          alt="logo"
          width="20"
          className="search-icon"
        />
      </form>
      <div className="all-users">
        {searched.map((user) => (
          <Friend user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

export default Friends;

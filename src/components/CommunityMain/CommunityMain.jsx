import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostList from "./PostList";
import "./CommunityMain.css";

const CommunityMain = () => {
  const user = useSelector((state) => state.currentUserReducer);

  const postList = useSelector((state) => state.postReducer);

  return (
    <div>
      <div className="main-bar-community">
        <div className="main-bar-community-header">
          <Link to={user === null ? "/Auth" : "/Friends"} className="friend-btn">
            Friends
          </Link>
          <Link to={user === null ? "/Auth" : "/Post"} className="post-btn">
            Post Something
          </Link>
        </div>
        {postList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="post-container-outer">
              <PostList postList={postList.data.reduce((acc, item)=> [item].concat(acc), [])} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityMain;

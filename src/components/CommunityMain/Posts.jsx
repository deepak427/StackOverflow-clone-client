import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import CommentList from "./CommentList";
import "./Comment.css";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../actions/post";
import { deletePost } from "../../actions/post";
import { addFriend, deleteFriend } from "../../actions/users";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const Posts = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();

  const User = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => {
    return user._id === User?.result._id;
  });

  const isFriend = currentProfile[0]?.friends.filter((friend) => {
    return friend.friendId === post.userId;
  });

  const sentRequest = currentProfile[0]?.sentRequests.filter((friend) => {
    return friend === post.userId;
  });

  const recivedRequest = currentProfile[0]?.friendRequests.filter((friend) => {
    return friend.friendId === post.userId;
  });

  const handleLike = () => {
    User === null
      ? alert("Login to like post")
      : dispatch(likePost(post._id, User?.result._id));
  };

  const handleFriend = () => {
    dispatch(addFriend(User?.result._id, { friendId: post.userId }));
  };

  const handleDeleteFriend = () => {
    dispatch(deleteFriend(User?.result._id, { friendId: post.userId }));
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <Link to={`/Users/${post.userId}`} className="user-Profile-Link">
          <Avatar
            backgroundColor="#009dff"
            px="10px"
            py="7px"
            borderRadius="50%"
            color="white"
          >
            {post.userPosted.charAt(0).toUpperCase()}
          </Avatar>
          <div className="user-detail">
            <h4>{post.userPosted}</h4>
            <p>
              Posted {moment(post.postedOn).fromNow()}
            </p>
          </div>
        </Link>
        {User && (
          <>
            {post.userId !== User?.result._id ? (
              <>
                {isFriend?.length === 0 ? (
                  <>
                    {sentRequest.length === 0 && recivedRequest.length === 0 ? (
                      <button className="add-friend-btn" onClick={handleFriend}>
                        <span> Add Friend </span>{" "}
                        <FontAwesomeIcon
                          className="plus-display"
                          icon={faPlus}
                        />
                      </button>
                    ) : (
                      <button
                        style={{ cursor: "auto" }}
                        className="add-friend-btn"
                      >
                        Pending
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="add-friend-btn"
                    onClick={handleDeleteFriend}
                  >
                    Remove Friend
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                className="delete-post-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
      {console.log()}
      <p>{post.caption}</p>
      {post.url && (
        <>
          {post.url?.slice(Math.max(post.url.length - 3, 0)) === "mp4" ? (
            <video controls>
              <source src={post.url} type="video/mp4" />
              Your browser does not support the html video tag.
            </video>
          ) : (
            <img src={post.url} alt={post.userPosted} width="200" />
          )}
        </>
      )}
      <div className="liked-by">
        <p>{post.likedBy.length} likes</p>
        <p>{post.comments.length} comments</p>
      </div>
      <div className="post-bottom">
        <div className="like-comment" onClick={handleLike}>
          {post.likedBy.findIndex((id) => id === String(User?.result._id)) ===
          -1 ? (
            <FontAwesomeIcon icon={faHeart} style={{ transition: "0.3s" }} />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "red", transition: "0.3s" }}
            />
          )}
          <p>like</p>
        </div>
        <div
          className="like-comment"
          onClick={() => setShowComment(!showComment)}
        >
          <FontAwesomeIcon icon={faComment} />
          <p>comment</p>
        </div>
      </div>
      {showComment && (
        <CommentList
          userId={User?.result._id}
          postId={post._id}
          commentedTo={post.userPosted}
          id={post._id}
          user={User?.result.name}
          commentList={post.comments.reduce((acc, item)=> [item].concat(acc), [])}
        />
      )}
    </div>
  );
};

export default Posts;

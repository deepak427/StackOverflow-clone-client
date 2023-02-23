import React from "react";
import Avatar from "../Avatar/Avatar";
import moment from "moment/moment";
import { deleteComment } from "../../actions/post";
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ comment, postId, userId }) => {
  const User = useSelector((state) => state.currentUserReducer);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteComment(postId, { commentId: comment._id }));
  };

  return (
    <div className="comment-container">
      <Avatar
        backgroundColor="#009dff"
        px="10px"
        py="7px"
        borderRadius="50%"
        color="white"
      >
        {comment.userCommented.charAt(0).toUpperCase()}
      </Avatar>
      <div className="comment-main">
        <div style={{flexDirection: "row",justifyContent: "space-between"}} className="user-detail">
        <h4>{comment.userCommented}</h4>
          <p>Commented {moment(comment.commentedOn).fromNow()}</p>
        </div>
        <div className="comment-main-content">
          <p>{comment.commentBody}</p>
        </div>
        {User?.result._id === comment.userId && (
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;

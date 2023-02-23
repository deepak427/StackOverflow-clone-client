import React from "react";
import Comment from "./Comment";
import Avatar from "../Avatar/Avatar";
import { postComment } from "../../actions/post";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CommentList = ({id, commentList, user, commentedTo, postId, userId }) => {

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleComment = () => {
    if (comment === '') {
      alert("Enter answer")
    }else{
      setComment("");
      dispatch(postComment({ id, commentBody: comment , userCommented: user, commentedto: commentedTo, userId}))
    }
  };

  return (
    <>
      <div className="put-comment">
        {user && (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="7px"
              borderRadius="50%"
              color="white"
            >
              {user.charAt(0).toUpperCase()}
            </Avatar>
            <input type="text" value={comment} onChange={(e) => {setComment(e.target.value)}} />
            <button className="put-comment-btn" onClick={handleComment}>
              Comment
            </button>
          </>
        )}
      </div>
      {commentList.map((comment) => (
        <Comment postId={postId} comment={comment} key={comment._id} />
      ))}
    </>
  );
};

export default CommentList;

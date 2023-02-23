import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Post.css";
import { post } from "../../actions/post";
import { useNavigate } from "react-router-dom";

const Post = () => {
  var check = "";
  const [postCaption, setPostCaption] = useState("");
  const [postImage, setpostImage] = useState();

  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectFile = (e) => setpostImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    postImage?.type.split("/")[0] === "video"
      ? (check = "video")
      : (check = "my_file");

    data.append(check, postImage);
    dispatch(
      post(
        data,
        check,
        {
          caption: postCaption,
          userId: User?.result._id,
          userPosted: User?.result.name,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setPostCaption(postCaption + "\n");
    }
  };

  return (
    <div className="post-something">
      <div className="post-something-container">
        <div className="post-something-header">
          <h1>Post Something</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="post-form-container">
            <label htmlFor="post-something-caption">
              <h4>Caption</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
                nesciunt.
              </p>
              <textarea
                id="post-something-caption"
                onChange={(e) => {
                  setPostCaption(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="post-something-image">
              <h4>Image/Video</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
                nesciunt.
              </p>
              <div className="image-container">
                {postImage && (
                  <h4 style={{ marginBottom: "5px" }}> {postImage.name}</h4>
                )}
                <label htmlFor="file" className="btn-grey">
                  {" "}
                  select file (image or .mp4)
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={handleSelectFile}
                  multiple={false}
                />
              </div>
            </label>
          </div>
          <input
            style={{ animation: "0.3s" }}
            type="submit"
            value={"Review your post"}
            onClick={() => {
              document.getElementsByTagName("input")[2].value = "Pending....";
              document.getElementsByTagName("input")[2].style. cursor = "auto";
            }}
            className="post-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default Post;

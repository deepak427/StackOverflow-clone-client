import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { acceptFriend } from "../../actions/users";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend } from "../../actions/users";

const Friend = ({ user, isFriend }) => {
  const dispatch = useDispatch();

  const User = useSelector((state) => state.currentUserReducer);

  return (
    <>
      {User && (
        <div className="friend-container">
          <Link to={`/Users/${user.friendId}`} className="user-Profile-Link">
            <h3>{user.friendName.charAt().toUpperCase()}</h3>
            <h5>{user.friendName}</h5>
          </Link>
          {isFriend === "false" ? (
            <>
              {" "}
              <FontAwesomeIcon
                className="friend-icon"
                onClick={() => {
                  dispatch(
                    acceptFriend(User?.result._id, {
                      friendId: user.friendId,
                      acceptance: true,
                    })
                  );
                }}
                icon={faCheck}
              />
              <FontAwesomeIcon
                className="friend-icon"
                onClick={() => {
                  dispatch(
                    acceptFriend(User?.result._id, {
                      friendId: user.friendId,
                      acceptance: false,
                    })
                  );
                }}
                icon={faClose}
              />{" "}
            </>
          ) : (
            <FontAwesomeIcon
              className="friend-icon"
              onClick={() => {
                  dispatch(deleteFriend(User?.result._id, { friendId: user.friendId}));
              }}
              icon={faClose}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Friend;

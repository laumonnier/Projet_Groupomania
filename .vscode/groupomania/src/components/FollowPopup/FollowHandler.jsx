import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/user.actions";
import { isEmpty } from "../../utils/Empty";
import "../../style/Profile/FollowHandler.css";

const FollowHandler = ({ idToFollow }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          <button className="following-follow-card-unfollow">
            Suivi
            <img
              className="following-unfollow-card-icon"
              src="./images/icon/follow.png"
              alt="follow"
            />
          </button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          <button className="following-follow-card-following">
            Suivre
            <img
              className="following-follow-card-icon"
              src="./images/icon/following.png"
              alt="following"
            />
          </button>
        </span>
      )}
    </>
  );
};

export default FollowHandler;

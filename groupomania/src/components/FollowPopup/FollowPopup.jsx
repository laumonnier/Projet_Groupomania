import React, { useState } from "react";
import FollowHandler from "../Profile/FollowHandler";
import "../../style/FollowPopup.css";

const FollowPopup = ({ userData, usersData }) => {
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  return (
    <>
      {/* <div className="follow-profile"> */}

      <p
        className={
          window.location.href === "http://localhost:3000/profile"
            ? "following"
            : "newPost-following"
        }
        onClick={() => setFollowingPopup(true)}
      >
        {" "}
        Following(s): {userData.following ? userData.following.length : "0"}
      </p>
      <p
        className={
          window.location.href === "http://localhost:3000/profile"
            ? "followers"
            : "newPost-followers"
        }
        onClick={() => setFollowersPopup(true)}
      >
        {" "}
        Follower(s): {userData.followers ? userData.followers.length : "0"}
      </p>
      {/* </div> */}
      {followingPopup && (
        <div className="popup-profile-container">
          <div className="modal">
            <p className="follow-profile-title"> Following </p>
            <span className="close" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  // console.log(window.location.href);
                  if (user._id === userData.following[i]) {
                    return (
                      <li className="user-summary" key={user._id}>
                        <img
                          id="user-image-profile"
                          src={user.picture}
                          alt="User_image"
                        />
                        <p id="pseudo-follow">{user.pseudo}</p>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggest"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profile-container">
          <div className="modal">
            <p className="follow-profile-title"> Followers </p>
            <span className="close" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li className="user-summary" key={user._id}>
                        <img
                          id="user-image-profile"
                          src={user.picture}
                          alt="User_image"
                        />
                        <p id="pseudo-follow">{user.pseudo}</p>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggest"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowPopup;

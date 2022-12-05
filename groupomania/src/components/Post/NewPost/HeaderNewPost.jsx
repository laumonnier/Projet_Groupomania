import React from "react";
import "../../../style/LoadingSpinner.css";
import { Link } from "react-router-dom";
import FollowPopup from "../../FollowPopup/FollowPopup.jsx";
import "../../../style/pages/Home/NewPost/HeaderNewPost.css";

const HeaderNewPost = ({ userData, usersData }) => {
  //Will recover user data, both images, messages or other thanks to the "store"

  return (
    <>
      <div className="newPost-post-header">
        <div className="newPost-post-header-user-picture">
          <Link to="/profile">
            <img
              className="newPost-post-picture"
              src={userData.picture}
              alt="user_picture"
            />
          </Link>
          <p className="newPost-post-user-name">{userData.pseudo}</p>
          <div className="newPost-post-header-follow">
            <FollowPopup userData={userData} usersData={usersData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNewPost;

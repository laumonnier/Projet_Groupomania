import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import "../../../style/pages/Home/NewPost.css";
import { isEmpty } from "../../../utils/Empty";
import FollowPopup from "../../FollowPopup/FollowPopup";
import { useSelector } from "react-redux";

const NewPost = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);

  const handleFollower = () => {};

  const handleFollowing = () => {};

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="newPost-post-container">
      <div className="newPost-post-header">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="newPost-post-header-follow">
              <FollowPopup userData={userData} usersData={usersData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewPost;

import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import "../../../style/pages/Home/NewPost.css";
import { isEmpty } from "../../../utils/Empty";
import FollowPopup from "../../FollowPopup/FollowPopup";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { timestampParser } from "../../../utils/date";

const NewPost = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);

  const handlePicture = () => {};

  const handlePost = () => {};

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

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

            <div className="newPost-post-body-container">
              <div className="newPost-post-body">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Nouveau Post ?"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                {message || postPicture ? (
                  <div className="newPost-post-card-container">
                    <div className="newPost-post-card-header">
                      <div className="newPost-post-card-identifier-block">
                        <img
                          className="newPost-post-card-header-picture"
                          src={userData.picture}
                          alt="user_picture"
                        />
                        <p className="newPost-post-card-header-pseudo">
                          {userData.pseudo}
                        </p>
                      </div>
                      <span className="newPost-post-card-header-date">
                        {timestampParser(Date.now())}
                      </span>
                      <div className="newPost-post-card-body">
                        <p className="newPost-post-card-body-message">
                          {message}
                        </p>
                        <img src={postPicture} alt="" />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="newPost-post-footer-container">
                <div className="newPost-post-footer-icon-image">
                  <>
                    <img
                      className="newPost-post-footer-icon"
                      src="./images/icon/album-icon-photo-album-png-transparent-png.png"
                      alt="image_icon"
                    />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                  {picture && (
                    <button
                      className="newPost-post-footer-delete-image"
                      onClick={() => setPicture("")}
                    >
                      Supprimer Image
                    </button>
                  )}
                </div>
                <div className="newPost-post-footer-send">
                  {message || postPicture || file ? (
                    <>
                      <button
                        className="newPost-post-footer-button-canceled"
                        onClick={cancelPost}
                      >
                        Annuler message
                      </button>
                      <button
                        className="newPost-post-footer-button-send"
                        onClick={handlePost}
                      >
                        Envoyer !
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewPost;

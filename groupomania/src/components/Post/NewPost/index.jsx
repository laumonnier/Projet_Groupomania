import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import "../../../style/pages/Home/NewPost.css";
import { isEmpty } from "../../../utils/Empty";
import FollowPopup from "../../FollowPopup/FollowPopup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { timestampParser } from "../../../utils/date";
import { addPost, getPosts } from "../../../redux/actions/post.actions";

const NewPost = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const usersData = useSelector((state) => state.usersReducer);
  const errorData = useSelector((state) => state.errorReducer.postErrors);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData, message]);

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
                  className="newPost-post-body-text"
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
                    </div>
                    <div className="newPost-post-card-body">
                      <p className="newPost-post-card-body-message">
                        {message}
                      </p>
                      <img
                        className="newPost-post-card-body-picture"
                        src={postPicture}
                        alt=""
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="newPost-post-footer">
                <div className="newPost-post-footer-container">
                  <div className="newPost-footer-image-block">
                    <div className="newPost-post-footer-icon-image">
                      <>
                        <input
                          className="newPost-post-footer-icon-input"
                          type="file"
                          id="file-upload"
                          name="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => handlePicture(e)}
                        />
                        <label htmlFor="file-upload">
                          <img
                            className="newPost-post-footer-icon"
                            src="./images/icon/album-icon-photo-album-png-transparent-png.png"
                            alt="image_icon"
                          />
                        </label>
                      </>
                    </div>
                    {postPicture && (
                      <button
                        className="newPost-post-footer-delete-image"
                        onClick={() => setPostPicture("")}
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
                <div className="newPost-post-footer-error">
                  {!isEmpty(errorData.format) && alert(errorData.format)}
                  {!isEmpty(errorData.maxSize) && alert(errorData.maxSize)}
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

import React from "react";
import { timestampParser } from "../../../utils/date";
import "../../../style/pages/Home/NewPost/BodyNewPost.css";

const BodyNewPost = ({ userData, message, setMessage, postPicture }) => {
  return (
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
            <p className="newPost-post-card-body-message">{message}</p>
            <img
              className="newPost-post-card-body-picture"
              src={postPicture}
              alt=""
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BodyNewPost;

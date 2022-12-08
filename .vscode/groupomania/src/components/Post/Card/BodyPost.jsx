import React from "react";
import "../../../style/Post/Card/BodyPost.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../redux/actions/post.actions";
import { deletePost } from "../../../redux/actions/post.actions";

const BodyPost = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdatePost = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
      console.log(post.posterId);
      console.log(userData._id);
    }
    setIsUpdated(false);
  };

  const deleteQuote = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <div className="post-body-container">
      <div className="post-body-update-delete-block">
        {userData._id === post.posterId && (
          <div onClick={() => setIsUpdated(!isUpdated)}>
            <img
              className="post-body-update-button"
              src="./images/icon/change-text-post1.png"
              alt="change_update_icon"
            />
          </div>
        )}
        {(userData._id === post.posterId || userData.role === "admin") && (
          <div
            onClick={() => {
              //Will trigger a message like an "alert"
              if (window.confirm("Voulez-vous vraiment supprimer ce Post ?")) {
                deleteQuote();
              }
            }}
          >
            <img
              className="post-body-delete-button"
              src="./images/icon/delete-127.png"
              alt="delete_post"
            />
          </div>
        )}
      </div>
      {isUpdated === false && (
        <p className="post-body-message">{post.message}</p>
      )}
      {isUpdated && (
        <>
          <div className="post-body-message-container">
            <textarea
              className="post-body-update-message"
              type="text"
              defaultValue={post.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            ></textarea>
            <button
              className="post-body-update-message-validate"
              onClick={handleUpdatePost}
            >
              Validation modifications
            </button>
          </div>
        </>
      )}
      {post.picture && (
        <img
          className="post-body-picture"
          src={post.picture}
          alt="picture_post"
        />
      )}
    </div>
  );
};

export default BodyPost;

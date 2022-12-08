import React from "react";
import { isEmpty } from "../../../utils/Empty";
import "../../../style/pages/Home/NewPost/FooterNewPost.css";

const FooterNewPost = ({
  errorData,
  message,
  file,
  postPicture,
  handlePicture,
  cancelPicture,
  cancelPost,
  handlePost,
}) => {
  return (
    <>
      <div className="newPost-post-footer">
        <div className="newPost-post-footer-container">
          <div className="newPost-footer-image-block">
            <div className="newPost-post-footer-icon-image">
              <>
                <label htmlFor="file-upload">
                  <img
                    className="newPost-post-footer-icon"
                    src="./images/icon/album-icon-photo-album-png-transparent-png.png"
                    alt="image_icon"
                  />
                </label>
                <input
                  className="newPost-post-footer-icon-input"
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              </>
            </div>
            {postPicture && (
              <button
                className="newPost-post-footer-delete-image"
                onClick={cancelPicture}
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
    </>
  );
};

export default FooterNewPost;

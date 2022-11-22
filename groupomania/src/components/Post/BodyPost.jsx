import React from "react";
import "../../style/BodyPost.css";

const BodyPost = ({ post }) => {
  return (
    <div className="post-body-container">
      <p className="post-body-message">{post.message}</p>
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

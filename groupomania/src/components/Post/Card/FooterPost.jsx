import React from "react";
import "../../../style/Post/Card/FooterPost.css";
import LikeButton from "../../LikeButton";

const FooterPost = ({ post }) => {
  return (
    <div className="post-footer-container">
      <div className="post-footer-like-block">
        <LikeButton post={post} />
        <p className="post-footer-like-number">{post.usersLiked.length}</p>
      </div>
      <div className="post-footer-comment-block">
        <img
          id="post-footer-icon-comment"
          src="./images/icon/icon-comment.png"
          alt="icon_comment"
        />
        <div className="post-footer-number-comment">{post.comments.length}</div>
      </div>
    </div>
  );
};

export default FooterPost;

import React, { useState } from "react";
import "../../../style/Post/Card/FooterPost.css";
import LikeButton from "../../LikeButton/index.jsx";
import PostComments from "../PostComments";

const FooterPost = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="post-footer-container">
      <div className="post-footer-icons-container">
        <div className="post-footer-like-block">
          <LikeButton post={post} />
          <p className="post-footer-like-number">{post.usersLiked.length}</p>
        </div>
        <div className="post-footer-comment-container">
          <div className="post-footer-comment-block">
            <img
              id="post-footer-icon-comment"
              src="./images/icon/icon-comment.png"
              alt="icon_comment"
              onClick={() => setShowComments(!showComments)}
            />
            <div className="post-footer-number-comment">
              {post.comments.length}
            </div>
          </div>
        </div>
      </div>
      {showComments && <PostComments post={post} />}
    </div>
  );
};

export default FooterPost;

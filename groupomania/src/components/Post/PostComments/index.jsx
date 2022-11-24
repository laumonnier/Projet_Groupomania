import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../style/Post/Comments/PostComments.css";
import { dateParser } from "../../../utils/date";
import { isEmpty } from "../../../utils/Empty";
import HeaderComments from "./HeaderComments";

const PostComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = () => {};

  return (
    <div className="postComments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId !== userData._id
                ? "postComment-container"
                : "postComment-container-user"
            }
            key={comment._id}
          >
            <HeaderComments post={post} comment={comment} key={comment._id} />
            <p className="postComments-body">{comment.comment}</p>
          </div>
        );
      })}
      {(userData._id || userData.role === "admin") && (
        <form className="postComments-form" action="" onSubmit={handleComment}>
          <input
            className="postComments-form-comment"
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Commentaire pour ce post !!!"
          />
          <input
            className="postComments-form-submit"
            type="submit"
            value="Envoyer"
          />
        </form>
      )}
    </div>
  );
};

export default PostComments;

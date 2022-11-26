import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../../redux/actions/post.actions";
import "../../../style/Post/Comments/PostComments.css";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import HeaderComments from "./HeaderComments";

const PostComments = ({ post }) => {
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

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
            <div className="postComment-edit-delete-block">
              <p className="postComments-body">{comment.text}</p>
              <EditComment comment={comment} postId={post._id} />
              <DeleteComment comment={comment} postId={post._id} />
            </div>
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

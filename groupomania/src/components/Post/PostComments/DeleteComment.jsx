import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../redux/actions/post.actions";
import "../../../style/Post/Comments/DeleteComment.css";

const DeleteComment = ({ postId, userData, comment, edit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  return (
    <div className="delete-comment-container">
      {((userData._id === comment.commenterId && edit === false) ||
        (userData.role === "admin" && edit === false)) && (
        <div
          onClick={() => {
            if (
              window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")
            ) {
              handleDelete();
            }
          }}
        >
          <img
            id="delete-comment-icon"
            src="./images/icon/delete_comment1.png"
            alt="delete_comment"
          />
        </div>
      )}
    </div>
  );
};

export default DeleteComment;

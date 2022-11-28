import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../redux/actions/post.actions";
import "../../../style/Post/Comments/DeleteComment.css";
import { UserIdContext } from "../../../utils/context";

const DeleteComment = ({ postId, userData, comment }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../style/Post/Comments/EditComment.css";
import { editComment } from "../../../redux/actions/post.actions";

const EditComment = ({ comment, edit, setEdit, userData, postId }) => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  return (
    <div className="edit-comment-container">
      {((userData._id === comment.commenterId && edit === false) ||
        (userData.role === "admin" && edit === false)) && (
        <div onClick={() => setEdit(!edit)}>
          <img
            id="edit-comment-icon"
            src="./images/icon/edit_comment.png"
            alt="edit_comment"
          />
        </div>
      )}
      {((userData._id === comment.commenterId && edit) ||
        (userData.role === "admin" && edit)) && (
        <form
          className="edit-comment-form-container"
          action=""
          onSubmit={handleEdit}
        >
          <div className="edit-comment-form-block">
            <div className="edit-comment-form-cancel-validate">
              <label
                className="edit-comment-form-label"
                htmlFor="edit"
                onClick={() => setEdit(!edit)}
              >
                Annuler !
              </label>
              <input
                className="edit-comment-form-validate"
                type="submit"
                value="Valider"
              />
            </div>
            <textarea
              className="edit-comment-form-change"
              type="text"
              name="edit"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.text}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditComment;

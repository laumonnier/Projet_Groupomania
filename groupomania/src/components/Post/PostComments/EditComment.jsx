import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserIdContext } from "../../../utils/context";
import "../../../style/Post/Comments/EditComment.css";
import { editComment } from "../../../redux/actions/post.actions";

const EditComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const userId = useContext(UserIdContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (userId === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userId, comment.commenterId]);

  return (
    <div className="edit-comment-container">
      {isAuthor && edit === false && (
        <div onClick={() => setEdit(!edit)}>
          <img
            id="edit-comment-icon"
            src="./images/icon/edit_comment.png"
            alt="edit_comment"
          />
        </div>
      )}
      <form
        className="edit-comment-form-container"
        action=""
        onSubmit={handleEdit}
      >
        <div className="edit-comment-form-block">
          <label
            className="edit-comment-form-label"
            htmlFor="edit"
            onClick={() => setEdit(!edit)}
          >
            Editer le Texte !
          </label>
          <input
            className="edit-comment-form-change"
            type="text"
            name="edit"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <input
            className="edit-comment-form-validate"
            type="submit"
            value="Valider"
          />
        </div>
      </form>
    </div>
  );
};

export default EditComment;

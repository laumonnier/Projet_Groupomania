import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { UserIdContext } from "../../../utils/context";
import "../../../style/Post/Comments/EditComment.css";
import { editComment } from "../../../redux/actions/post.actions";

const EditComment = ({ comment, userData, postId }) => {
  //   const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  //   const userData = useSelector((state) => state.userReducer());
  //   const userId = useContext(UserIdContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  //   useEffect(() => {
  //     const checkAuthor = () => {
  //       if (userData._id === comment.commenterId) {
  //         setIsAuthor(true);
  //       }
  //     };
  //     checkAuthor();
  //   }, [userData._id, comment.commenterId]);

  return (
    <div className="edit-comment-container">
      {userData._id === comment.commenterId && edit === false && (
        <div onClick={() => setEdit(!edit)}>
          <img
            id="edit-comment-icon"
            src="./images/icon/edit_comment.png"
            alt="edit_comment"
          />
        </div>
      )}
      {userData._id === comment.commenterId && edit && (
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

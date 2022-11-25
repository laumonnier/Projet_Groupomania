import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../../utils/context";
import "../../style/LikeButton.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userId = useContext(UserIdContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, userId));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, userId));
    setLiked(false);
  };

  useEffect(() => {
    if (post.usersLiked.includes(userId)) setLiked(true);
    else setLiked(false);
  }, [userId, post.usersLiked, liked]);

  return (
    <div className="like-button-container">
      {userId === null && (
        <img
          className="like-button-icon"
          src="./images/icon/hearth_empty_icon.png"
          alt="icon_coeur_vide"
        />
      )}
      {userId && liked === false && (
        <img
          className="like-button-icon"
          src="./images/icon/hearth_empty_icon.png"
          alt="icon_coeur_vide"
          onClick={like}
        />
      )}
      {userId && liked && (
        <img
          className="like-button-icon"
          src="./images/icon/hearth_full_icon.png"
          alt="icon_coeur_rempli"
          onClick={unlike}
        />
      )}
    </div>
  );
};

export default LikeButton;

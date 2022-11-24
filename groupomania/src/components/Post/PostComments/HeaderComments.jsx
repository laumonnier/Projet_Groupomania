import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../style/Post/Comments/HeaderComments.css";
import { dateParser, timestampParser } from "../../../utils/date";
import { isEmpty } from "../../../utils/Empty";

const HeaderComments = ({ post, comments }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  return (
    <>
      <div className="postComments-header">
        <div className="postComments-header-block-identifier">
          <img
            id="postComments-header-user-picture"
            src={
              !isEmpty(usersData[0]) &&
              usersData
                /*Will allow to have the phot at the moment t, because the user could 
                change image, so we are forced to "map()" user data to search for photos! */
                .map((user) => {
                  if (user._id === comments.commenterId) return user.picture;
                  else return null;
                })
                .join("") // Will avoid having "," between each element
            }
            alt="user_picture"
          />
          <p className="postComments-header-post-userName">
            {!isEmpty(usersData[0]) &&
              usersData.map((user) => {
                if (user._id === comments.commentId) return user.pseudo;
                else return null;
              })}
          </p>
        </div>
        <div className="postComments-header-post-date">
          {timestampParser(comments.timestamp)}
        </div>
      </div>
    </>
  );
};

export default HeaderComments;

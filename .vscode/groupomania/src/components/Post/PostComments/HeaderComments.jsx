import React from "react";
import { useSelector } from "react-redux";
import "../../../style/Post/Comments/HeaderComments.css";
import { timestampParser } from "../../../utils/date";
import { isEmpty } from "../../../utils/Empty";

const HeaderComments = ({ post, comment }) => {
  const usersData = useSelector((state) => state.usersReducer);

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
                  if (user._id === comment.commenterId) return user.picture;
                  else return null;
                })
                .join("") // Will avoid having "," between each element
            }
            alt="user_picture"
          />
          <p className="postComments-header-post-userName">
            {!isEmpty(usersData[0]) &&
              usersData.map((user) => {
                if (user._id === comment.commenterId) return user.pseudo;
                else return null;
              })}
          </p>
        </div>
        <div className="postComments-header-post-date">
          {timestampParser(comment.timestamp)}
        </div>
      </div>
    </>
  );
};

export default HeaderComments;

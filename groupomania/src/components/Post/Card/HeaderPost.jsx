import React from "react";
import "../../../style/LoadingSpinner.css";
import "../../../style/Post/Card/HeaderPost.css";
import { useSelector } from "react-redux";
import { isEmpty } from "../../../utils/Empty";
import { dateParser } from "../../../utils/date";
import FollowHandler from "../../Profile/FollowHandler";

const HeaderPost = ({ post }) => {
  //Will recover user data, both images, messages or other thanks to the "store"
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  return (
    <>
      <div className="card-header">
        <div className="card-header-block-identifier">
          <img
            id="card-header-user-picture"
            src={
              !isEmpty(usersData[0]) &&
              usersData
                /*Will allow to have the phot at the moment t, because the user could 
                change image, so we are forced to "map()" user data to search for photos! */
                .map((user) => {
                  if (user._id === post.posterId) return user.picture;
                  else return null;
                })
                .join("") // Will avoid having "," between each element
            }
            alt="user_picture"
          />
          <div className="postComments-header-post-pseudo-follow-block">
            <p className="card-header-post-userName">
              {!isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (user._id === post.posterId) return user.pseudo;
                  else return null;
                })}
            </p>
          </div>
        </div>
        <div className="card-header-post-date">
          {dateParser(post.createdAt)}
        </div>
      </div>
    </>
  );
};

export default HeaderPost;

import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import "./../../style/LoadingSpinner.css";
import "../../style/Card.css";
import { useSelector } from "react-redux";
import { isEmpty } from "../../utils/Empty";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  //Will recover user data, both images, messages or other thanks to the "store"
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="card-container" key={post._id}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="card-header">
            <img
              id="card-user-picture"
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  /*Will allow to have the phot at the moment t, because the user could 
                change image, so we are forced to "map()" user data to search for photos! */
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                  })
                  .join("") // Will avoid having "," between each element
              }
              alt="user_picture"
            />
          </div>
        </>
      )}
      <div className="main-container"></div>
    </div>
  );
};

export default Card;

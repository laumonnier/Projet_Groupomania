import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import "../../../style/LoadingSpinner.css";
import "../../../style/Post/Card/Card.css";
import { useSelector } from "react-redux";
import { isEmpty } from "../../../utils/Empty";
import HeaderPost from "./HeaderPost";
import BodyPost from "./BodyPost";
import FooterPost from "./FooterPost";

const Card = ({ post, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  //Will recover user data, both images, messages or other thanks to the "store"
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="card-container" key={post._id}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderPost post={post} key={post._id} user={user} />
          <BodyPost post={post} />
          <FooterPost post={post} />
        </>
      )}
    </div>
  );
};

export default Card;

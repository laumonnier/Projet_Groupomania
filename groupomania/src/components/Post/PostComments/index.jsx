import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../style/Post/Comments/PostComments.css";
import { dateParser } from "../../../utils/date";
import { isEmpty } from "../../../utils/Empty";
import BodyComments from "./BodyComments";
import HeaderComments from "./HeaderComments";

const PostComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = () => {};

  return (
    <div className="postComments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id //A revoir comments ou comment
                ? "postComments-container user"
                : "postComments-container"
            }
            key={comment._id}
          >
            <HeaderComments post={post} comments={comment} key={comment._id} />
            <BodyComments post={post} comments={comment} />
          </div>
        );
      })}
    </div>
  );
};

export default PostComments;

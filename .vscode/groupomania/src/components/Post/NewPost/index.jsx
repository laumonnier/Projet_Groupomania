import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import "../../../style/pages/Home/NewPost/NewPost.css";
import { isEmpty } from "../../../utils/Empty";
import { useDispatch, useSelector } from "react-redux";
import HeaderNewPost from "./HeaderNewPost";
import BodyNewPost from "./BodyNewPost";
import FooterNewPost from "./FooterNewPost";
import { addPost, getPosts } from "../../../redux/actions/post.actions";

const NewPost = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const usersData = useSelector((state) => state.usersReducer);
  const errorData = useSelector((state) => state.errorReducer.postErrors);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    }
  };

  const cancelPicture = () => {
    if (message && postPicture) {
      setMessage(message);
      setPostPicture("");
      setFile("");
    } else {
      setMessage("");
      setPostPicture("");
      setFile("");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData, message]);

  return (
    <div className="newPost-post-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderNewPost userData={userData} usersData={usersData} />
          <BodyNewPost
            userData={userData}
            message={message}
            setMessage={setMessage}
            postPicture={postPicture}
          />
          <FooterNewPost
            userData={userData}
            errorData={errorData}
            message={message}
            setMessage={setMessage}
            file={file}
            setFile={setFile}
            postPicture={postPicture}
            setPicture={setPostPicture}
            handlePicture={handlePicture}
            handlePost={handlePost}
            cancelPicture={cancelPicture}
            cancelPost={cancelPost}
          />
        </>
      )}
    </div>
  );
};

export default NewPost;

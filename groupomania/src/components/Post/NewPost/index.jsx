import React, { useState } from "react";

const NewPost = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();

  return <div>Post form</div>;
};

export default NewPost;

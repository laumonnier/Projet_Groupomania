import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../redux/actions/user.actions";

//Will change the profile images
const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id)); //After getting our new case, it will change our URL in the "store", and so we can call our function recently.
  };
  return (
    <form
      action=""
      onSubmit={handlePicture}
      className="upload-picture-container"
    >
      <label htmlFor="file">Changer mon image !</label>
      <input
        type="file"
        id="file"
        name="file"
        accept="jpeg jpg png" //Does not protect against other formats, but accepts quoted formats
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="picture-change" type="submit"></button>
    </form>
  );
};

export default UploadImg;

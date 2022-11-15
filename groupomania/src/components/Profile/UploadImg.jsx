import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../redux/actions/user.actions";
import "../../style/UploadImg.css";

//Will change the profile images
const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", userData.pseudo);
    formData.append("userId", userData._id);
    formData.append("file", file);
    dispatch(uploadPicture(formData, formData._id)); //After getting our new case, it will change our URL in the "store", and so we can call our function recently.
    // formData.getAll("file");
  };
  return (
    <form
      action=""
      onSubmit={handlePicture}
      className="upload-picture-container"
    >
      <div className="file-change">
        <label htmlFor="file"> Changer mon image ! </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpeg, .jpg, .png" //Does not protect against other formats, but accepts quoted formats
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <input className="picture-change" type="submit" value="Envoyer !" />
    </form>
  );
};

export default UploadImg;

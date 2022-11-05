import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../style/UpdateProfile.css";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const { updateForm, setUpdateForm } = useState(false);
  const userData = useSelector((state) => state.userReducer);
  return (
    <div className="profile-container">
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="profile-photo">
          <h3>Photo de profil</h3>
          <img src="{userData.picture}" alt="user_photo" />
          <UploadImg />
          {/* <p>{errors.maxSize}</p>
        <p>{errors.format}</p> */}
        </div>
        <div>
          <h3> Description </h3>
          {updateForm === false && (
            <>
              <p onClick={() => setUpdateForm(!updateForm)}>
                {userData.description}
              </p>
              <button onClick={() => setUpdateForm(!updateForm)}>
                Modifier description !!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

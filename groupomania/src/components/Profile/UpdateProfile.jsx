import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDescription } from "../../redux/actions/user.actions";
import "../../style/UpdateProfile.css";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const [description, setDescription] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateDescription(userData._id, description));
    setUpdateForm(false);
  };

  return (
    <div className="profile-container">
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="profile-photo">
          <h3>Photo de profil</h3>
          <img id="user-photo" src={userData.picture} alt="user_photo" />
          <UploadImg />
          {/* <p>{errors.maxSize}</p>
        <p>{errors.format}</p> */}
        </div>
        <div className="description-container">
          <div className="text-description">
            <h3> Description </h3>
            {updateForm === false && (
              <>
                <p
                  className="description-block"
                  onClick={() => setUpdateForm(!updateForm)}
                >
                  {userData.description}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier description !!
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>
                  Valider les Modifications
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

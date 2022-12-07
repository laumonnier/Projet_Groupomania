import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDescription } from "../../redux/actions/user.actions";
import "../../style/Profile/UpdateProfile.css";
import { dateParser } from "../../utils/date";
import { isEmpty } from "../../utils/Empty";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const [description, setDescription] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  // Recovers all user data from the useSelector
  const errorData = useSelector((state) => state.errorReducer.userErrors);
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
          <div className="profile-image-error">
            {!isEmpty(errorData.format) && alert(errorData.format)}
            {!isEmpty(errorData.maxSize) && alert(errorData.maxSize)}
          </div>
        </div>
        <div className="description-container">
          <h3> Description </h3>
          <div className="summary-description-block">
            <div id="profile-time">
              <p className="text-time">Membre depuis le: </p>
              <p className="date-time">{dateParser(userData.createdAt)}</p>
            </div>
            <div className="profile-description">
              <div className="profile-user">
                <p className="description-script">Pseudo : </p>
                <p className="description-dynamic"> {userData.pseudo} </p>
              </div>
              <div className="profile-user">
                <p className="description-script">Adresse email : </p>
                <p className="description-dynamic"> {userData.email}</p>
              </div>
              <div className="profile-user">
                <p className="description-script">Droit d'accès : </p>
                <p className="description-dynamic"> "{userData.role}"</p>
              </div>
              <p className="description-script">Description personnelle : </p>
            </div>
          </div>
          <div>
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
                  placeholder="Indiquer ici votre déscription !"
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

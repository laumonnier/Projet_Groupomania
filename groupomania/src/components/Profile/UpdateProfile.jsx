import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDescription } from "../../redux/actions/user.actions";
import "../../style/Profile/UpdateProfile.css";
import { dateParser } from "../../utils/date";
import FollowPopup from "../FollowPopup/FollowPopup";
import FollowHandler from "./FollowHandler";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const [description, setDescription] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  // Recovers all user data from the useSelector
  const usersData = useSelector((state) => state.usersReducer);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
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
          <div className="follow-profile">
            {/*<p className="following" onClick={() => setFollowingPopup(true)}>
              {" "}
              Following(s):{" "}
              {userData.following ? userData.following.length : "0"}
            </p>
            <p className="followers" onClick={() => setFollowersPopup(true)}>
              {" "}
              Follower(s):{" "}
              {userData.followers ? userData.followers.length : "0"}
            </p> */}
            <FollowPopup userData={userData} usersData={usersData} />
          </div>
          <div id="profile-time">
            <p className="text-time">Membre depuis le: </p>
            <p className="date-time">{dateParser(userData.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

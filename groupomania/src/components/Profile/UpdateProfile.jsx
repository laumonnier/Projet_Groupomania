import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDescription } from "../../redux/actions/user.actions";
import "../../style/UpdateProfile.css";
import { dateParser } from "../../utils/date";
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
            <p className="following" onClick={() => setFollowingPopup(true)}>
              {" "}
              Following(s):{" "}
              {userData.following ? userData.following.length : "0"}
            </p>
            <p className="followers" onClick={() => setFollowersPopup(true)}>
              {" "}
              Follower(s):{" "}
              {userData.followers ? userData.followers.length : "0"}
            </p>
          </div>
          <div id="profile-time">
            <p className="text-time">Membre depuis le: </p>
            <p className="date-time">{dateParser(userData.createdAt)}</p>
          </div>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profile-container">
          <div className="modal">
            <p className="follow-profile-title"> Following </p>
            <span className="close" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li className="user-summary" key={user._id}>
                        <img
                          id="user-image-profile"
                          src={user.picture}
                          alt="User_image"
                        />
                        <p id="pseudo-follow">{user.pseudo}</p>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profile-container">
          <div className="modal">
            <p className="follow-profile-title"> Followers </p>
            <span className="close" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li className="user-summary" key={user._id}>
                        <img
                          id="user-image-profile"
                          src={user.picture}
                          alt="User_image"
                        />
                        <p id="pseudo-follow">{user.pseudo}</p>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;

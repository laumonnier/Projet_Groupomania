import React, { useContext } from "react";
// import { useState } from "react";
import logo from "../../assets/images/icon-left-font-monochrome-white.png";
import Log from "../../components/Log";
import UpdateProfile from "./UpdateProfile";
import "../../style/pages/Profile/Profile.css";
import { UserIdContext } from "../../utils/context";
import Copyrigth from "../../components/Copyrigth";

const Profile = () => {
  const userId = useContext(UserIdContext);

  return (
    <>
      <div className="general-profile">
        {userId ? (
          <UpdateProfile />
        ) : (
          <div className="profile-container">
            <img
              id="groupomaniaLogo"
              src={logo}
              alt="Logo de l'entreprise Groupomania"
            />
            <Log signIn={false} signUp={true} />
          </div>
        )}
      </div>
      <Copyrigth />
    </>
  );
};

export default Profile;

import React, { useContext } from "react";
import "../../style/Navbar.css";

import { Link } from "react-router-dom";
import { UserIdContext } from "../../utils/context";
import Logout from "../Log/Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userId = useContext(UserIdContext);
  //To recover the data from the "dispatch" that we received from the reducer, we will use a "useSelector()" hook
  //Pour récupérer la data du "dispatch" que l'on a reçu des reducer, nous utiliserons un hook "useSelector()"
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="navbar-container">
      <nav>
        <div className="nav-container">
          <div className="home-block">
            <Link to="/">
              <img
                id="groupomania-logo"
                src="./images/icon/icon-left-font-reframe.png"
                alt="icon de Groupomania"
              />
            </Link>
          </div>

          <p id="welcome-profile">
            Bienvenue {userData.pseudo} sur
            <br /> "Groupévoumania"
          </p>
          {userId ? (
            <>
              <div className="nav-block">
                <Link to="/">
                  <img
                    id="home-logo"
                    src="./images/icon/icon_accueil_2948025.png"
                    alt="icon de Groupomania"
                  />
                </Link>
                <Link to="/followers">
                  <img
                    id="followers-logo"
                    src="./images/icon/icon_follower_5607047.png"
                    alt="icon_followers"
                  />
                </Link>
                <Link to="/profile">
                  <img
                    id="profile-logo"
                    src="./images/icon/Profile-icon_123.png"
                    alt="icon_profil"
                  />
                </Link>
              </div>
              <Logout />
            </>
          ) : (
            <Link to="/profile">
              <img
                id="logo-login"
                src="./images/icon/depositphotos-stock-illustration-bouton-internet-graphic-histogramme-red.jpg"
                alt="icon_login"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

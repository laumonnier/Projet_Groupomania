import React, { useContext } from "react";
import "../../style/Navbar.css";

import { Link } from "react-router-dom";
import { UserIdContext } from "../../utils/context";

const Navbar = () => {
  const userId = useContext(UserIdContext);

  return (
    <nav>
      <div className="nav-container">
        <div className="home-block">
          <Link to="/home">
            <img
              id="home-logo"
              src="./images/icon-left-font-reframe (1).png"
              alt="icon de Groupomania"
            />
          </Link>
        </div>
        <Link to="/profile">
          <img src="" alt="" />
          <h3 className="navbar-profil">Profil</h3>
        </Link>
        <div id="log-block">
          {userId ? (
            <div className="welcome-connexion">
              <p id="welcome-profile"> Bienvenue ' ' </p>
              <Link to="/">
                <img
                  id="logo-logout"
                  src="./images/logout-icon-red-circle-button.jpg"
                  alt="icon_logout"
                />
              </Link>
            </div>
          ) : (
            <Link to="/">
              <img
                id="logo-login"
                src="./images/depositphotos-stock-illustration-bouton-internet-graphic-histogramme-red.jpg"
                alt="icon_login"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

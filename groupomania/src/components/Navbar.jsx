import React from "react";

import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { StyledLink } from "../../utils/style/Atoms";

const Navbar = () => {
  return (
    <nav>
      <div container>
        <div Accueil>
          <Link to="/home">
            <img src="" alt="" />
            <p Titre> Groupomania </p>
          </Link>
        </div>
        <div Profile>
          <Link to="/profile">
            <div logo>
              <img src="" alt="" />
              <p Profil> Profil </p>
            </div>
          </Link>
        </div>
        <div Logout>
          <Link exact to="/">
            <img src="" alt="" />
            <p connexion>Connexion</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

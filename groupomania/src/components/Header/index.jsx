import React from "react";

import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { StyledLink } from "../../utils/style/Atoms";

const Header = () => {
  return (
    <nav>
      <Link to="/"> Connexion </Link>
      <Link to="/home"> Accueil </Link>
      <Link to="/profile"> Profil </Link>
    </nav>
  );
};

export default Header;

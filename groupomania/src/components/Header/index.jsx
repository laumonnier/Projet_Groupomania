import React from "react";

import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { StyledLink } from "../../utils/style/Atoms";

const Header = () => {
  return (
    <nav>
      <Link to="/"> Login </Link>
      <Link to="/home"> Accueil </Link>
      <Link to="/profile"> Profil </Link>
    </nav>
  );
};

export default Header;

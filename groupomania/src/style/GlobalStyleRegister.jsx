import React from "react";
import { createGlobalStyle } from "styled-components";

const StyledConnection = createGlobalStyle`
  *{
    font-family: Lato, Sans-Serif, "Comic Sans MS";
  }

  body {
    background-image: linear-gradient(rgba(209, 13, 59,0.6),rgba(209, 13, 59,0.6)), url(./images/social-media.jpg) ;
  }
`;

const GlobalStyleRegister = () => {
  return <StyledConnection />;
};

export default GlobalStyleRegister;

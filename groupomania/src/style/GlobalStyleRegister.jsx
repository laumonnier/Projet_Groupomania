import React from "react";
import { createGlobalStyle } from "styled-components";

const StyledConnection = createGlobalStyle`
  *{
    font-family: Lato, Sans-Serif, "Comic Sans MS";
  }

  body {
    background-image: linear-gradient(rgba(191,19,59,0.6),rgba(191,19,59,0.6)), url(./images/social-media.jpg) ;
  }
`;

const GlobalStyleRegister = () => {
  return <StyledConnection />;
};

export default GlobalStyleRegister;

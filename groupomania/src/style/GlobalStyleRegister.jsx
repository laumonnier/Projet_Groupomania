import React from "react";
import { createGlobalStyle } from "styled-components";

const StyledConnection = createGlobalStyle`
  *{
    font-family: Lato, Sans-Serif, "Comic Sans MS";
  }

  body {
    background: url('../assets/images/social_image_red.jpg'), #e0bebc ;
  }
`;

const GlobalStyleRegister = () => {
  return <StyledConnection />;
};

export default GlobalStyleRegister;

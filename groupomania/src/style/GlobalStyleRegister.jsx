import React from "react";
import { createGlobalStyle } from "styled-components";

const StyledConnection = createGlobalStyle`
  body { 
    background: url('../assets/background/social_image.jpg'), #e0bebc ;
    z-index: 0;
  }
`;

const GlobalStyleRegister = () => {
  return <StyledConnection />;
};

export default GlobalStyleRegister;

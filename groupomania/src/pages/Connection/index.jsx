import React from "react";
// import { useState } from "react";
import styled from "styled-components";
import Login from "../../components/Login";
// import Suscribe from "../../components/Suscribe";
import logo from "../../assets/images/icon-left-font.png";
// import GlobalStyleRegister from "../../style/GlobalStyleRegister";

const HomeLogo = styled.img`
  display: flex;

  height: 520px;
  margin: auto;
`;

const ConnectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: ;
  padding: ;
  z-index: 2;
`;

const Connection = () => {
  // const [inputValue, setInputValue] = useState("");
  return (
    <ConnectionContainer>
      <HomeLogo src={logo} alt="Logo de l'entreprise Groupomania" />

      <Login />
    </ConnectionContainer>
  );
};

export default Connection;
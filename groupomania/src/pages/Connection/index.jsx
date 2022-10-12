import React from "react";
// import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/icon-left-font-monochrome-white.png";
import Log from "../../components/Log";

const StyledConnection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: auto;
`;

const ConnectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: auto;
`;

const HomeLogo = styled.img`
  display: flex;
  height: 520px;
  margin: auto;
  margin-top: -150px;
  padding-bottom: 120px;
`;

const Connection = () => {
  // const [inputValue, setInputValue] = useState("");
  return (
    <StyledConnection>
      <ConnectionContainer>
        <HomeLogo src={logo} alt="Logo de l'entreprise Groupomania" />
        <Log />
      </ConnectionContainer>
    </StyledConnection>
  );
};

export default Connection;

import React, { useState } from "react";
import styled from "styled-components";
import Subscribe from "./Subscribe";
import Login from "./Login";

const ConnectionContainer = styled.div`
  flex-direction: column;
  margin: auto;
  margin-top: -42%;
  background-color: ;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-item: flex-end;
  text-align: start;
  margin: auto;
  width: 700px;
  height: 280px;
  // background-color: #c9c1c2;
  border: 0px solid black;
  border-radius: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  width: 49.6%;
  height: 60px;
  font-size: 20px;
  border-radius: 9px;
  margin-bottom: 7px;
`;

const Log = () => {
  const [loginModal, setLoginModal] = useState(true);
  const [subscribeModal, setSubscribeModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "subscribe") {
      setSubscribeModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setSubscribeModal(false);
    }
  };

  return (
    <ConnectionContainer>
      <ButtonContainer>
        <StyledButton type="button" onClick={handleModals} id="login">
          Se connecter
        </StyledButton>
        <StyledButton type="button" onClick={handleModals} id="subscribe">
          S'inscrire
        </StyledButton>
      </ButtonContainer>
      <ModalContainer>
        {loginModal && <Login />}
        {subscribeModal && <Subscribe />}
      </ModalContainer>
    </ConnectionContainer>
  );
};

export default Log;

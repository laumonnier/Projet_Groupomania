import React from "react";
import styled from "styled-components";

const ConnectionContainer = styled.div`
  flex-direction: column;
  margin: auto;
  padding: ;
  background-color: ;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-item: flex-end;
  text-align: start;
  width: 500px;
  height: 200px;
  background-color: red;
  border: 3px solid black;
`;

const StyledIdentify = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.label`
  display: flex;
  text-align: start;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  width: 49.6%;
`;

const Login = () => {
  const handleClick = () => {
    alert("Bonjour comment allez-vous ?");
  };
  return (
    <ConnectionContainer>
      <FormContainer>
        <StyledIdentify>
          <StyledName for="mail">Adresse mail</StyledName>
          <input type="mail" name="mail" id="mail" />
        </StyledIdentify>
        <StyledIdentify>
          <StyledName> Mot de passe </StyledName>
          <input type="password" name="mdp" id="mdp" />
        </StyledIdentify>
        <ButtonContainer>
          <StyledButton onClick={handleClick}> Se connecter </StyledButton>
          <StyledButton onClick={handleClick}> S'inscrire </StyledButton>
        </ButtonContainer>
      </FormContainer>
    </ConnectionContainer>
  );
};

export default Login;

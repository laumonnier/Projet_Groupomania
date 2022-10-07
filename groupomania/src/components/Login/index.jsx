import React from "react";
import styled from "styled-components";

const ConnectionContainer = styled.div`
  flex-direction: column;
  margin: auto;
  margin-top: -10%;
  background-color: ;
  border: 3px solid black;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-item: flex-end;
  text-align: start;
  width: 700px;
  height: 280px;
  background-color: #c9c1c2;
  border: 3px solid black;
  border-radius: 12px;
`;

const StyledIdentify = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.label`
  display: flex;
  text-align: start;
  align-items: flex-end;
  margin-left: 15px;
  height: 40px;
  font-size: 23px;
`;

const StyledField = styled.input`
  width: 98%;
  height: 40px;
  border-radius: 12px;
  margin: auto;
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

const StyledSubmit = styled.button`
  width: 98%;
  height: 60px;
  margin: auto;
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  border-radius: 9px;
  background-color: #d4444b;
`;

const Login = () => {
  const handleClick = () => {
    alert("Bonjour comment allez-vous ?");
  };
  return (
    <ConnectionContainer>
      <ButtonContainer>
        <StyledButton onClick={handleClick}> Se connecter </StyledButton>
        <StyledButton onClick={handleClick}> S'inscrire </StyledButton>
      </ButtonContainer>
      <FormContainer>
        <StyledIdentify>
          <StyledName htmlFor="mail">Adresse mail</StyledName>
          <StyledField type="mail" name="mail" id="mail" />
        </StyledIdentify>
        <StyledIdentify>
          <StyledName htmlFor="mdp"> Mot de passe </StyledName>
          <StyledField type="password" name="mdp" id="mdp" />
        </StyledIdentify>
        <StyledSubmit onClick={handleClick}> Se connecter </StyledSubmit>
      </FormContainer>
    </ConnectionContainer>
  );
};

export default Login;

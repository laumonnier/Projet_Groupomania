import React from "react";
import styled from "styled-components";
import colors from "../../style/colors";
import axios from "axios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-item: flex-end;
  text-align: start;
  width: 700px;
  height: 680px;
  background-color: ${colors.tertiary_bg_formulary};
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
  width: 96%;
  height: 40px;
  border-radius: 12px;
  margin: auto;
  font-size: 22px;
`;

const StyledError = styled.div`
  height: 21px;
  font-size: 17px;
  font-weight: bold;
  color: red;
  font-style: italic;
  margin-left: 12px;
  margin-top: 3px;
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
  background-color: ${colors.primary_button};
`;

const Subscribe = () => {
  const pseudoError = document.querySelector(".pseudoError");
  const lastNameError = document.querySelector(".lNameError");
  const firstNameError = document.querySelector(".fNameError");
  const emailError = document.querySelector(".emailError");
  const passwordError = document.querySelector(".passwordError");

  return (
    <FormContainer>
      <StyledIdentify>
        <StyledName htmlFor="pseudo">Pseudo</StyledName>
        <StyledField type="text" name="pseudo" id="pseudo" />
        <StyledError className="pseudoError"></StyledError>
      </StyledIdentify>
      <StyledIdentify>
        <StyledName htmlFor="lastName"> Nom de Famille </StyledName>
        <StyledField type="text" name="lName" id="lastName" />
        <StyledError className="lNameError"></StyledError>
      </StyledIdentify>
      <StyledIdentify>
        <StyledName htmlFor="firstName"> Prénom </StyledName>
        <StyledField type="text" name="fName" id="firstName" />
        <StyledError className="fNameError"></StyledError>
      </StyledIdentify>
      <StyledIdentify>
        <StyledName htmlFor="mail"> Adresse mail </StyledName>
        <StyledField type="mail" name="mail" id="mail" />
        <StyledError className="emailError"></StyledError>
      </StyledIdentify>
      <StyledIdentify>
        <StyledName htmlFor="pswrd"> Mot de passe </StyledName>
        <StyledField type="password" name="pswrd" id="pswrd" />
        <StyledError className="passwordError"></StyledError>
      </StyledIdentify>
      <StyledSubmit type="Submit" value="Subscribe">
        S'inscrire
      </StyledSubmit>
    </FormContainer>
  );
};

export default Subscribe;

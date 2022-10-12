import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-item: flex-end;
  text-align: start;
  width: 700px;
  height: 330px;
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
  width: 96%;
  height: 40px;
  border-radius: 12px;
  margin: auto;
  font-size: 22px;
`;

const StyledError = styled.div`
  height: 25px;
  font-size: 18px;
  font-weight: bold;
  color: red;
  font-style: italic;
  margin-left: 12px;
  margin-top: 8px;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailError = document.querySelector(".emailError");
  const passwordError = document.querySelector(".passwordError");

  const handleLogin = (e) => {
    e.PreventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL_API}api/user/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormContainer action="" onSubmit={handleLogin}>
      <StyledIdentify>
        <StyledName htmlFor="mail">Adresse mail</StyledName>
        <StyledField
          type="mail"
          name="mail"
          id="mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <StyledError className="emailError"></StyledError>
      </StyledIdentify>
      <StyledIdentify>
        <StyledName htmlFor="mdp"> Mot de passe </StyledName>
        <StyledField
          type="password"
          name="mdp"
          id="mdp"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <StyledError className="passwordError"></StyledError>
      </StyledIdentify>
      <StyledSubmit type="submit" value="login">
        Se connecter
      </StyledSubmit>
    </FormContainer>
  );
};

export default Login;

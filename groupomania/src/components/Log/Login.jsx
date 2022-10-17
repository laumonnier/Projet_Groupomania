import React, { useState } from "react";
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
  height: 330px;
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
  background-color: ${colors.primary_button};
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
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
        <StyledError className="email error"></StyledError>
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
        <StyledError className="password error"></StyledError>
      </StyledIdentify>
      <StyledSubmit type="submit">Se connecter</StyledSubmit>
    </FormContainer>
  );
};

export default Login;

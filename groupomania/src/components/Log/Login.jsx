import React, { useState } from "react";
import axios from "axios";
import "../../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");

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
        console.log(res.data);
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
    <form className="form-login-container" action="" onSubmit={handleLogin}>
      <div className="mail-container">
        <label htmlFor="mail">Adresse mail</label>
        <input
          type="email"
          name="mail"
          id="mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="emailError"></div>
      </div>
      <div className="password-container">
        <label htmlFor="mdp"> Mot de passe </label>
        <input
          type="password"
          name="mdp"
          id="mdp"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="passwordError"></div>
      </div>
      <button type="submit" className="submit-form-login">
        Se connecter
      </button>
    </form>
  );
};

export default Login;

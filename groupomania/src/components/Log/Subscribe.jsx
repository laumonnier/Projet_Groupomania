import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
import "../../style/Log/Subscribe.css";

const Subscribe = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ctrlPassword, setCtrlPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudoError");
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");
    const controlPasswordError = document.querySelector(
      ".controlPasswordError"
    );

    controlPasswordError.innerHTML = "";

    if (password !== ctrlPassword) {
      controlPasswordError.innerHTML =
        "Les mots de passe ne sont pas identique !!!";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login />
          <p className="success">
            {" "}
            Inscription réussi, vous pouvez vous connecter !!!
          </p>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="form-subscribe-container">
          <div className="suscribe-pseudo-container">
            <label className="subscribe-label" htmlFor="pseudo">
              Pseudo
            </label>
            <input
              className="subscribe-input"
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div className="pseudoError"></div>
          </div>
          <div className="suscribe-mail-container">
            <label className="subscribe-label" htmlFor="mail">
              {" "}
              Adresse mail{" "}
            </label>
            <input
              className="subscribe-input"
              type="email"
              name="mail"
              id="mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="emailError"></div>
          </div>
          <div className="suscribe-password-container">
            <label className="subscribe-label" htmlFor="pswrd">
              {" "}
              Mot de passe{" "}
            </label>
            <input
              className="subscribe-input"
              type="password"
              name="pswrd"
              id="pswrd"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="passwordError"></div>
          </div>
          <div className="suscribe-ctrlPswrd-container">
            <label className="subscribe-label" htmlFor="ctrlPswrd">
              Confirmation Mot de passe
            </label>
            <input
              className="subscribe-input"
              type="password"
              name="ctrlPswrd"
              id="ctrlPswrd"
              onChange={(e) => setCtrlPassword(e.target.value)}
              value={ctrlPassword}
            />
            <div className="controlPasswordError"></div>
          </div>
          <button type="submit" className="submit-subscribe">
            S'inscrire
          </button>
        </form>
      )}
    </>
  );
};

export default Subscribe;

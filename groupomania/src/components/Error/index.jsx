import React from "react";
import "../../style/Error.css";

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-text"> Désolé, cette page n'existe pas !</h1>
      <img
        src="./images/enfant_qui_pleure.png"
        alt="enfant_pleure"
        className="error-picture"
      />
    </div>
  );
};

export default Error;

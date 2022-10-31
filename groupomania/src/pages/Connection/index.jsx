import React, { useContext } from "react";
// import { useState } from "react";
import logo from "../../assets/images/icon-left-font-monochrome-white.png";
import Log from "../../components/Log";
import "../../style/Connection.css";
import { UserIdContext } from "../../utils/context";

const Connection = () => {
  const userId = useContext(UserIdContext);
  // const [inputValue, setInputValue] = useState("");
  return (
    <div className="general-connection">
      {userId ? (
        <h1>UPDATE PAGE</h1>
      ) : (
        <div className="connection-container">
          <img
            id="groupomaniaLogo"
            src={logo}
            alt="Logo de l'entreprise Groupomania"
          />
          <Log signIn={false} signUp={true} />
        </div>
      )}
    </div>
  );
};

export default Connection;

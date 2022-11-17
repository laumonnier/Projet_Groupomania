import React, { useState } from "react";
import Subscribe from "./Subscribe";
import Login from "./Login";
import "../../style/Log.css";

const Log = () => {
  const [loginModal, setLoginModal] = useState(true);
  const [subscribeModal, setSubscribeModal] = useState(false);
  // let colorModal = "#bd153c";

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
    <div className="profile-container">
      <div className="button-container">
        <button onClick={handleModals} id="login">
          Se connecter
        </button>
        <button onClick={handleModals} id="subscribe">
          S'inscrire
        </button>
      </div>
      <div className="modal-container">
        {loginModal && <Login />}
        {subscribeModal && <Subscribe />}
      </div>
    </div>
  );
};

export default Log;

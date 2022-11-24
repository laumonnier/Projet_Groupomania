// Dependencies used and tools of library
import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import "../../style/Log/Logout.css";

function Logout() {
  //Removes the cookie if not removed at the front
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expiresIn: 1 });
    }
  };

  //When the "click" on the "logout" logo allows thanks to the "logout" function to delete the application cookie for the user concerned.
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div onClick={logout}>
      <img
        id="logo-logout"
        src="./images/logout-icon-red-circle-button.jpg"
        alt="icon_logout"
      />
    </div>
  );
}

export default Logout;

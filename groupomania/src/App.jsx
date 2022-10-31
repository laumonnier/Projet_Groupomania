import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Connection from "./pages/Connection";
import Profile from "./pages/Profile";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import GlobalStyle from "./utils/style/GlobalStyle";
import { UserIdContext } from "./utils/context";
import axios from "axios";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUserId(res.data))
        .catch((err) => console.log("No Token"));
    };
    fetchToken();
  }, [userId]);

  return (
    <Router>
      <UserIdContext.Provider value={userId}>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Connection />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserIdContext.Provider>
    </Router>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Connection from "./pages/Connection";
import Profile from "./pages/Profile";
import Error from "./components/Error";
import Navbar from "./components/Header";
import GlobalStyle from "./utils/style/GlobalStyle";
// import { UserIdProvider } from "./utils/context";

const App = () => {
  return (
    <Router>
      {/* <UserIdProvider> */}
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Connection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </UserIdProvider> */}
    </Router>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Connection from "./pages/Connection";
import Profile from "./pages/Profile";
import Error from "./components/Error";
import Header from "./components/Header";
import GlobalStyleRegister from "./style/GlobalStyleRegister";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyleRegister />
      <Header />
      <Routes>
        <Route exact path="/" element={<Connection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

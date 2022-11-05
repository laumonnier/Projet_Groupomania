import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import GlobalStyleRegister from "./utils/style/GlobalStyle";
import { UserIdContext } from "./utils/context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/user.actions";

const App = () => {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch(); //Use the data sent to it in the "store", this allows us to trigger action

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUserId(res.data);
        })
        .catch((err) => console.log("No Token"));
    };
    fetchToken();

    if (userId) {
      dispatch(getUser(userId));
    } //If the "userId" exists ==> go for the "getUser" action having as parameter "userId"
  }, [userId, dispatch]);

  return (
    <Router>
      <UserIdContext.Provider value={userId}>
        <GlobalStyleRegister />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserIdContext.Provider>
    </Router>
  );
};

export default App;

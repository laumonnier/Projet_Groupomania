import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userid, setUserid] = useState(null); // controler le user A voir plus tard

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUserid(res.data);
        })
        .catch((err) => console.log("No Token !!"));
    };
    fetchToken();
  }, []);

  return <UserIdContext.Provider value={userid}></UserIdContext.Provider>;
};

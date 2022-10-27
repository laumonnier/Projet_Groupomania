import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserIdContext = createContext();

// export const UserIdProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null); // controler le user A voir plus tard

//   useEffect(() => {
//     const fetchToken = async () => {
//       await axios({
//         method: "get",
//         url: `${process.env.REACT_APP_API_URL}jwtid`,
//         withCredentials: true,
//       })
//         .then((res) => {
//           console.log(res);
//           setUserId(res.data);
//         })
//         .catch((err) => console.log("No Token !!"));
//     };
//     fetchToken();
//   }, []);

//   <UserIdContext.Provider value={userId}></UserIdContext.Provider>;
// };

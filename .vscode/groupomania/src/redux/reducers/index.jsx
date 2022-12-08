import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer.jsx";
import usersReducer from "./users.reducer.jsx";
import postReducer from "./post.reducer.jsx";
import errorReducer from "./error.reducer.jsx";

//Allows to combine all the "reducers" that will be created and then export them to the highest file in the hierarchy ("index.jsx" that render the general application)
export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorReducer,
});

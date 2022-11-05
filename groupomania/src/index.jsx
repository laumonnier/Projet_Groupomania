import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducers from "./redux/reducers/index";

//Corresponds to the tools allowing us to follow our "store"
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

//Creation of a "Store" to store the desired data thanks to "Redux"
//It is thus in this store that will group together all the "reducers" thanks to the import of "rootReducers" which combines these "reducers"
const store = configureStore(
  { reducer: rootReducers },
  //Do not forget to remove "composeWithDevTools()" during development. This is used for development
  composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

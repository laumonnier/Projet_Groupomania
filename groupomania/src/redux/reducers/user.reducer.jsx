import { GET_USER, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

//Second, we will use our general reducer to list all the actions to be managed!
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state, //The "spread" operator makes it possible not to overwrite the user’s data and keep them. And then to change our "picture" data in our "reducer".
        picture: action.payload,
      };
    default:
      return state;
  }
}

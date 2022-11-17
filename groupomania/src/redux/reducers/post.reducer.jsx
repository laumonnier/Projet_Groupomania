import { GET_POSTS } from "../actions/post.actions";

const initialState = {};

//Concerns the "store" of posts
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
}

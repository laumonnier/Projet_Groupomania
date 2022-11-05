import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
// export const;

export const getUser = (userId) => {
  //"dispatch" will allow us to send the data to the "reducer"
  return (dispatch) => {
    //before sending to the "reducer" we will use axios with some method that will allow us to have the in response the "dispatch" which will take into account the name of the method and the "payload"
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  //Before sending to the reducer, we use axios to send our "data" to the database so that the data can be transmitted
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data) //First part we will send the image data to the database
      .then((res) => {
        return axios //Then during the second part we will warn the "reducer" to change the data accordingly
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture }); //We will send to the "reducer" this part "UPLOAD_PICTURE", with as data "payload" "res.data.picture" for the "store"
          });
      })
      .catch((err) => console.log(err));
  };
};

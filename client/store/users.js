import axios from "axios";
import { ip } from "../../secrets";

//action type

const GET_USER = "GET_USER";
const CREATE_USER = "CREATE_USER";

//actions creators

const getUser = user => ({ type: GET_USER, user });
const createUser = newUser => ({ type: CREATE_USER, newUser });

//thunk

export const getUserThunk = user => async dispatch => {
  const { data } = await axios.post(`http://${ip}:8080/auth/login`, user);
  dispatch(getUser(data));
};

export const createUserThunk = newUser => async dispatch => {
  let { firstName, lastName, email, password } = newUser;
  const { data } = await axios.post(`http://${ip}:8080/auth/signup`, newUser);
  dispatch(createUser(data));
};

//reducer

const userReducer = (user = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return user;
  }
};

export default userReducer;

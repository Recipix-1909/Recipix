import axios from "axios";
import { ip } from "../../secrets";

//action type

const GET_USER = "GET_USER";
const CREATE_USER = "CREATE_USER";
const REMOVE_USER = "REMOVE_USER";

//actions creators

const getUser = user => ({ type: GET_USER, user });
const createUser = newUser => ({ type: CREATE_USER, newUser });
const removeUser = () => ({ type: REMOVE_USER });

//thunk

export const getUserThunk = user => async dispatch => {
  let { email, password } = user;
  const { data } = await axios.post(`${ip}/auth/login`, user);
  dispatch(getUser(data));
};

export const createUserThunk = newUser => async dispatch => {
  let { firstName, lastName, email, password } = newUser;
  const { data } = await axios.post(`${ip}/auth/signup`, newUser);
  dispatch(createUser(data));
};

export const removeUserThunk = () => async dispatch => {
  try {
    await axios.post(`${ip}/auth/logout`);
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

//reducer

const userReducer = (user = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return user;
  }
};

export default userReducer;

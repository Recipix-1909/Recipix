import axios from "axios";
import { ip } from "../../secrets";

//action type

const ADD_ITEM = "ADD_ITEM";
const GET_ITEM = "GET_ITEM";

//action creators

const getItem = item => {
  return {
    type: GET_ITEM,
    item
  };
};

const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  };
};

//thunk
export const addItemThunk = (userId, serialNum, expirationDate) => {
  return async dispatch => {
    const { data } = await axios.post(`${ip}/api/fridge/${userId}`, {
      serialNum,
      expirationDate
    });
    if (data.length === 0) {
      let errData = { item: { name: "error" } };
      dispatch(addItem(errData));
    } else dispatch(addItem(data));
  };
};

const itemsReducer = (lastItem = "", action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return action.item.item.name;
    }
    default:
      return lastItem;
  }
};

export default itemsReducer;

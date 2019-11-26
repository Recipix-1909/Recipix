import axios from "axios";

//action type

const ADD_ITEM = "ADD_ITEM";
const GET_ITEM = "GET_ITEM";

//action creator

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
    const { data } = await axios.post(
<<<<<<< HEAD
      `http://172.16.21.152:8080/api/fridge/${userId}`,
=======
      `http://172.16.21.172:8080/api/fridge/${userId}`,
>>>>>>> master
      {
        serialNum,
        expirationDate
      }
    );
    dispatch(addItem(data));
  };
};

const itemsReducer = (lastItem = {}, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return action.item;
    }
    default:
      return lastItem;
  }
};

export default itemsReducer;

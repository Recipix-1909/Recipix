import axios from "axios";
// import { edamamFoodAPIID, edamamFoodAPIKEY } from "../../secrets";
// import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//action type

const SAVE_ITEM = "SAVE_ITEM";
const GET_ITEM = "GET_ITEM";

//action creator

const getItem = item => {
  return {
    type: GET_ITEM,
    item
  };
};

const saveItem = item => {
  return {
    type: SAVE_ITEM,
    item
  };
};

//thunk
export const saveItemThunk = (userId, serialNum, expirationDate) => {
  return async dispatch => {
    const { data } = await axios.post(
      `http://172.16.21.87:8080/api/fridge/${userId}`,
      {
        serialNum,
        expirationDate
      }
    );
    console.log("this is data!!!!!!!!!", data);
    dispatch(saveItem(data));
  };
};

const itemsReducer = (items = {}, action) => {
  switch (action.type) {
    case SAVE_ITEM: {
      return { ...items, item: action.item };
    }
    default:
      return items;
  }
};

// export const store = createStore(itemsReducer, applyMiddleware(thunk));

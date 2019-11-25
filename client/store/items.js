import axios from "axios";
import { edamamFoodAPIID, edamamFoodAPIKEY } from "../../secrets";

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
    const { data } = await axios.post(`/api/fridge/${userId}`, {
      serialNum,
      expirationDate
    });
    dispatch(saveItem(data));
  };
};

const itemsReducer = (items = {}, action) => {
  switch (action.type) {
    case SAVE_ITEM: {
      return { ...items, item: action.item };
    }
  }
};

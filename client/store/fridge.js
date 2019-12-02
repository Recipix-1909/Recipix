import axios from "axios";
import { ip } from "../../secrets";

// action type
const GET_FRIDGE_ITEMS = "GET_FRIDGE_ITEMS";
export const DELETE_ITEM = "DELETE_ITEM";

const ADD_ITEM_MANUALLY = "ADD_ITEM_MANUALLY";

// action creator
const getFridgeItems = items => {
  return {
    type: GET_FRIDGE_ITEMS,
    items
  };
};

export const deleteItem = item => {
  return {
    type: DELETE_ITEM,
    item
  };
};

const addItemMan = item => {
  return {
    type: ADD_ITEM_MANUALLY,
    item
  };
};

// thunk

export const getFridgeItemsThunk = userId => {
  // console.log("INSIDE THE GET FRIDGE THUNK");
  return async dispatch => {
    const { data } = await axios.get(`http://${ip}:8080/api/fridge/${userId}`);
    dispatch(getFridgeItems(data.items));
  };
};

export const getFridgeItemsManualThunk = (userId, itemName, expirationDate) => {
  console.log(itemName);
  return async dispatch => {
    await axios.post(`http://192.168.0.106:8080/api/fridge/${userId}/manual`, {
      userId,
      name: itemName,
      expirationDate
    });
    const { data } = await axios.get(
      `http://192.168.0.106:8080/api/fridge/${userId}`
    );
    console.log(data);
    dispatch(addItemMan(data.items));
  };
};

export const deleteItemThunk = (userId, itemId) => {
  return async dispatch => {
    const { data } = await axios.delete(
      `http://${ip}:8080/api/fridge/${userId}/${itemId}`
    );
    // console.log("this is data from axios delete", data);
    dispatch(deleteItem(data));
  };
};

// reducer
const fridgeReducer = (items = [], action) => {
  switch (action.type) {
    case GET_FRIDGE_ITEMS: {
      return action.items;
    }
    case DELETE_ITEM: {
      let newItems = items.filter(item => {
        return item.id !== Number(action.item.itemId);
      });
      return newItems;
    }
    case ADD_ITEM_MANUALLY: {
      return action.item;
    }
    default:
      return items;
  }
};

export default fridgeReducer;

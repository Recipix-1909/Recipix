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
  return async dispatch => {
    const { data } = await axios.get(`${ip}/api/fridge/${userId}`);
    dispatch(getFridgeItems(data.items));
  };
};

export const getFridgeItemsManualThunk = (userId, itemName, expirationDate) => {
  return async dispatch => {
    await axios.post(`${ip}/api/fridge/${userId}/manual`, {
      userId,
      name: itemName,
      expirationDate
    });
    const { data } = await axios.get(`${ip}/api/fridge/${userId}`);
    dispatch(addItemMan(data.items));
  };
};

export const deleteItemThunk = (userId, itemId) => {
  return async dispatch => {
    const { data } = await axios.delete(`${ip}/api/fridge/${userId}/${itemId}`);
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

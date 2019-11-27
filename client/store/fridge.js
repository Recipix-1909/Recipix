import axios from "axios";

// action type
const GET_FRIDGE_ITEMS = "GET_FRIDGE_ITEMS";
const DELETE_ITEM = "DELETE_ITEM";

// action creator
const getFridgeItems = items => {
  return {
    type: GET_FRIDGE_ITEMS,
    items
  };
};

const deleteItem = item => {
  return {
    type: DELETE_ITEM,
    item
  };
};

const addItemMan = item => {};

// thunk

export const getFridgeItemsThunk = userId => {
  console.log("INSIDE THE GET FRIDGE THUNK");
  return async dispatch => {
    const { data } = await axios.get(
      `http://192.168.1.216:8080/api/fridge/${userId}`
    );
    dispatch(getFridgeItems(data.items));
  };
};

export const deleteItemThunk = (userId, itemId) => {
  return async dispatch => {
    const { data } = await axios.delete(
<<<<<<< HEAD
      `http://172.16.21.152:8080/api/fridge/${userId}/${itemId}`
=======
      `http://192.168.1.216:8080/api/fridge/${userId}/${itemId}`
>>>>>>> 3160d7aa6dad4963f77b10348e44cd9f59a9ec96
    );
    console.log("this is data from axios delete", data);
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
    default:
      return items;
  }
};

export default fridgeReducer;

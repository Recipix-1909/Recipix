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
      `http://172.16.12.140:8080/api/fridge/${userId}`
    );
    dispatch(getFridgeItems(data.items));
  };
};

export const deleteItemThunk = (userId, itemId) => {
  return async dispatch => {
    const { data } = await axios.delete(
      `http://172.16.12.140:8080/api/fridge/${userId}/${itemId}`
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
        console.log("this is item ======>", item);
        console.log("this is action.item =====>", action.item);
        return item.id !== Number(action.item.itemId);
      });
      console.log("deleted items!! new list =======>", newItems);
      return newItems;
    }
    default:
      return items;
  }
};

export default fridgeReducer;

import axios from "axios";

// action type
const GET_FRIDGE_ITEMS = "GET_FRIDGE_ITEMS";

// action creator
const getFridgeItems = items => {
  return {
    type: GET_FRIDGE_ITEMS,
    items
  };
};

const addItemMan = item => {};

// thunk

export const getFridgeItemsThunk = userId => {
  return async dispatch => {
    const { data } = await axios.get(
      `http://172.16.21.152:8080/api/fridge/${userId}`
    );
    dispatch(getFridgeItems(data.items));
  };
};

// reducer
const fridgeReducer = (items = [], action) => {
  switch (action.type) {
    case GET_FRIDGE_ITEMS: {
      return action.items;
    }
    default:
      return items;
  }
};

export default fridgeReducer;

import axios from "axios";
import { ip } from "../../secrets";
import { DELETE_ITEM } from "./fridge";

// action type
const GET_FILTER = "GET_FILTER";
const ADD_TO_FILTER = "ADD_TO_FILTER";
const DELETE_FROM_FILTER = "DELETE_FROM_FILTER";
const RESET_FILTER = "RESET_FILTER";

// action creator
export const getFilter = filteredItems => {
  return {
    type: GET_FILTER,
    filteredItems
  };
};

export const deleteFromFilter = item => {
  return {
    type: DELETE_FROM_FILTER,
    item
  };
};

export const addToFilter = item => {
  return {
    type: ADD_TO_FILTER,
    item
  };
};

export const resetFilter = () => {
  return {
    type: RESET_FILTER
  };
};

// thunk

// reducer
const filteredItemsReducer = (filteredItems = [], action) => {
  switch (action.type) {
    case GET_FILTER: {
      return action.filteredItems;
    }
    case DELETE_FROM_FILTER: {
      const newFilter = filteredItems.filter(item => {
        return item.id !== action.item.id;
      });

      return newFilter;
    }
    case DELETE_ITEM: {
      const newFilter = filteredItems.filter(item => {
        return item.id !== Number(action.item.itemId);
      });

      return newFilter;
    }
    case ADD_TO_FILTER: {
      // filter out duplicate item
      let newFilter = filteredItems.filter(item => {
        return item.id !== action.item.id;
      });
      newFilter.push({ name: action.item.name, id: action.item.id });

      return newFilter;
    }
    case RESET_FILTER: {
      return [];
    }
    default:
      return filteredItems;
  }
};

export default filteredItemsReducer;

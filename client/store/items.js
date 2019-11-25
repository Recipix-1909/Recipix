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
export const saveItemThunk = (userId, item) => {
  return async dispatch => {
    const { data } = await axios.get("/api/item/");
    dispatch(getItem(data));
    if (data.serialNum) {
      await axios.post(`/api/fridge/${userId}/add`, item);
    } else {
      // API call to Edamam
      const { data } = await axios.get(
        `https://api.edamam.com/api/food-database/parser?upc=${data.serialNum}&app_id=${edamamFoodAPIID}&app_key=${edamamFoodAPIKEY}`
      );
      const edamamItem = {
        name: data.hints.food.label,
        serialNum: data.text.slice(4),
        imageUrl: data.hints.food.image
      };
      await axios.post(`/api/fridge/${userId}/add`, edamamItem);
      await axios.post("/api/item/", edamamItem);
    }
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

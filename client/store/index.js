import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import itemsReducer from "./items";
import fridgeReducer from "./fridge";
import { recipesReducer, singleRecipeReducer } from "./recipes";
import filteredItemsReducer from "./filteredItems";
import userReducer from "./users";
import { dietReducer } from "./profile";
import { allergyReducer } from "./allergy";

const rootReducer = combineReducers({
  lastItem: itemsReducer,
  items: fridgeReducer,
  filteredItems: filteredItemsReducer,
  recipes: recipesReducer,
  recipe: singleRecipeReducer,
  user: userReducer,
  diets: dietReducer,
  allergies: allergyReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));

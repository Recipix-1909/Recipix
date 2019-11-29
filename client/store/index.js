import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import itemsReducer from "./items";
import fridgeReducer from "./fridge";
import recipesReducer from "./recipes";
import filteredItemsReducer from "./filteredItems";

const rootReducer = combineReducers({
  lastItem: itemsReducer,
  items: fridgeReducer,
  filteredItems: filteredItemsReducer,
  recipes: recipesReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));

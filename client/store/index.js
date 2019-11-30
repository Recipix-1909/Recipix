import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import itemsReducer from "./items";
import fridgeReducer from "./fridge";
import recipesReducer from './recipes'
import userReducer from './users'

const rootReducer = combineReducers({
  lastItem: itemsReducer,
  items: fridgeReducer,
  recipes: recipesReducer,
  user: userReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));

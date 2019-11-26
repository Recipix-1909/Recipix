import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import itemsReducer from "./items";
import fridgeReducer from "./fridge";

const rootReducer = combineReducers({
  lastItem: itemsReducer,
  items: fridgeReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));

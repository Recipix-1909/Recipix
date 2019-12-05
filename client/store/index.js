import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import itemsReducer from './items'
import fridgeReducer from './fridge'
import { recipesReducer, singleRecipeReducer } from './recipes'
import filteredItemsReducer from './filteredItems'
import userReducer from './users'
import { dietReducer } from './profile'

const rootReducer = combineReducers({
  lastItem: itemsReducer,
  items: fridgeReducer,
  filteredItems: filteredItemsReducer,
  recipes: recipesReducer,
  recipe: singleRecipeReducer,
  user: userReducer,
  diet: dietReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware))

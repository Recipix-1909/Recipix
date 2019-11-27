import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { ip } from "../../secrets";

//action type

const GET_RECIPES = "GET_RECIPES";

//action creator

const getRecipes = recipe => {
  return {
    type: GET_RECIPES,
    recipe
  };
};

//thunk

export const getRecipesThunk = userId => {
  return async dispatch => {
    console.log("WE ARE IN THE THUNK");
    const { data } = await axios.get(`http://${ip}:8080/api/recipes/${userId}`);
    // console.log("data from getRecipesThunk=====>", data);
    dispatch(getRecipes(data));
  };
};

//reducer

const recipesReducer = (recipes = [], action) => {
  switch (action.type) {
    case GET_RECIPES: {
      return action.recipe;
    }
    default:
      return recipes;
  }
};

export default recipesReducer;

import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { ip } from "../../secrets";
import { ActionSheetIOS } from "react-native";

//action type

const GET_RECIPES = "GET_RECIPES";
const GET_FILTERED_RECIPES = "GET_FILTERED_RECIPES";
const GET_SINGLE_RECIPE = 'GET_SINGLE_RECIPE'

//action creator

const getRecipes = recipe => {
  return {
    type: GET_RECIPES,
    recipe
  };
};

const getFilteredRecipes = recipes => {
  return {
    type: GET_FILTERED_RECIPES,
    recipes
  };
};

const getSingleRecipe = recipe => {
  type: GET_SINGLE_RECIPE,
  recipe
}

//thunk

export const getRecipesThunk = userId => {
  return async dispatch => {
    // console.log("WE ARE IN THE THUNK");
    const { data } = await axios.get(`http://${ip}:8080/api/recipes/${userId}`);
    // console.log("data from getRecipesThunk=====>", data);
    dispatch(getRecipes(data));
  };
};

export const getFilteredRecipesThunk = filteredItems => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `http://${ip}:8080/api/recipes/filtered`,
        filteredItems
      );
      dispatch(getFilteredRecipes(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSingleRecipeThunk = (recipeId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`http://${ip}:8080/api/recipes/singleRecipe/${recipeId}`)
      dispatch(getSingleRecipe(data))
    } catch (error) {
    }
  }
}

//reducer

const recipesReducer = (recipes = [], action) => {
  switch (action.type) {
    case GET_RECIPES: {
      return action.recipe;
    }
    case GET_FILTERED_RECIPES: {
      return action.recipes;
    }
    default:
      return recipes;
  }
};


export default recipesReducer;

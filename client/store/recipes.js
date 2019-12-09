import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { ip } from "../../secrets";

//action type

const GET_RECIPES = "GET_RECIPES";
const GET_FILTERED_RECIPES = "GET_FILTERED_RECIPES";
const GET_SINGLE_RECIPE = "GET_SINGLE_RECIPE";

//action creator

const getRecipes = recipes => {
  return {
    type: GET_RECIPES,
    recipes
  };
};

const getFilteredRecipes = recipes => {
  return {
    type: GET_FILTERED_RECIPES,
    recipes
  };
};

const getSingleRecipe = recipe => {
  return {
    type: GET_SINGLE_RECIPE,
    recipe
  };
};

//thunk

export const getRecipesThunk = userId => {
  return async dispatch => {
    const { data } = await axios.get(`${ip}/api/recipes/${userId}`);
    dispatch(getRecipes(data));
  };
};

export const getFilteredRecipesThunk = filteredItems => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `${ip}/api/recipes/filtered`,
        filteredItems
      );
      console.log("data from getFilteredRecipesThunk", data);
      dispatch(getFilteredRecipes(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSingleRecipeThunk = recipeId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `${ip}/api/recipes/singleRecipe/${recipeId}`
      );
      dispatch(getSingleRecipe(data));
    } catch (error) {}
  };
};

//reducer

const singleRecipeReducer = (recipe = [], action) => {
  switch (action.type) {
    case GET_SINGLE_RECIPE: {
      return action.recipe;
    }
    default:
      return recipe;
  }
};

const recipesReducer = (recipes = [], action) => {
  switch (action.type) {
    case GET_RECIPES: {
      return action.recipes;
    }
    case GET_FILTERED_RECIPES: {
      return action.recipes;
    }
    default:
      return recipes;
  }
};

export { recipesReducer, singleRecipeReducer };

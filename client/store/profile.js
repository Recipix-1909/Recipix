import axios from "axios";
import { ip } from "../../secrets";

//action type
const GET_DIET = "GET_DIET";
const ADD_DIET = "ADD_DIET";
const DELETE_DIET = "DELETE_DIET";

//action creator
const getDiet = diets => {
  return {
    type: GET_DIET,
    diets
  };
};

const addDiet = singleDiet => {
  return {
    type: ADD_DIET,
    singleDiet
  };
};

const deleteDiet = singleDiet => {
  return {
    type: DELETE_DIET,
    singleDiet
  };
};

//thunk

export const getDietThunk = userId => {
  return async dispatch => {
    const { data } = await axios.get(`${ip}/api/diet/${userId}`);
    dispatch(getDiet(data));
  };
};

export const addDietThunk = (userId, dietId) => {
  return async dispatch => {
    const { data } = await axios.post(`${ip}/api/diet/${userId}`, dietId);
    dispatch(addDiet(data));
  };
};

export const deleteDietThunk = (userId, dietId) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`${ip}/api/diet/${userId}/${dietId}`);
      dispatch(deleteDiet(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
export const dietReducer = (diets = [], action) => {
  switch (action.type) {
    case GET_DIET: {
      return action.diets;
    }
    case ADD_DIET: {
      return [...diets, action.singleDiet];
    }
    case DELETE_DIET: {
      let newDietsList = diets.filter(diet => {
        return diet.id !== action.singleDiet.id;
      });
      return newDietsList;
    }
    default:
      return diets;
  }
};

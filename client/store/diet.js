import axios from "axios";
import { ip } from "../../secrets";

// action type
const GET_DIET = "GET_DIET";
const DELETE_DIET = "DELETE_DIET";
const ADD_DIET = "ADD_DIET";

// action creator
const getDiet = diets => {
  return {
    type: GET_DIET,
    diets
  };
};

const deleteDiet = diet => {
  return {
    type: DELETE_DIET,
    diet
  };
};

const addDiet = diet => {
  return {
    type: ADD_DIET,
    diet
  };
};

// thunks

export const getDietThunk = userId => {
  return async dispatch => {
    const { data } = await axios.get(`http://${ip}:8080/api/diet/${userId}`);
    dispatch(getDiet(data));
  };
};

// reducer
export default dietReducer = (diets = [], action) => {
  switch (action.type) {
    case GET_DIET: {
      return action.diets;
    }
    default:
      return allergies;
  }
};

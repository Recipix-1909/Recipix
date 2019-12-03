import axios from "axios";
import { ip } from "../../secrets";

// action type
const GET_ALLERGY = "GET_ALLERGY";
const DELETE_ALLERGY = "DELETE_ALLERGY";
const ADD_ALLERGY = "ADD_ALLERGY";

// action creator
const getAllergy = allergies => {
  return {
    type: GET_ALLERGY,
    allergies
  };
};

const deleteAllergy = allergy => {
  return {
    type: DELETE_ALLERGY,
    allergy
  };
};

const addAllergy = allergy => {
  return {
    type: ADD_ALLERGY,
    allergy
  };
};

// thunks

export const getAllergyThunk = userId => {
  return async dispatch => {
    const { data } = await axios.get(`http://${ip}:8080/api/allergy/${userId}`);
    dispatch(getAllergy(data));
  };
};

// reducer
export default allergyReducer = (allergies = [], action) => {
  switch (action.type) {
    case GET_ALLERGY: {
      return action.allergies;
    }
    default:
      return allergies;
  }
};

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
    try {
      const { data } = await axios.get(`${ip}/api/allergy/${userId}`);
      dispatch(getAllergy(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addAllergyThunk = (userId, allergyId) => {
  return async dispatch => {
    try {
      const { data } = axios.post(`${ip}/api/allergy/${userId}`, {
        allergyId: allergyId
      });
      dispatch(addAllergy(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteAllergyThunk = (userId, allergyId) => {
  return async dispatch => {
    try {
      const { data } = axios.delete(`${ip}/api/allergy/${userId}/${allergyId}`);
      dispatch(deleteAllergy(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// reducer
export default allergyReducer = (allergies = [], action) => {
  switch (action.type) {
    case GET_ALLERGY: {
      return action.allergies;
    }
    case ADD_ALLERGY: {
      const allergyExists = allergies.some(
        allergy => allergy.id === action.allergy.id
      );
      if (allergyExists) {
        return allergies;
      } else {
        return [...allergies].push(action.allergy);
      }
    }
    case DELETE_ALLERGY: {
      const newAllergyList = allergies.filter(allergy => {
        return allergy.id !== action.allergy.id;
      });
      return newAllergyList;
    }
    default:
      return allergies;
  }
};

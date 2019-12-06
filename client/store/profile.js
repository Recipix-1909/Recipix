import axios from 'axios'
import { ip } from '../../secrets'

//action type
const GET_DIET = 'GET_DIET'
const ADD_DIET = 'ADD_DIET'

//action creator
const getDiet = diet => {
  return {
    type: GET_DIET,
    diet
  }
}

const addDiet = singleDiet => {
  return {
    type: ADD_DIET,
    singleDiet
  }
}
//thunk

export const getDietThunk = userId => {
  // console.log("INSIDE THE GET FRIDGE THUNK");
  return async dispatch => {
    const { data } = await axios.get(`http://${ip}:8080/api/diet/${userId}`)
    dispatch(getDiet(data))
  }
}

export const addDietThunk = (userId, diet) => {
  return async dispatch => {
    const { data } = await axios.post(
      `http://${ip}:8080/api/diet/${userId}`,
      diet
    )
    dispatch(addDiet(data))
  }
}

//reducer
export const dietReducer = (diet = [], action) => {
  switch (action.type) {
    case GET_DIET: {
      return action.diet
    }
    case ADD_DIET: {
      return [...diet, action.singleDiet]
    }
    default:
      return diet
  }
}

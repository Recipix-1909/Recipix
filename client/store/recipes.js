import axios from "axios";
// import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk'

//action type

const GET_RECIPES = 'GET_RECIPES'


//action creator

const getRecipes = recipe => {
    return{
        type: GET_RECIPES,
        recipe
    
    }
}

//thunk

export const getRecipesThunk = (userId) => {

    return async dispatch => {
        const {data} = await axios.get(`/api/recipes/${userId}`)
        dispatch(getRecipes(data))

    }
}

//reducer

export const recipes = (recipes = {}, action) =>{
    switch(action.type){
        case GET_RECIPES: {
            return action.recipe
        }
        default:
            return recipes
    }
}

export const store = createStore(recipes, applyMiddleware(ReduxThunk));
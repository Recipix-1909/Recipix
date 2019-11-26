import axios from "axios";
import { createStore, applyMiddleware } from "redux";
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
        console.log('WE ARE IN THE THUNK')
        const{ data} = await axios.get(`http://172.16.23.46:8080/api/recipes/${userId}`)
        console.log('data at 0', data[0])
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',data)
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
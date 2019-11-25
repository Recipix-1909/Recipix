import axios from 'axios'


//action type

const SAVE_ITEM = 'SAVE_ITEM'
const GET_ITEM = 'GET_ITEM'


//action creator

const getItem = item => {
    return{
        type: GET_ITEM,
        item
    }
}

const saveItem = item => {
    return{
        type: SAVE_ITEM,
        item
    }
}

//thunk
export const saveItemThunk = (userId, item) => {
    return async dispatch => {
        const{data} = await axios.get('/api/item/')
        dispatch(getItem(data))
        if(data.serialNum){
            await axios.post(`/api/fridge/${userId}/add`, item)
        }else{

            
            await axios.post(`/api/fridge/${userId}/add`, item)
            await axios.post('/api/item/', item)
        }
        dispatch(saveItem(data))
    }
}


const itemsReducer = (items={}, action)
import axios from 'axios'


//action type

const GET_USER = 'GET_USER'
const CREATE_USER = 'CREATE_USER'

//actions creators

const getUser = user => ({type: GET_USER, user})
const createUser = newUser => ({type: CREATE_USER, newUser})


//thunk

export const getUserThunk = (user) => async dispatch => {
    let {email, password} = user
    console.log('HIT THINK!!!!!!!!!!!!!!')
      const {data} = await axios.post(`http://192.168.1.8:8080/auth/login`, user)
    dispatch(getUser(data))
   
}

export const createUserThunk = (newUser) => async dispatch => {
  let {firstName, lastName, email, password } = newUser
  const {data} = await axios.post(`http://192.168.1.8:8080/auth/signup`, newUser)
  dispatch(createUser(data))
}

//reducer

const userReducer = (user ={}, action) => {
    switch (action.type) {
      case GET_USER:
        return action.user
      default:
        return user
    }
  }

  export default userReducer
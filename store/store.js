import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0
}

const userInitalState = {
  username: 'jever',
  age: 18
}

const ADD = 'ADD'

function countReducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitalState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return { ...state, username: action.name }
    default:
      return state
  }
}

const allReducers = combineReducers({
  counter: countReducer,
  user: userReducer
})

export function add(num) {
  return { type: ADD, num }
}

function addAsync(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num))
    }, 1000)
  }
}

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {
        counter: initialState,
        user: userInitalState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}

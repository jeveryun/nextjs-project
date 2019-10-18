import { createStore, combineReducers } from 'redux'

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
      return { count: state.count + 1 }
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

const store = createStore(allReducers, {
  counter: initialState,
  user: userInitalState
})

store.dispatch({ type: ADD })

store.subscribe(() => {
  console.log('changed', store.getState())
})

store.dispatch({ type: ADD })
store.dispatch({ type: UPDATE_USERNAME, name: 'lisi'})

export default store

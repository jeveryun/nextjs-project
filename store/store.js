import { createStore } from 'redux'

const initialState = {
  count: 0
}

const ADD = 'ADD'

function reducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 }
    default:
      return state
  }
}

const store = createStore(reducer, initialState)

store.dispatch({ type: ADD })

store.subscribe(() => {
  console.log('changed', store.getState())
})

store.dispatch({ type: ADD })

export default store

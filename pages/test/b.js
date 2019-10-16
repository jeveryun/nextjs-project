import React, { useState, useReducer, useEffect, useLayoutEffect } from 'react'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

function MyCountFunc() {
  // const [count, setCount] = useState(0)
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const [name, setName] = useState('jever')

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(c => c + 1)
  //     dispatchCount({ type: 'minus' })
  //   }, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  useEffect(() => {
    console.log('effect invoked')

    return () => console.log('effect detached')
  }, [count])

  useLayoutEffect(() => {
    console.log('effect layout invoked')

    return () => console.log('effect layout detached')
  }, [count])

  return (
    <div>
      <input value={name} type="text" onChange={e => setName(e.target.value)} />
      <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
    </div>
  )
}

export default MyCountFunc

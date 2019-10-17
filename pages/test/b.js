import React, { useState, useReducer, memo, useMemo, useCallback, useRef } from 'react'

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
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const [name, setName] = useState('jever')

  const countRef = useRef()

  countRef.current = count

  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? 'red' : 'blue'
    }),
    [count]
  )

  // const handleButtonClick = useCallback(() => dispatchCount({ type: 'add' }), [])

  const handleButtonClick = useMemo(() => () => dispatchCount({ type: 'add' }), [])

  const handleAlertButtonClick = function () {
    setTimeout(() => {
      alert(countRef.current)
    }, 2000);
  }

  return (
    <div>
      <input value={name} type="text" onChange={e => setName(e.target.value)} />
      <Child config={config} onButtonClick={handleButtonClick}></Child>
      <button onClick={handleAlertButtonClick}>alert count</button>
    </div>
  )
}

const Child = memo(function({ onButtonClick, config }) {
  console.log('child render')
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  )
})

export default MyCountFunc

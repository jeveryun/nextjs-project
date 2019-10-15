import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routrChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

export default () => {
  function goToTestB() {
    Router.push(
      {
        pathname: '/test/b',
        query: {
          id: 2
        }
      },
      '/test/b/2'
    )
  }
  return (
    <>
      <span>
        <a href="#">Index</a>
      </span>
    </>
  )
}

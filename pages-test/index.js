import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

import { add } from '../store/store'

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

const Index = ({ counter, username, rename, add }) => {
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
      <span>Count: {counter}</span>
      <a>UserName: {username}</a>
      <br />
      <input type="text" value={username} onChange={e => rename(e.target.value)} />
      <button onClick={() => add(counter)}>do add</button>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>
  )
}

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3))
  return {}
}

export default connect(
  function mapStateToProps(state) {
    return {
      counter: state.counter.count,
      username: state.user.username
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: num => dispatch({ type: 'ADD', num }),
      rename: name => dispatch({ type: 'UPDATE_USERNAME', name: name })
    }
  }
)(Index)

import React from 'react'
import createStore from '../store/store'

const isServer = typeof window === 'undefined'
const __NEXT_DEDUX_STORE = '__NEXT_DEDUX_STORE'

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState)
  }

  if (!window[__NEXT_DEDUX_STORE]) {
    window[__NEXT_DEDUX_STORE] = createStore(initialState)
  } else {
    return window[__NEXT_DEDUX_STORE]
  }
}

export default Comp => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      const { Component, pageProps, ...rest } = this.props
      if (pageProps) {
        pageProps.test = '123'
      }
      return <Comp Component={Component} pageProps={pageProps} {...rest} reduxStore={this.reduxStore} />
    }
  }

  WithReduxApp.getInitialProps = async ctx => {
    const reduxStore = getOrCreateStore()

    ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }

  return WithReduxApp
}

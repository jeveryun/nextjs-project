import App from 'next/app'
import { Provider } from 'react-redux'

import 'antd/dist/antd.css'

import Layout from '../components/Layout'

import withRedux from '../lib/with-redux'

class MyApp extends App {
  state = {
    context: 'value'
  }
  static async getInitialProps(ctx) {
    const { Component } = ctx
    console.log('app init')
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Layout>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    )
  }
}

export default withRedux(MyApp)

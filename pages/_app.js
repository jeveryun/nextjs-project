import App from 'next/app'

import 'antd/dist/antd.css'

import Layout from '../components/Layout'

class MyApp extends App {
  static async getInitialProps({ Component }) {
    console.log('app init')
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps()
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp

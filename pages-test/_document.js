import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

function withLog(Comp) {
  return props => {
    console.log(props)
    return <Comp {...props}></Comp>
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const props = await Document.getInitialProps(ctx)

      return {
        ...props,
        styles: (
          <>
            {props.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body className="test">
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    )
  }
}

export default MyDocument

import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'
import { extractLocaleFromPath, Locale, objectEntries } from '@edgeandnode/components'

type MyDocumentProps = DocumentInitialProps & {
  locale: Locale
}

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const { locale } = extractLocaleFromPath(context.asPath ?? context.pathname)
    const initialProps = await Document.getInitialProps(context)
    const documentProps: MyDocumentProps = {
      ...initialProps,
      locale,
    }
    return documentProps
  }

  render() {
    const { locale } = this.props as MyDocumentProps

    return (
      <Html {...getHtmlAttributes(locale)} data-theme="dark">
        <Head>
          <link
            rel="preconnect"
            href={`https://${process.env.ALGOLIA_APP_ID}-dsn.algolia.net`}
            crossOrigin="anonymous"
          />
          <link rel="icon" type="image/png" href="https://storage.googleapis.com/graph-web/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

const getHtmlAttributes = (locale: Locale) => ({
  lang: locale,
  dir: locale == Locale.ARABIC ? 'rtl' : 'ltr',
})

export const refreshHtmlAttributes = (locale: Locale) => {
  objectEntries(getHtmlAttributes(locale)).forEach(([attribute, value]) => {
    document.documentElement[attribute] = value
  })
}

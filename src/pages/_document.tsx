import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { createGetInitialProps, createStylesServer, ServerStyles } from '@mantine/next';

const stylesServer = createStylesServer();
const getInitialPropsMantine = createGetInitialProps();
class DocumentApp extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const initialPropsMantine = await getInitialPropsMantine(ctx);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              // eslint-disable-next-line
              // @ts-ignore
              // eslint-disable-next-line react/jsx-props-no-spreading
              <App {...props} />,
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <ServerStyles html={initialPropsMantine.html} server={stylesServer} key="styles" />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentApp;

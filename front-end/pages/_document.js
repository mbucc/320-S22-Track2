import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

const ClogDocument = () => {
  return (
    <Html>
      <Head>
        {/* Google Roboto (per Material UI suggestion) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta charSet="utf-8"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

// Initialize props for server-side rendering.
ClogDocument.getInitialProps = async (ctx) => {
  // This sheet is used to inject global styles from styled-components into the DOM with SSR.
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

export default ClogDocument;

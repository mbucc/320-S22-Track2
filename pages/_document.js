import React from 'react';
import {Html, Head, Main, NextScript} from 'next/document';

// eslint-disable-next-line require-jsdoc
export default function Document() {
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
}

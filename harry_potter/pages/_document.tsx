import { Head, Html, Main, NextScript } from 'next/document';

console.log(Document.prototype);
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

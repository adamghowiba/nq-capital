import { AppProps } from 'next/app';
import Head from 'next/head';
import RootLayout from '../lib/layouts/RootLayout';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Investors Portal</title>
      </Head>

      <main className="app">
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </main>
    </>
  );
}

export default CustomApp;

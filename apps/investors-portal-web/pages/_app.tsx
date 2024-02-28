import { ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from '../lib/theme';
import '../styles/global.css';
import { Providers } from '../components/Providers/Providers';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Investors Portal</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={theme}>
          <Providers>
            <Component {...pageProps} />
          </Providers>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;

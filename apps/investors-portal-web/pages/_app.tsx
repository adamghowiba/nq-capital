import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Providers } from '../components/Providers/Providers';
import { theme } from '../lib/theme';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Investors Portal</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={theme}>
          <Providers>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Component {...pageProps} />
            </LocalizationProvider>
          </Providers>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;

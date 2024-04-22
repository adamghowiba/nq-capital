import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardLayout from '../components/(dashboard)/layout';
import { Providers } from '../components/Providers/Providers';
import { theme } from '../lib/theme';
import '../styles/global.css';
import { IntlProvider } from 'react-intl';

const NO_LAYOUT_ROUTES = ['signup', 'signin', 'onboarding'];

function CustomApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const [hasLayout, setHasLayout] = useState<boolean>(false);
  useEffect(() => {
    if (NO_LAYOUT_ROUTES.includes(pathname.split('/')[1])) setHasLayout(false);
    else setHasLayout(true);
  }, [pathname]);

  return (
    <>
      <Head>
        <title>Investors Portal</title>
      </Head>
      <main className="app">
        <IntlProvider locale="en">
          <ThemeProvider theme={theme}>
            <Providers>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {hasLayout ? (
                  <DashboardLayout>
                    <Component {...pageProps} />
                  </DashboardLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </LocalizationProvider>
            </Providers>
          </ThemeProvider>
        </IntlProvider>
      </main>
    </>
  );
}

export default CustomApp;

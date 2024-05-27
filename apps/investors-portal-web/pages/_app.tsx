import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import DashboardLayout from '../lib/layouts/DashboardLayout';
import RootLayout from '../lib/layouts/RootLayout';
import '../styles/global.css';
import Head from 'next/head';
import { Toaster } from 'sonner';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <>
      <Head>
        <title>NQ - Investors Portal</title>
      </Head>

      <main
        className={`${inter.className}`}
        style={{
          height: '100vh',
          width: '100%',
        }}
      >
        <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
      </main>

      <Toaster richColors expand={true} visibleToasts={4} closeButton={true} />
    </>
  );
}

export default CustomApp;

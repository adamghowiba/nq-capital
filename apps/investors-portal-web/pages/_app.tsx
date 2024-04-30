import { AppProps } from 'next/app';
import Head from 'next/head';
import RootLayout from '../lib/layouts/RootLayout';
import '../styles/global.css';
import { ReactElement, ReactNode } from 'react';
import DashboardLayout from '../lib/layouts/DashboardLayout';
import { NextPage } from 'next';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <>
      <main className="app">
        <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
      </main>
    </>
  );
}

export default CustomApp;

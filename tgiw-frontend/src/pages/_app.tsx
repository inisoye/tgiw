import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import { AuthProvider } from '@/lib/authentication';
import ReactQueryProvider from '@/lib/react-query';
import type { NextPageWithLayout } from '@/types';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#1f2532"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <ReactQueryProvider pageProps={pageProps}>
        <AuthProvider>
          {/* More custom base styles added here */}
          <div className="text-tgiwPurplish font-regular">
            {getLayout(<Component {...pageProps} />)}

            <Toaster position="bottom-center" reverseOrder={false} />
          </div>
        </AuthProvider>
      </ReactQueryProvider>
    </>
  );
}

export default MyApp;

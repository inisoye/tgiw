import * as React from 'react';
import type { AppProps } from 'next/app';

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
    <AuthProvider>
      <ReactQueryProvider pageProps={pageProps}>
        {/* More custom base styles added here */}
        <div className="text-gray-700 font-regular">
          {getLayout(<Component {...pageProps} />)}
        </div>
      </ReactQueryProvider>
    </AuthProvider>
  );
}

export default MyApp;

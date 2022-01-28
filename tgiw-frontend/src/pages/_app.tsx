import * as React from 'react';
import type { AppProps } from 'next/app';
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
    <ReactQueryProvider pageProps={pageProps}>
      <AuthProvider>
        {/* More custom base styles added here */}
        <div className="text-tgiwPurplish font-regular">
          {getLayout(<Component {...pageProps} />)}

          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
      </AuthProvider>
    </ReactQueryProvider>
  );
}

export default MyApp;

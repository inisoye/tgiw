import * as React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';
import type { NextPageWithLayout } from '@/components/layout';
import { AuthProvider } from '@/lib/Authentication';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          {/* Custom base styles added here */}
          <div className="text-gray-700 font-regular">
            {getLayout(<Component {...pageProps} />)}
          </div>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

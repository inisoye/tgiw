import * as React from 'react';
import {
  DefaultOptions,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface ReactQueryProviderProps {
  children: React.ReactNode;
  pageProps: any;
}

const ReactQueryProvider: React.FunctionComponent<ReactQueryProviderProps> = ({
  children,
  pageProps,
}) => {
  const queryConfig: DefaultOptions = {
    queries: {
      // retry: 1,
    },
  };

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>

      {process.env.NODE_ENV !== 'test' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

import * as React from 'react';
import {
  DefaultOptions,
  Hydrate,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { User } from 'firebase/auth';

import { useAuth } from './authentication';
import { resetAxiosTokenOnRequestError } from './axios';
import { ErrorWithResponseObject } from '@/types';

interface ReactQueryProviderProps {
  children: React.ReactNode;
  pageProps: any;
}

const ReactQueryProvider: React.FunctionComponent<ReactQueryProviderProps> = ({
  children,
  pageProps,
}) => {
  const { user } = useAuth();

  const queryConfig: DefaultOptions = {
    queries: {
      retry: 1,
    },
  };

  const queryCacheConfig = {
    onError: (error: unknown) => {
      resetAxiosTokenOnRequestError(
        error as ErrorWithResponseObject,
        user as User
      );
    },
  };

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
        queryCache: new QueryCache(queryCacheConfig),
      })
  );

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

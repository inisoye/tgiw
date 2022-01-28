import * as React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import nookies from 'nookies';

import { MainLayout } from '@/components/layout';
import { getSongs, Songs as SongsRoute } from '@/features/songs';
import type { NextPageWithLayout } from '@/types';
import { firebaseAdmin } from '@/lib/firebaseAdmin';
import { axios, setAxiosAccessToken } from '@/lib/axios';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);
    setAxiosAccessToken(cookies.token, axios);

    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery('infinite-songs', getSongs);

    /**
     * Replaced this approach: https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-788447705
     * with this: https://github.com/tannerlinsley/react-query/issues/2227#issue-874698548
     */
    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [1];

    return {
      props: {
        dehydratedState,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/log-in',
      },

      props: {} as never,
    };
  }
};

const Songs: NextPageWithLayout = () => <SongsRoute />;

Songs.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Songs;

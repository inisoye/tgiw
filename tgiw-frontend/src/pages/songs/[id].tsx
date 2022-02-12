import * as React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import nookies from 'nookies';

import { MainLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { getSong, Song as SongRoute } from '@/features/songs';
import { axios, setAxiosAccessToken } from '@/lib/axios';
import { firebaseAdmin } from '@/lib/firebaseAdmin';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);
    setAxiosAccessToken(cookies.token, axios);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
      ['song', { id: ctx.query.id as string }],
      getSong,
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
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

const Song: NextPageWithLayout = () => <SongRoute />;

Song.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Song;

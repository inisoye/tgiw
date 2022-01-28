import * as React from 'react';
import { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import nookies from 'nookies';

import { MainLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { getGenre, Genre as GenreRoute } from '@/features/genres';
import { firebaseAdmin } from '@/lib/firebaseAdmin';
import { axios, setAxiosAccessToken } from '@/lib/axios';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);
    setAxiosAccessToken(cookies.token, axios);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
      ['genre', { id: ctx.query.id as string }],
      getGenre
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

const Genre: NextPageWithLayout = () => <GenreRoute />;

Genre.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Genre;

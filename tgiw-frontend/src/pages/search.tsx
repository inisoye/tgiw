import * as React from 'react';
import type { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import { MainLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { Search as SearchRoute } from '@/features/search';
import { firebaseAdmin } from '@/lib/firebaseAdmin';
import { axios, setAxiosAccessToken } from '@/lib/axios';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);
    setAxiosAccessToken(cookies.token, axios);

    return {
      props: {} as never,
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

const Search: NextPageWithLayout = () => <SearchRoute />;

Search.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default Search;

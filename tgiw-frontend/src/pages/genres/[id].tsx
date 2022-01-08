import * as React from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';

interface GenreProps {}

const Genre: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Genre: {id}</div>;
};

Genre.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Genre;

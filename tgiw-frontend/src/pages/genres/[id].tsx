import * as React from 'react';
import { useRouter } from 'next/router';

import { MainLayout, NextPageWithLayout } from '@/components/layout';

interface GenreProps {}

const Genre: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Genre: {id}</div>;
};

Genre.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Genre;

import * as React from 'react';

import { MainLayout, NextPageWithLayout } from '@/components/layout';

interface GenreProps {}

const Genre: NextPageWithLayout = () => {
  return <div>Genre</div>;
};

Genre.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Genre;

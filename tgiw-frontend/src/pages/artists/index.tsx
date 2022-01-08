import * as React from 'react';

import { MainLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';

interface ArtistsProps {}

const Artists: NextPageWithLayout = () => {
  return <div>Artists</div>;
};

Artists.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default Artists;

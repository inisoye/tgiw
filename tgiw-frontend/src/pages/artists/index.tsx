import * as React from 'react';

import { MainLayout, NextPageWithLayout } from '@/components/layout';

interface ArtistsProps {}

const Artists: NextPageWithLayout = () => {
  return <div>Artists</div>;
};

Artists.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default Artists;

import * as React from 'react';
import { useRouter } from 'next/router';

import { MainLayout, NextPageWithLayout } from '@/components/layout';

interface ArtistProps {}

const Artist: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Artist: {id}</div>;
};

Artist.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Artist;

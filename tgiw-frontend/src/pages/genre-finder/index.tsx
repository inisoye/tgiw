import * as React from 'react';

import { SecondaryLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { GenreFinder as GenreFinderRoute } from '@/features/contributions';

const GenreFinder: NextPageWithLayout = () => <GenreFinderRoute />;

GenreFinder.getLayout = (page: React.ReactElement) => (
  <SecondaryLayout>{page}</SecondaryLayout>
);

export default GenreFinder;

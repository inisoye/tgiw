import * as React from 'react';

import { SecondaryLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { SongDetails as SongDetailsRoute } from '@/features/contributions';

const SongDetails: NextPageWithLayout = () => <SongDetailsRoute />;

SongDetails.getLayout = (page: React.ReactElement) => (
  <SecondaryLayout hasChildrenMargin>{page}</SecondaryLayout>
);

export default SongDetails;

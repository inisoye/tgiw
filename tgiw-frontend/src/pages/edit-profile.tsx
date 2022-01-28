import * as React from 'react';

import { SecondaryLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { EditProfile as EditProfileRoute } from '@/features/auth';

const EditProfile: NextPageWithLayout = () => <EditProfileRoute />;

EditProfile.getLayout = (page: React.ReactElement) => (
  <SecondaryLayout hasCenteredLogo>{page}</SecondaryLayout>
);

export default EditProfile;

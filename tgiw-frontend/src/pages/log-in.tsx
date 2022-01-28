import * as React from 'react';

import { SecondaryLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { LogIn as LogInRoute } from '@/features/auth';

const LogIn: NextPageWithLayout = () => <LogInRoute />;

LogIn.getLayout = (page: React.ReactElement) => (
  <SecondaryLayout hasCenteredLogo>{page}</SecondaryLayout>
);

export default LogIn;

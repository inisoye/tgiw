import * as React from 'react';

import { SecondaryLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';
import { SignUp as SignUpRoute } from '@/features/auth';

const SignUp: NextPageWithLayout = () => <SignUpRoute />;

SignUp.getLayout = (page: React.ReactElement) => (
  <SecondaryLayout hasCenteredLogo>{page}</SecondaryLayout>
);

export default SignUp;

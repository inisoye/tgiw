import * as React from 'react';

import { MainLayout } from '@/components/layout';
import type { NextPageWithLayout } from '@/types';

const About: NextPageWithLayout = () => {
  return <div className="max-w-6xl p-8 md:px-16">About</div>;
};

About.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default About;

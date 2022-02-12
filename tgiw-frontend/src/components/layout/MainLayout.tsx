import * as React from 'react';

import { Sidebar, MobileNav } from '@/components/nav';

interface MainLayoutProps {}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 md:flex md:h-screen">
      <MobileNav />

      <Sidebar />

      <main className="md:h-full md:w-full md:overflow-auto">
        <div className="h-full md:mx-auto md:w-full md:max-w-[1152px] ">
          <div className="max-w-6xl p-4 pb-24 sm:p-8 md:px-16">{children}</div>
        </div>
      </main>
    </div>
  );
};

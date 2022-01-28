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
        <div className="md:mx-auto md:w-full md:max-w-[1152px] h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

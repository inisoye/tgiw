import * as React from 'react';

import { Sidebar } from '../nav/Sidebar';

interface MainLayoutProps {}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  children,
}) => {
  return (
    <div className="md:flex md:h-screen bg-gray-50">
      <Sidebar />

      <main className="pb-8 md:h-full md:w-full md:overflow-auto ">
        <div className="md:mx-auto md:w-full md:max-w-[1152px]">{children}</div>
      </main>
    </div>
  );
};

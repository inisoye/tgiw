import * as React from 'react';

import { Sidebar } from '../nav/Sidebar';

interface MainLayoutProps {}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  children,
}) => {
  return (
    <div className="bg-gray-50 md:flex md:h-screen">
      <Sidebar />

      <main className="md:h-full md:w-full md:overflow-auto ">
        <div className="md:mx-auto md:w-full md:max-w-[1152px] h-full">
          {children}
        </div>
      </main>
    </div>
  );
};
